const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    videoId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    channelTitle: { type: String, required: true },
    publishedDatetime: { type: Date, required: true, index: true }
});

// Add a text index for fuzzy search
videoSchema.index({ title: "text", description: "text" });

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;