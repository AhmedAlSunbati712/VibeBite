/**
 * Spotify API Utilities
 * 
 * Author: Ahmed Al Sunbati
 * 
 * Description:
 * Helper functions to interact with the Spotify Web API for retrieving user data,
 * searching tracks, and managing playlists. Supports fetching top tracks, artists,
 * genres, and creating playlists with recommended songs.
 * 
 * Functions:
 * - getTopKTracks(timeRange, K, accessToken)
 * - getTopKArtists(timeRange, K, accessToken)
 * - getTopKGenres(K, accessToken)
 * - getTracksTitles(tracksItems)
 * - getArtistsTitles(artistsItems)
 * - getTracksByTitle(tracksTitlesList, accessToken)
 * - createPlaylist(tracksList, playlistTitle, accessToken)
 * - addTracksToPlaylist(tracksList, playlistID, accessToken)
 * - getUserID(accessToken)
 */
import axios from "axios";
import {Heap} from "heap-js";


const getTopKTracks = async (timeRange, K, accessToken) => {
    /**
     * Description: Returns the user's top K tracks for a given time range.
     * Uses the Spotify Web API's `/me/top/tracks` endpoint.
     * 
     * ========== Parameters ===========
     * @param timeRange - Time range over which to compute top tracks.
     *                    Valid values: 'short_term', 'medium_term', 'long_term'.
     * @param K - Number of top tracks to return (max 50).
     * @param accessToken - Spotify access token for authorization.
     * 
     * ========== Returns ============
     * @returns topTracks - Array of top track objects returned by the Spotify API.
     */
    try {
        const tracksResponse = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
            headers: {Authorization: `Bearer ${accessToken}`},
            params: {
                limit: K,
                time_range: timeRange,
            },
        });
        return tracksResponse.data.items;
    } catch (error) {
        console.error("Error: Couldn't get top tracks: ");
        console.error(error.response?.data || error.message);
        return null;
    }
}

const getTopKArtists = async (timeRange, K, accessToken) => {
    /**
     * Description: Returns the user's top K artists for a given time range.
     * Uses the Spotify Web API's `/me/top/artists` endpoint.
     * 
     * ========== Parameters ===========
     * @param timeRange - Time range over which to compute top artists.
     *                              Valid values: 'short_term', 'medium_term', 'long_term'.
     * @param K - Number of top artists to return (max 50).
     * @param accessToken - Spotify access token for authorization.
     * 
     * ========== Returns ============
     * @returns topArtists - Array of top artist objects returned by the Spotify API.
     */
    try {
        const artistsResponse = await axios.get("https://api.spotify.com/v1/me/top/artists", {
            headers: {Authorization: `Bearer ${accessToken}`},
            params: {
                limit: K,
                time_range: timeRange,
            }
        });
        return artistsResponse.data.items;
    } catch (error) {
        console.error("Error: Couldn't get top artists: ");
        console.error(error.response?.data || error.message);
    }
}


const getTopKGenres = async (K, accessToken) => {
    /**
     * Description: Returns the top K most frequent genres from the user's top 50 long-term artists.
     * 
     * ========== Parameters ===========
     * @param {number} K - Number of top genres to return.
     * @param {string} accessToken - Spotify access token for authorization.
     * 
     * ========== Returns ============
     * @returns topGenres - Array of top K genre strings.
     */
    var topGenres = [];
    const comparator = (a, b) => b.count - a.count;
    let genresCounts = {};
    var topArtists = await getTopKArtists("long_term", 50, accessToken);
    for (let artist of topArtists) {

        for (let genre of artist.genres) {
            if (!genresCounts.hasOwnProperty(genre)) {
                genresCounts[genre] = 1;
            } else {
                genresCounts[genre] += 1;
            }
        }
    }
    const items = Object.entries(genresCounts).map(([genre, count]) => ({ genre, count }));
    const heap = new Heap(comparator);
    items.forEach(item => heap.push(item));
    
    for (let i = 0; !heap.isEmpty() && i < K; i++) {
        topGenres.push(heap.poll().genre);
    }
    return topGenres;
}

const getTracksTitles = (tracksItems) => {
    /**
     * Description: Constructs a list of track titles in the format:
     * "Track Name - Artist1, Artist2, ..."
     * 
     * ========== Parameters ===========
     * @param tracksItems: An array of track objects, each containing a `name` and an array of `artists`.
     * 
     * ========== Returns ============
     * @returns tracksTitles: An array of formatted track title strings.
     */
    var tracksTitles = [];
    for (const track of tracksItems) {
        var trackTitle = track.name + " - ";
        for (const artist of track.artists) {
            trackTitle += artist.name + ", ";
        }
        trackTitle = trackTitle.slice(0, -2);
        tracksTitles.push(trackTitle);
    }
    return tracksTitles;
}

