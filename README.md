# YouFetch : YouTube Data Fetcher
To make an API to fetch latest videos sorted in reverse chronological order of their publishing date-time from YouTube for a given tag/search query in a paginated response.

A Node.js application that fetches video data from the YouTube API, stores it in a MongoDB database and caches in Redis, and provides an efficient way to retrieve and paginate video records.

## Features

- Fetches the latest videos from YouTube based on a search query.
- Supports multiple YouTube API keys for managing quota limits.
- Stores fetched video data in a MongoDB database.
- Provides paginated retrieval of videos, sorted by published date in descending order.
- Utilizes CRON jobs to periodically fetch new data.
- Dockerized for seamless deployment and scalability.

---

## API

## API Endpoints

1. GET `/videos`
- Description: Fetch paginated videos sorted by publishedDatetime
- Query Params:
  - `page` (optional): Page number (default: 1).
  - `limit` (optional): Videos per page (default: 10).
- Response:
  
  {
    "videos": [...],
    "totalItems": 100,
    "totalPages": 10
  }

2. GET `/search`
- Description: Search videos by query string.
- Query Params:
    - `q` (required): Search term.
    - `page` (optional): Page number (default: 1).
    - `limit` (optional): Videos per page (default: 10).

- Response:
    {
        "videos": [...],
        "totalItems"
    }

## Installation (Docker)

1. Build and Start the Container
    docker-compose up --build
