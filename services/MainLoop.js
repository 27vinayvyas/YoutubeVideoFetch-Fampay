const cron = require('node-cron'); // Import cron
const YoutubeService = require('./YoutubeDataFetchService');
const { saveVideoData } = require('./VideoService');

let publishedAfter = new Date(Date.now() - 60 * 60 * 1000).toISOString(); // Videos from the last hour

const MainLoop = {
    startMainLoop: () => {
        cron.schedule('*/1 * * * *', async () => {
            try {
                console.log("Fetching latest videos...");
                const videos = await YoutubeService.fetchLatestVideos("Football", publishedAfter); // Await the result
                console.log("Videos fetched successfully:", videos.length, "videos");

                if (videos.length > 0) {
                    let latestPublishedDate = new Date(publishedAfter);

                    for (const video of videos) {
                        const videoDate = new Date(video.publishedDatetime);
                        if (videoDate > latestPublishedDate) {
                            latestPublishedDate = videoDate;
                        }
                    }
                    publishedAfter = latestPublishedDate.toISOString();
                }

                await saveVideoData(videos); // Store the data in MongoDB

                publishedAfter = new Date().toISOString(); // Update the publishedAfter to now for subsequent calls
            } catch (error) {
                console.error("Error in main loop:", error.message);
            }
        });
    }
};

module.exports = MainLoop;