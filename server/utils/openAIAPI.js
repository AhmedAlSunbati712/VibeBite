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
export async function getRecommendedSongs({ mood, topGenres = [], topArtists = [], topTracks = [] }) {
  try {
    const systemPrompt = {
      role: "system",
      content:
        "You are a personalized music recommendation assistant. When given a mood and a user's musical taste, return a JSON array of 10 songs in the format 'Artist - Song Title'. Do not explain or add anything else.",
    };

    const userPrompt = {
      role: "user",
      content: `
        Here's how I'm feeling right now: "${mood}"

        My top Spotify genres: ${topGenres.join(", ") || "N/A"}
        My top artists: ${topArtists.join(", ") || "N/A"}
        Songs I like: ${topTracks.join(", ") || "N/A"}

        Please recommend 15 songs that fit how I'm feeling and align with my taste.
        Respond only with a JSON array of strings like "Artist - Song Title". Include
        2 or 3 artists I might not have heard of before but fit the vibe. Make sure
        the songs do actually exist. If my taste doesn't match the mood, stick to the mood
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
