const videoService = require('../services/VideoService');

const getPaginatedVideos = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
        const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not provided

        const result = await videoService.getPaginatedVideos(page, limit);

        res.status(200).json({
            success: true,
            data: result.videos,
            pagination: {
                totalItems: result.totalItems,
                totalPages: result.totalPages,
                currentPage: page,
                pageSize: limit,
            },
        });
    } catch (error) {
        console.error('Error fetching paginated videos:', error.message);
        res.status(500).json({ success: false, message: 'Failed to fetch videos', error: error.message });
    }
};

module.exports = { getPaginatedVideos };