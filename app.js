const express = require('express')
const videoRouter = require('./routes/VideoRoutes')
const MainLoop = require('./services/MainLoop');
const connectDB = require('./config/DBConfig');

const app = express()

app.use('/api/videos', videoRouter)

//ConnectDB
connectDB();

MainLoop.startMainLoop(); // Start the cron job

module.exports = app;