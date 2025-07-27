/**
 * OpenAI Music Recommendation Service
 * 
 * Author: Ahmed Al Sunbati
 * 
 * Description:
 * Connects to the OpenAI API to generate personalized song recommendations 
 * based on a user’s current mood and their top Spotify genres, artists, and tracks.
 * 
 * Exports:
 * - getRecommendedSongs(mood, topGenres, topArtists, topTracks):
 *    Returns an array of 15 song suggestions matching the mood and taste.
 * 
 */

import { config } from "dotenv";
import OpenAI from "openai";
config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Calls the OpenAI API with a mood and optional user preferences,
 * and returns a list of recommended songs.
 * 
 * @param mood - A description of how the user is feeling right now.
 * @param {string[]} [options.topGenres] - Array of user's top Spotify genres
 * @param {string[]} [options.topArtists] - Array of user's top Spotify artists
 * @param {string[]} [options.topTracks] - Array of user's top Spotify songs
 * 
 * @returns {Promise<string[]>} Array of recommended song strings
 */
export async function getRecommendedSongs(mood, topGenres = [], topArtists = [], topTracks = []) {
  try {
    const systemPrompt = {
      role: "system",
      content:
        "You are a personalized music recommendation assistant. When given a mood and a user's musical taste, return a JSON array of 15 songs in the format 'Artist - Song Title' that match the mode and appeal to the taste. Do not explain or add anything else.",
    };

    const userPrompt = {
      role: "user",
      content: `
        Here's how I'm feeling right now: "${mood}"

        My top Spotify genres: ${topGenres.join(", ") || "N/A"}
        My top artists: ${topArtists.join(", ") || "N/A"}
        Songs I like: ${topTracks.join(", ") || "N/A"}

        Please recommend 15 songs that fit how I'm feeling and align with my taste.
        Respond only with a JSON array of strings like "Artist - Song Title". Try to focus
        on the mood and include a variety of artists, don't only stick to my top artists. 
        Make sure the songs do actually exist. 
        If my taste doesn't match the mood, stick to the mood
        and not the taste.
      `.trim(),
    };

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [systemPrompt, userPrompt],
    });

    const responseText = completion.choices[0].message.content;

    let songs;
    try {
      songs = JSON.parse(responseText);
    } catch {
      songs = responseText
        .split("\n")
        .map((line) => line.replace(/^\d+\.?\s*/, "").trim())
        .filter(Boolean);
    }

    return songs;
  } catch (err) {
    console.error("OpenAI error:", err);
    throw new Error("Failed to get recommendations from OpenAI.");
  }
}

/**
 * Calls the OpenAI API with a mood, and returns a list of recommended recipes.
 * 
 * @param mood - A description of how the user is feeling right now.
 * 
 * @returns {Promise<string[]>} Array of recommended recipes strings
 */
export async function getRecommendedRecipes(mood) {
  try {
    const systemPrompt = {
      role: "system",
      content:
        "You are a helpful recipe assistant. When given a mood, respond ONLY with a JSON array of 15 recipe names that match the mood's vibe or energy. The recipes should be diverse in cuisine and type. Do not add explanations or anything else outside the JSON array.",
    };

    const userPrompt = {
      role: "user",
      content: `
        Here's how I'm feeling right now: "${mood}"

        Recommend 15 recipe names that fit this mood. Consider the mood’s flavors, energy, and comfort level.
        Include a mix of cuisines and dish types (appetizers, main courses, desserts, etc.).
        Respond ONLY with a JSON array of strings like ["Spicy Chili", "Lemon Tart", ...].
      `.trim(),
    };

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [systemPrompt, userPrompt],
    });

    const responseText = completion.choices[0].message.content;

    let songs;
    try {
      songs = JSON.parse(responseText);
    } catch {
      songs = responseText
        .split("\n")
        .map((line) => line.replace(/^\d+\.?\s*/, "").trim())
        .filter(Boolean);
    }

    return songs;
  } catch (err) {
    console.error("OpenAI error:", err);
    throw new Error("Failed to get recommendations from OpenAI.");
  }
}
