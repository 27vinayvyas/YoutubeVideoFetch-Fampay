const videoService = require('../services/VideoService');

const searchVideos = async (req, res) => {
    try {
        const query = req.query.q; // Extract search query from request parameters
        if (!query) {
            return res.status(400).json({ success: false, message: "Search query is required" });
        }

        const videos = await videoService.searchVideos(query);
        res.status(200).json({ success: true, data: videos });
    } catch (error) {
        console.error("Error in searchVideos controller:", error.message);
        res.status(500).json({ success: false, message: "Failed to perform search", error: error.message });
    }
};

module.exports = { searchVideos };