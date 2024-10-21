import axios from 'axios';

const API_URL = 'https://newsapi.org/v2/everything';
const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY; // Use environment variable

interface NewsApiResponse {
  articles: {
    source: { name: string };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
  }[];
}

export const fetchNewsApi = async (): Promise<NewsApiResponse> => {
  const response = await axios.get(API_URL, {
    params: {
        q: 'bitcoin',
        from: '2024-09-21',
        sortBy: 'publishedAt',
        apiKey: API_KEY,
      },
  });
  return response.data;
};
