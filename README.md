# VibeBite
VibeBite is a web app that creates a custom Spotify playlist and recipe based on your current mood. You log in with your Spotify account, type how you’re feeling, and the app pulls from your top tracks, artists, and genres to generate a playlist that fits the vibe. At the same time, it grabs a matching recipe from Spoonacular, so you get a mood-based pairing of music and food.

I built it because I love discovering new music, but sometimes I’m too tired to dig through playlists or figure out what to cook. The app combines Spotify, OpenAI, and Spoonacular APIs to make those choices for you in a more personal and fun way. It’s meant to be low-effort and a little playful 

# App link
https://vibebite-frontend.onrender.com/

# IMPORTANT NOTE AND WARNING
As of May 15th 2025, spotify changed their process for allowing developers to move their product from development mode to Extended quota mode. Now, switching to the extended quota mode is limit only for established business entities with at least 250k MONTHLY ACTIVE USERS.

Therefore, my app won't be able to fetch profile data of anyone who is not on my dashboard whitelist (which is only limited to 25 emails).

This repo is my project for the API challenge as part of my application to DALI lab,
so if you need to have access to be able to test the app yourself, send me an email and I'll add your email to the white list on the dashboard.

# Computer Demo
[![](computer_demo.mov)](https://github.com/user-attachments/assets/2143429c-c73c-482a-ac69-b9f2a42b4649)

# Idea Inspiration
As much as I love curating playlists and putting care into crafting the perfect vibe, there are times when I desperately want something fresh, but have zero energy to make it myself. Sure, Spotify DJ exists, but let’s be honest: it’s basically useless when it starts blasting Taylor Swift while I’m spiraling into an existential crisis.

So I figured, why not build something better? An app that recommends music tailored (wink wink) not just to my taste, but also to my current mood. And to make it more fun (and useful), I added a twist: feeling hungry too? The app pulls a quick and easy recipe from the Spoonacular database that matches your mood as well. So whether you're sad-snacking or cooking up a storm in celebration, you're covered on both fronts, sonically and culinarily.

# The potential impact VibeBite has on its intended users
This app has the potential to bring a small but meaningful boost to people's daily lives by meeting them where they are emotionally and practically. For users who often feel overwhelmed, creatively drained, or just in need of a little pick-me-up, it offers a personalized, low-effort way to engage with music and food, two of the most comforting aspects of daily life (at least mine).

# APIs used
## Spoonacular API
An API for searching for recipes using a multitutde of queries. Recipes can be searched for using name, ingredients, nutritients and cuisine. The app utilizes the free version of the API which allows for a 150 requests / day.

We make use of two specific endpoints on the API:
- `recipes/complexSearch`: Which can take a wide range of params. The ones we focus on are: `query`, `number` (the number of results to get), and `apiKey`. It returns an array of JSON objects, each for every recipe that matches the query. It includes the recipe ID, name and image.
- `recipes/{recipeID}/information`: which takes as a param the `apiKey`. Returns an object full of relevant information about the desired recipe (ingredients, instructions, measurements...etc).

## Spotify API
Spotify API is used to collect relevant information about the user music taste. Upon visiting the website, users are redirected to spotify's log in page. After successful authentication and authorization, the user's top tracks and artists are collected. Then, we use this information to further extract the user's most listened genres (details about how this is extracted are outlined below).
We make use of the following endpoints on the spotify API:
- `/authorize`: The endpointt to hit to allow for users to log in. It takes the spotify client ID (found on our developer dashboard), scope of authorization (we are using the following scopes: `user-top-read`, `playlist-modify-public`, and `playlist-modify-private`), the redirect uri to hit on our backend to collect the access and refresh tokens if authentication went successfully.
- `/me/top/{type}`: where type could be artists or tracks; we use both. It takes `limit` and `time_range`  as params.
- `/search`: Which we use to search for tracks using their titles.
- `/users/{userID}/playlists`: Creates a new playlist for a given user. Takes `name`, `public (boolean)` and `description` as params.
- `/playlists/{playlistID}/tracks`: Used to access a specific list made by the user and then adding tracks to that playlist.
### Note
Now that spotify limited access to the extended quota mode to established businesses, access to the app is only allowed for accounts that are included on the whitelist on the developer dashboard.

## OpenAI API:
OpenAI API is used as a recommendation system that integrates information about the user's musical and culinary tastes with how the user is feeling at the moment and matches it with the combo of a playlist and a recipe.

# New Technologies and frameworks I learnt
## Axios
I picked up Axios while building this project. I hadn’t used it much before, but it ended up being super useful for handling all the HTTP requests between my backend and external APIs like Spotify and Spoonacular. I learned how to send requests with different headers and parameters, deal with things like authentication and rate limits, and generally make my API calls cleaner and more manageable.
### Why Axios?
I went with Axios mainly because it made things easier to write and understand, especially compared to the built-in `fetch`. It handles things like JSON parsing automatically and has a more straightforward syntax when it comes to passing data or catching errors. Since I was working with a bunch of async calls (especially during the login flow and recommendation steps) Axios helped keep my code more readable and organized.

## Swiper.js
I learned Swiper.js while building the song recommendation carousel. I hadn’t used it before, but I needed a way to scroll through the cards in a clean, interactive way. After trying a couple of options, Swiper ended up being the easiest to set up. I used it to display the recommended tracks in a swipeable coverflow format, and combined it with Framer Motion to add some smooth animations.

### Why Swiper.js?
Swiper was simple and did exactly what I needed; a swipeable, loopable carousel that worked well with React. It handled all the dragging and transitions out of the box, so I didn’t have to build that logic myself. It also gave me control over how the cards looked and moved, which was helpful for matching the vibe of the rest of the app. Overall, it saved me time and worked well with the rest of my components.

# Challenges I faced (ones that I solved and others not)
## Extracting a user's most-listened-to genres
Spotify API doesn't provide a way to access the most-listened-to genres by the user. This is an essential part about the user's listening experience, and it also further helps the openAI API to normalize well instead of overfitting for a set group of artists.
### Solution
The algorithm I used to tackle this challenge is as the following:
```
genresCount <- A dictionary that keeps the count of genres in the top artists
for each artist in the top artists:
    artist_genres <- extract the genres this artist is associated with
    for each genre in artist_genres:
        if genre is in genresCount: genresCount[genre] += 1
        else: genresCount[genre] = 1
maxHeap <- A heap which stores genres and orders them based on their count
push each genre along with its count to the maxHeap
pop the top of the heap k times to extract the most played genres
```
This approach could be optimized for space complexity by utilizing a minHeap and making sure its size doesn't grow beyond k.
## Securely saving a user's session information (partially solved)
One main issue I had to deal with was safely saving the user's access & refresh tokens and spotify data for the time they are in the session.
### Solution (solved only locally)
I used `express-session` to temporarily store the user's code verifier during the OAuth flow, and to keep their Spotify access and refresh tokens after logging in. This let me reuse the tokens across different endpoints without needing to re-authenticate every time. It worked fine during local development where cookies can persist properly.

#### Remaining issue (not working in deployment)

When deploying, especially with cross-origin requests and HTTPS, I ran into problems where the session cookie wasn't being saved or sent back correctly. Despite setting `cookie: { secure: true, sameSite: 'None' }`, the session would reset between requests. I'm still figuring out the best long-term solution. possibly moving session data to a database like MongoDB or using JWTs instead of relying on in-memory sessions. The app works just fine now just because these variables are stored in global variables. The local version of the app (found on the branch `one-page`) functions properly with `express-session`.