const getArtistsTitles = (artistsItems) => {
    var artistsTitles = [];
    for (const artist of artistsItems) {
        var artistTitle = artist.name;
        artistsTitles.push(artistTitle);
    }
    return artistsTitles;
}



const getTracksByTitle = async (tracksTitlesList, accessToken) => {
    /**
     * Description: Given a list of songs to search for, this function searches for these titles
     * extracts the first result (track in this case) of the search and appends it to the tracks
     * list
     * 
     * ========== Parameters ===========
     * @param tracksTitlesList: The array with the names of tracks to search.
     * @param accessToken: The access token we are going to use to authorize this search.
     * 
     * ========== Returns ============
     * @returns tracksList: An array with the found tracks. Each entry includes information about the 
     * track such as albums, artists, id, name.....etc.
     */
    var tracksList = [];
    for (const trackTitle of tracksTitlesList) {
        try {
            const searchResponse = await axios.get("https://api.spotify.com/v1/search", {
                params: {
                    q: trackTitle,
                    type: "track",
                },
                headers: { Authorization: `Bearer ${accessToken}`},
            });
            var searchResult = searchResponse.data.tracks;
            if (searchResult.total === 0 || searchResult.items.length === 0) {
                console.warn(`No results for: ${trackTitle}`);
                continue;
            }
            tracksList.push(searchResult.items[0]);

        } catch (error) {
            console.error(`Error searching for: ${trackTitle}`);
            console.error(error.response?.data || error.message);
        }
    }
    return tracksList;
}


const createPlaylist = async (tracksList, playlistTitle, playlistDescription, accessToken) => {
    /**
     * Description: This function creates a new playlist under the user's Spotify account,
     * then adds the given list of tracks to the newly created playlist.
     * 
     * ========== Parameters ===========
     * @param tracksList: An array of track objects (retrieved from Spotify API) to add to the playlist.
     * @param playlistTitle: A string representing the title of the playlist to be created.
     * @param accessToken: A valid Spotify access token for authenticating the user.
     * 
     * ========== Returns ============
     * @returns None explicitly. This function triggers the playlist creation and adds tracks to it.
     * Errors are logged to the console in case of failure.
     */
    const userID = await getUserID(accessToken);
    var endPointURL = `https://api.spotify.com/v1/users/${userID}/playlists`;
    try {
        const response = await axios.post(endPointURL, 
            {
                name: playlistTitle,
                public: true,
                description: playlistDescription,
            }, 
            {
                headers: {Authorization: `Bearer ${accessToken}`},
            }
        );
        const playlistID = response.data.id;
        addTracksToPlaylist(tracksList, playlistID, accessToken);

    } catch(error) {
        console.error("Error creating the playlist: ");
        console.error(error.response?.data || error.message);
    }
}

const addTracksToPlaylist = async (tracksList, playlistID, accessToken) => {
    /**
     * Description: Given a list of Spotify track objects, this function extracts the track URIs
     * and adds them to a specified playlist using Spotify Web API.
     * 
     * ========== Parameters ===========
     * @param tracksList: An array of track objects (e.g., returned from getTracksByTitle). Each track object
     * must contain an `id` field which identifies the track in the Spotify catalog.
     * 
     * @param playlistID: The Spotify ID of the playlist to which the tracks will be added.
     * 
     * @param accessToken: The OAuth access token used to authorize the request.
     * 
     * ========== Returns ============
     * @returns void: This function does not return anything. It sends a POST request to Spotify to add tracks
     * to the playlist. If an error occurs, it logs it to the console.
     */
    
    var endPointURL = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;
    const uris = tracksList.map(track => `spotify:track:${track.id}`);

    try {
        const response = await axios.post(endPointURL, {uris}, {
            headers: {Authorization: `Bearer ${accessToken}`},
        });
    } catch (error) {
        console.error(`Error adding song ${track.name} to the playlist: `);
        console.error(error.response?.data || error.message);        
    }    

}

const getUserID = async (accessToken) => {
    /**
     * Description: Fetches the Spotify user ID associated with the provided access token.
     * 
     * ========== Parameters ===========
     * @param accessToken: A valid Spotify access token for authenticating the request.
     * 
     * ========== Returns ============
     * @returns userID: A string representing the Spotify user ID.
     * If the request fails, logs the error and returns null.
     */
    try {
        const response = await axios.get("https://api.spotify.com/v1/me", {
            headers: { Authorization: `Bearer ${accessToken}`}
        });
        return response.data.id;
    } catch (error) {
        console.error("Error retrieving user's profile: ");
        console.error(error.response?.data || error.message);
        return null;
    }
}


export default {
    getTopKTracks,
    getTopKArtists,
    getTopKGenres,
    getTracksTitles,
    getArtistsTitles,
    getTracksByTitle,
    createPlaylist,
    addTracksToPlaylist,
    getUserID
  };