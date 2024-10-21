import { fetchNewsData } from "../../data/repositories/newsRepository";
import { Article } from "../models/Article";

export const getNews = async (): Promise<Article[]> => {
  return await fetchNewsData();
};
