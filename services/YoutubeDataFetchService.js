const axios = require('axios'); // Library for making HTTP requests
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env

const API_KEYS = process.env.YOUTUBE_API_KEYS.split(',');
const API_KEY = "AIzaSyCXansSxLsLilJNAYVuwM6IcR3lNVH8CEs"
let apiKeyIndex = 0;

const youtubeService = {
    // Fetch videos from YouTube API

    fetchLatestVideos: async (query, publishedAfter) => {
        const apiKey = API_KEYS[apiKeyIndex]; // Get the current API key
        const url = `https://www.googleapis.com/youtube/v3/search`;
        console.log(API_KEYS)
        console.log(API_KEYS[apiKeyIndex])
        console.log(API_KEY)

        console.log(API_KEY == API_KEYS[apiKeyIndex])
        try {
            const response = await axios.get(url, {
                params: {
                    key: apiKey,
                    q: query, // Search query ("football")
                    part: 'snippet',
                    type: 'video',
                    order: 'date',
                    // maxResults: 50,
                    publishedAfter,
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

            const sortedVideos = videos.sort((a, b) => new Date(b.publishedDatetime) - new Date(a.publishedDatetime));
            console.log(sortedVideos);

            console.log(sortedVideos)
            return sortedVideos; // Return the fetched video data
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