/**
 * Moodify Spotify Playlist Generator Server
 * 
 * Author: Ahmed Al Sunbati
 * File: index.js
 * 
 * Description:
 * This Express server powers Moodify. It's a web app that lets users log in with Spotify,
 * analyze their top tracks, artists, and genres, and get playlist recommendations 
 * based on how they're feeling. The app uses OpenAI to suggest songs that match a 
 * mood prompt, then creates a Spotify playlist the user can save.
 * 
 * Endpoints:
 * - GET  /login         Starts Spotify login flow
 * - GET  /callback      Handles Spotify callback and fetches user data
 * - POST /moodify       Sends mood to OpenAI and returns recommended songs
 * - POST /savePlaylist  Saves generated playlist to user's Spotify
 * 
 * Notes:
 * - Communicates with a frontend running on 127.0.0.1:5173
 * - Uses express-session for session handling
 * - Requires environment variables (see .env) for Spotify credentials and secret
 */

import express from "express";
import axios from "axios";
import path from "path";
import cors from 'cors';
import session from 'express-session';

import { config } from "dotenv";
import spotifyAPI from "./utils/spotifyAPI.js";
import { generateCodeVerifier, generateCodeChallenge } from "./utils/authUtils.js";
import { getRecommendedSongs, getRecommendedRecipes } from "./utils/openAIAPI.js";

config(); // Load .env variables


// Initializing global variables, the server and listening on port 3000
const app = express();
const port = 3000;
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID; // Loading client ID from the environment variables
const SCOPE = 'user-top-read playlist-modify-public playlist-modify-private'; // Defining scopes for authorization on spotify API
const CLIENT_URL = process.env.CLIENT_URL;
const redirect_uri = process.env.REDIRECT_URI; // The redirect uri from spotify after authorization
const K = 50; // How many top artists/tracks to extract
// const redisClient = createClient({
//   url: process.env.REDIS_URL,
//   socket: {
//     tls: true,                   // Enable TLS explicitly
//     rejectUnauthorized: true,    // Keep true for production security
//   }, // your redis url
// });
// redisClient.connect().catch(console.error);

// const redisStore = new RedisStore({
//   client: redisClient,
//   prefix: "myapp:",
// });


/* <------------------- Middleware -----------------> */
app.use(cors({
  origin: CLIENT_URL,  
  credentials: true,                
}));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    partitioned: false,
    secure: true,        
    sameSite: 'none',     
    maxAge: 3600000
  }
}));
// app.use(
//   session({
//     store: redisStore,
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: true,
//       sameSite: 'None',
//       maxAge: 60 * 60 * 1000,
//     },
//   })
// );
app.set('trust proxy', 1);


// Route to initiate the Spotify login process
app.get("/login", async (req, res) => {
  // Generate a secure, random code verifier (used for PKCE)
  const codeVerifier = generateCodeVerifier(128);
  req.session.codeVerifier = codeVerifier;
  

  // Generate a code challenge (hash of the code verifier, using SHA-256)
  generateCodeChallenge(codeVerifier).then(codeChallenge => {
    // Build the Spotify authorization URL with necessary query parameters
    const authUrl = `https://accounts.spotify.com/authorize` +
      `?response_type=code&client_id=${SPOTIFY_CLIENT_ID}` +
      `&scope=${encodeURIComponent(SCOPE)}` +
      `&redirect_uri=${encodeURIComponent(redirect_uri)}` +
      `&code_challenge_method=S256&code_challenge=${codeChallenge}`;
    
    // Redirect the user to Spotify's login page
    res.redirect(authUrl);
  });
});

app.get('/callback', async (req, res) => {
    // Saving authorization code to retrieve access token
    const { code } = req.query;
    const codeVerifier = req.session.codeVerifier; // get it from session
    

    if (!code || !codeVerifier) {
      return res.status(400).send("Missing authorization code or code verifier.");
    }
  
    try {
        // Exchange code for token
        const response = await axios.post('https://accounts.spotify.com/api/token',
            new URLSearchParams({
              client_id: SPOTIFY_CLIENT_ID,
              grant_type: 'authorization_code',
              code: code,
              redirect_uri,
              code_verifier: codeVerifier
            }).toString(),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );
        
        // Saving the access and refresh tokens in the session
        req.session.accessToken = response.data.access_token;
        req.session.refreshToken = response.data.refresh_token;

    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).send("Error Authorizing user.");
        return;
    }
    
    // Fetch User Data
    try {
        const accessToken = req.session.accessToken;
        const [tracks, artists, genres] = await Promise.all([
          spotifyAPI.getTopKTracks("long_term", K, accessToken),
          spotifyAPI.getTopKArtists("long_term", K, accessToken),
          spotifyAPI.getTopKGenres(10, accessToken),
        ]);

        // Saving this information in the current user's session
        req.session.userTopTracks = tracks;
        req.session.userTopArtists = artists;
        req.session.userTopKGenres = genres;
        console.log('Session ID:', req.sessionID);
        
        // Redirecting after logging in to allow user to enter prompt
        res.redirect(`${CLIENT_URL}/?spotify=true`)
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).send('Error fetching tracks and Artists');
    }
    
          
});

