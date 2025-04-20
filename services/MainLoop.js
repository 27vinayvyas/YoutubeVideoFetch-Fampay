const cron = require('node-cron'); // Import cron
const YoutubeService = require('./YoutubeDataFetchService'); // Import your service

let publishedAfter = new Date(Date.now() - 60 * 60 * 1000).toISOString(); // Videos from the last hour

const MainLoop = {
    startMainLoop: () => {
        cron.schedule('*/10 * * * * *', async () => {
            try {
                console.log("Fetching latest videos...");
                const videos = await YoutubeService.fetchLatestVideos("Football", publishedAfter); // Await the result
                console.log("Videos fetched successfully:", videos.length, "videos");
                publishedAfter = new Date().toISOString(); // Update the publishedAfter to now for subsequent calls
            } catch (error) {
                console.error("Error in main loop:", error.message);
            }
        });
    }
};

module.exports = MainLoop;