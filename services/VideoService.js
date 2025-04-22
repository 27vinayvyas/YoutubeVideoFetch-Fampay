const Video = require('../models/VideoModel');
const redisClient = require('../config/RedisConflg')

const saveVideoData = async (videoData) => {
    try {
        for (const video of videoData) {
            await Video.findOneAndUpdate(
                { videoId: video.videoId },
                { $set: video },
                { upsert: true }
            );
        }
        console.log('Video data stored successfully');
    } catch (error) {
        console.error('Error storing video data:', error.message);
    }
};

const getPaginatedVideos = async (page, limit) => {
    try {
        const skip = (page - 1) * limit; // Calculate how many documents to skip

        // Fetch videos with pagination and sort by publishedDatetime in descending order
        const videos = await Video.find()
            .sort({ publishedDatetime: -1 })
            .skip(skip)
            .limit(limit);

        // Count the total number of videos in the collection
        const totalItems = await Video.countDocuments();

        return {
            videos,
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
        };
    } catch (error) {
        console.error('Error in paginated fetch service:', error.message);
        throw error;
    }
};

const searchVideos = async (query) => {
    try {
        const cacheKey = `search:${query.toLowerCase()}`;

        //Check if data exists in Redis Cache

        const cachedVideoData = await redisClient.get(cacheKey);

        if (cachedVideoData) {
            console.log('Cache Hit, Returning cached Data');
            return JSON.parse(cachedVideoData)
        }

        console.log('Cache Miss, Fetching Data from DB');
        const videos = await Video.find({
            $text: { $search: query } // Perform text search
        }).limit(5); // Limit the results to 10 items

        redisClient.set(cacheKey, JSON.stringify(videos), { EX: 3600 })

        return videos;
    } catch (error) {
        if (error.name === 'RedisError') {
            console.error('Redis Error:', error.message);
        } else if (error.name === 'MongoServerError') {
            console.error('MongoDB Error:', error.message);
        } else {
            console.error('Unhandled Error in searchVideos:', error.message);
        }
        throw error;
    }
};

module.exports = { saveVideoData, getPaginatedVideos, searchVideos };