app.post('/moodify', async (req, res) => {
  // if (!isSessionValid(req.session)) {
  //   return res.status(400).json({ error: "Session expired. Please re-authenticate." });
  // }
  // The mood description the user entered in the prompt
  console.log('Session ID:', req.sessionID);
  const { prompt: mood } = req.body;
  const { userTopArtists, userTopTracks, userTopKGenres, accessToken } = req.session;
  console.log(userTopArtists);
  // Try connecting to openAI API and get recommended songs
  try {
    const recommendedTitles = await getRecommendedSongs(
      mood,
      userTopKGenres,
      spotifyAPI.getArtistsTitles(userTopArtists),
      spotifyAPI.getTracksTitles(userTopTracks)
    );
    
    // Build tracks objects from tracks titles
    const trackObjs = await Promise.all(
      recommendedTitles.map(title => spotifyAPI.getTracksByTitle([title], accessToken))
    );
    
    // Save the most revently recommended songs
    req.session.mostRecentlyRecommendedSongs = trackObjs.flat();
    res.json(req.session.mostRecentlyRecommendedSongs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate recommendations." });
  }
});

app.post("/savePlaylist", async (req, res) => {
  const { mostRecentlyRecommendedSongs, accessToken } = req.session;

  if (!mostRecentlyRecommendedSongs || !accessToken) {
    return res.status(400).json({ error: "Missing data in session. Try generating a playlist first." });
  }

  try {
    var playlistName = req.body.name;
    await spotifyAPI.createPlaylist(mostRecentlyRecommendedSongs, playlistName, accessToken);
    res.status(200).json({ message: "Playlist created successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save playlist." });
  }
});

app.post("/getRecipe", async (req, res) => {
  // if (!isSessionValid(req.session)) {
  //    return res.status(400).json({ error: "Session expired. Please re-authenticate." });
  // }
  const BASE_URL = 'https://api.spoonacular.com/recipes/complexSearch';
  const { prompt: mood }= req.body;
  const recipesRecs = await getRecommendedRecipes(mood);
  var foundRecipesIDs = [];
  for (let idx = 0; idx < recipesRecs.length && foundRecipesIDs.length == 0; idx++) {
    // Search for recipe
    try {
      let recipeName = recipesRecs[idx];
      const response = await axios.get(BASE_URL, {
        params: {
          query: recipeName,
          number: 20,
          apiKey: process.env.SPOONACULAR_API_KEY,
        }
      });
      if (response.data.totalResults != 0) {
        for (var recipe of response.data.results) {
          foundRecipesIDs.push(recipe.id)
        }
        break;
      }

    } catch (error) {
      console.error(error);
    }
  };

  const recipeID = foundRecipesIDs[Math.floor(Math.random() * foundRecipesIDs.length)];
  var recipeInformation = await getRecipeInformation(recipeID);
  res.json(recipeInformation);
})

app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
})

/* <------------- Helper Functions ---------------> */
function isSessionValid(session) {
  /**
   * Checks if the session has the required Spotify data.
   *
   * @param session - The user's session object.
   * @returns True if session includes top tracks, artists, genres, and access token.
   */
  return (
    session?.userTopTracks &&
    session?.userTopArtists &&
    session?.userTopKGenres &&
    session?.accessToken
  );
}

const getRecipeInformation = async (recipeID) => {
  /**
   * Given a recipe ID, it makes a request to the spoonacular recipes
   * endpoint to retrieve recipe information.
   * 
   * @param recipeID:The id of the recipe we are looking up.
   * @returns A hashtable with the following keys:
   * - title: Name of the recipe
   * - image: URL for an image of the recipe
   * - ingredients: An array of ingredients and measures for the recipe
   * - steps: An array of detailed steps of how to prep the recipe.
   */
  const searchURL = `https://api.spoonacular.com/recipes/${recipeID}/information`;
  var recipeInformation = {};
  try {
    const response = await axios.get(searchURL, {
      params: {
        apiKey: process.env.SPOONACULAR_API_KEY,
      }
    });
    
    recipeInformation["title"] = response.data.title;
    recipeInformation["image"] = response.data.image;
    recipeInformation["ingredients"] = response.data.extendedIngredients;
    recipeInformation["steps"] = response.data.analyzedInstructions[0].steps;
  } catch (error) {
    console.log(error);
  }
  return recipeInformation;
}