import { fetchNewsApi } from "../api/newsApi";
import { Article } from "../../domain/models/Article";

export const fetchNewsData = async (): Promise<Article[]> => {
  const { articles } = await fetchNewsApi();
  return articles.map(
    (article) =>
      new Article({
        name: article.source.name,
        author: article.author,
        title: article.title,
        description: article.description,
        url: article.url,
        urlToImage: article.urlToImage,
        publishedAt: article.publishedAt,
      })
  );
};
