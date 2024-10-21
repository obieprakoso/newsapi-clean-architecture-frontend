# NewsAPI Client with Clean Architecture (Frontend with TypeScript)

## Description
This project implements a clean architecture frontend using **TypeScript**, fetching data from **NewsAPI**. The API key is stored securely in an `.env` file.

## Features
- Fetch the latest news from NewsAPI
- Structured with clean architecture principles focusing on data and domain layers
- Developed using TypeScript for type safety and maintainability

## Technology Stack
- **TypeScript**
- **NextJs** (or your preferred frontend framework)
- **Tailwind CSS** for styling
- **NewsAPI** for fetching news data
- **dotenv** for managing environment variables
- **axios** for making HTTP requests

## Prerequisites
- **Node.js** v16+ installed on your system
- Create an account on [NewsAPI](https://newsapi.org/) and get your API key

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/obieprakoso/newsapi-clean-architecture-frontend.git
    cd newsapi-clean-architecture-frontend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create an `.env` file in the root of your project and add your API key:
    ```env
    NEXT_PUBLIC_NEWS_API_KEY=your_newsapi_key_here
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

## Project Structure

```plaintext
src/
│
├── domain/           # Core business logic
│   ├── models/       # Domain models (e.g., News)
│   └── usecases/     # Business use cases (e.g., FetchLatestNews)
│
└── data/             # External services and API integrations
    └── api/          # NewsAPI client for fetching data
