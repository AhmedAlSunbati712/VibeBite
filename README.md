# VibeBite
## IMPORTANT NOTE AND WARNING
As of May 15th 2025, spotify changed their process for allowing developers to move their product from development mode to Extended quota mode. Now, switching to the extended quota mode is limit only for established business entities with at least 250k MONTHLY ACTIVE USERS.

Therefore, my app won't be able to fetch profile data of anyone who is not on my dashboard whitelist (which is only limited to 25 emails).

This repo is my project for the API challenge as part of my application to DALI lab,
so if you need to have access to be able to test the app yourself, send me an email and I'll add your email to the white list on the dashboard.

## App link
https://vibebite-frontend.onrender.com/

## Idea Inspiration
As much as I love curating playlists and putting care into crafting the perfect vibe, there are times when I desperately want something fresh, but have zero energy to make it myself. Sure, Spotify DJ exists, but let’s be honest: it’s basically useless when it starts blasting Taylor Swift while I’m spiraling into an existential crisis.

So I figured, why not build something better? An app that recommends music tailored (wink wink) not just to my taste, but also to my current mood. And to make it more fun (and useful), I added a twist: feeling hungry too? The app pulls a quick and easy recipe from the Spoonacular database that matches your mood as well. So whether you're sad-snacking or cooking up a storm in celebration, you're covered on both fronts, sonically and culinarily.

## The potential impact VibeBite has on its intended users
This app has the potential to bring a small but meaningful boost to people's daily lives by meeting them where they are emotionally and practically. For users who often feel overwhelmed, creatively drained, or just in need of a little pick-me-up, it offers a personalized, low-effort way to engage with music and food, two of the most comforting aspects of daily life (at least mine).

## New technologies I have learned
Basically, almost the whole project is something new to me but not really. While I haven't taken CS52 myself, I was determined since the start of the summer to teach myself all the necessary technology stacks to deploy full-stack web applications. So I bought myself [The Complete Full-Stack Web Development Bootcamp](https://www.udemy.com/course/the-complete-web-development-bootcamp/?couponCode=KEEPLEARNING), read a lot and practiced a lot.


## APIs used
### Spoonacular API
An API for searching for recipes using a multitutde of queries. Recipes can be searched for using name, ingredients, nutritients and cuisine. The app utilizes the free version of the API which allows for a 150 requests / day.

We make use of two specific endpoints on the API:
- `recipes/complexSearch`: Which can take a wide range of params. The ones we focus on are: `query`, `number` (the number of results to get), and `apiKey`. It returns an array of JSON objects, each for every recipe that matches the query. It includes the recipe ID, name and image.
- `recipes/{recipeID}/information`: which takes as a param the `apiKey`. Returns an object full of relevant information about the desired recipe (ingredients, instructions, measurements...etc).

### Spotify API
Spotify API is used to collect relevant information about the user music taste. Upon visiting the website, users are redirected to spotify's log in page. After successful authentication and authorization, the user's top tracks and artists are collected. Then, we use this information to further extract the user's most listened genres (details about how this is extracted are outlined below).
We make use of the following endpoints on the spotify API:
- `/authorize`: The endpointt to hit to allow for users to log in. It takes the spotify client ID (found on our developer dashboard), scope of authorization (we are using the following scopes: `user-top-read`, `playlist-modify-public`, and `playlist-modify-private`), the redirect uri to hit on our backend to collect the access and refresh tokens if authentication went successfully.
- `/me/top/{type}`: where type could be artists or tracks; we use both. It takes `limit` and `time_range`  as params.
- `/search`: Which we use to search for tracks using their titles.
- `/users/{userID}/playlists`: Creates a new playlist for a given user. Takes `name`, `public (boolean)` and `description` as params.
- `/playlists/{playlistID}/tracks`: Used to access a specific list made by the user and then adding tracks to that playlist.
#### Note
Now that spotify limited access to the extended quota mode to established businesses, access to the app is only allowed for accounts that are included on the whitelist on the developer dashboard.

### OpenAI API:
OpenAI API is used as a recommendation system that integrates information about the user's musical and culinary tastes with how the user is feeling at the moment and matches it with the combo of a playlist and a recipe.

## New Technologies I learnt
### Axios
I picked up Axios while building this project. I hadn’t used it much before, but it ended up being super useful for handling all the HTTP requests between my backend and external APIs like Spotify and Spoonacular. I learned how to send requests with different headers and parameters, deal with things like authentication and rate limits, and generally make my API calls cleaner and more manageable.
#### Why Axios?
I went with Axios mainly because it made things easier to write and understand, especially compared to the built-in `fetch`. It handles things like JSON parsing automatically and has a more straightforward syntax when it comes to passing data or catching errors. Since I was working with a bunch of async calls (especially during the login flow and recommendation steps) Axios helped keep my code more readable and organized.