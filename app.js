const express = require('express')
const videoRouter = require('./routes/VideoRoutes')
const MainLoop = require('./services/MainLoop');

const app = express()

app.use('/api/videos', videoRouter)

MainLoop.startMainLoop(); // Start the cron job

module.exports = app;