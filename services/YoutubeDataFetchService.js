const axios = require('axios'); // Library for making HTTP requests
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env

const API_KEYS = process.env.YOUTUBE_API_KEYS.split(','); // Multiple API keys from .env
let apiKeyIndex = 0; // Tracks the current API key in use

const API_KEY = process.env.YOUTUBE_API_KEY;

const youtubeService = {
    // Fetch videos from YouTube API
    fetchLatestVideos: async (query, publishedAfter) => {
        const apiKey = API_KEY; // Get the current API key
        const url = `https://www.googleapis.com/youtube/v3/search`;

        try {
            const response = await axios.get(url, {
                params: {
                    key: apiKey,
                    q: query, // Search query (e.g., "football")
                    part: 'snippet', // Specify fields to fetch
                    type: 'video', // Fetch only videos
                    order: 'date', // Sort by publishing date
                    publishedAfter, // Filter videos published after this datetime
                },
            });

            // Extract video data
            console.log("Data Fetched");
            console.log(response.data)

            const videos = response.data.items.map((item) => ({
                videoId: item.id.videoId,
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnails: item.snippet.thumbnails,
                publishedDatetime: item.snippet.publishedAt,
            }));
            console.log(videos)
            return videos; // Return the fetched video data
        } catch (error) {
            // Handle quota exhaustion by switching API keys
            if (error.response && error.response.status === 403 && apiKeyIndex < API_KEYS.length - 1) {
                console.warn(`Quota exceeded for API key ${apiKey}. Switching to next key.`);
                apiKeyIndex++;
                return youtubeService.fetchLatestVideos(query, publishedAfter); // Retry with next key
            }
            console.error(`Error fetching videos: ${error.message}`);
            throw error;
        }
    },
};

module.exports = youtubeService;