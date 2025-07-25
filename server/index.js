import express from "express";
import axios from "axios";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";
import spotifyAPI from "./utils/spotifyAPI.js";
import {generateCodeVerifier, generateCodeChallenge} from "./utils/authUtils.js";
import { getRecommendedSongs } from "./utils/openAIAPI.js";
config();


const __DIRNAME = dirname(fileURLToPath(import.meta.url));

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
console.log(SPOTIFY_CLIENT_ID)

const redirect_uri = "http://127.0.0.1:3000/callback";
const scope = 'user-top-read playlist-modify-public playlist-modify-private';
let codeVerifier;
let accessToken;

const app = express();
const port = 3000;


app.use(express.static(path.resolve(__DIRNAME, "..", "public")));

const K = 8
let userTopTracks = [];
let userTopArtists = [];
let userTopKGenres = [];


app.get("/", (req, res) => {
    console.log("hit /");
    res.sendFile(path.join(__DIRNAME, "..", "public", "index.html"));
})

app.get("/login", async (req, res) => {
    
    codeVerifier = generateCodeVerifier(128);


  generateCodeChallenge(codeVerifier).then(codeChallenge => {
    const authUrl = `https://accounts.spotify.com/authorize` +
      `?response_type=code&client_id=${SPOTIFY_CLIENT_ID}` +
      `&scope=${encodeURIComponent(scope)}` +
      `&redirect_uri=${encodeURIComponent(redirect_uri)}` +
      `&code_challenge_method=S256&code_challenge=${codeChallenge}`;

    res.redirect(authUrl);
  });
});

app.get('/callback', async (req, res) => {
    const code = req.query.code;
  
    try {
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
        accessToken = response.data.access_token;
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).send("Error Authorizing user.");
    }
    
    if (typeof accessToken === "undefined") {
        console.error("Error Authorizing user. Couldn't get access token.")
    } else {
        try {
            userTopTracks = await spotifyAPI.getTopKTracks("long_term", 10, accessToken);
            userTopArtists = await spotifyAPI.getTopKArtists("long_term", 10, accessToken);

            let topTracksTitles = spotifyAPI.getTracksTitles(userTopTracks);
            let topArtistsTitles = spotifyAPI.getArtistsTitles(userTopArtists);
            userTopKGenres = await spotifyAPI.getTopKGenres(5, accessToken);
            let mood = "hot sex playlist";
            const recommendedSongs = await getRecommendedSongs({
                mood,
                topGenres: userTopKGenres,
                topArtists: topArtistsTitles,
                topTracks: topTracksTitles,
              });
            

            // const topTracks = userTopTracks.map(
            //       (t, i) => `${i + 1}. ${t.name} - ${t.artists.map(a => a.name).join(', ')}`
            //  ).join('\n');
          
            //  res.send(`<pre>${topTracks}</pre>`);
            res.send(`<pre>${recommendedSongs.join("\n")}</pre>`);
        } catch (err) {
            console.error(err.response?.data || err.message);
            res.status(500).send('Error fetching tracks and Artists');
        }
    }
          
});


app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
})
