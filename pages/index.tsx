import { useQuery } from "@tanstack/react-query";
import { getNews } from "../src/domain/usecases/getNews";
import { Article } from "../src/domain/models/Article";
import React, { useState, useEffect } from "react";

const NewsPage: React.FC = () => {
  const {
    data: articles,
    isLoading,
    error,
  } = useQuery<Article[], Error>({
    queryKey: ["news"],
    queryFn: getNews,
  });

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);
  const [showSaved, setShowSaved] = useState<boolean>(false); // State to toggle saved articles visibility

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Function to save article to localStorage (as an array)
  const saveToLocalStorage = (article: Article) => {
    const savedArticles = JSON.parse(
      localStorage.getItem("savedArticles") || "[]"
    );
    // Avoid duplicate entries by checking if the article already exists
    const isArticleSaved = savedArticles.some(
      (saved: Article) => saved.url === article.url
    );
    if (!isArticleSaved) {
      savedArticles.push(article);
      localStorage.setItem("savedArticles", JSON.stringify(savedArticles));
      setSavedArticles(savedArticles); // Update saved articles in the state
    }
  };

  // Load saved articles from localStorage when the component mounts
  useEffect(() => {
    const storedArticles = JSON.parse(
      localStorage.getItem("savedArticles") || "[]"
    );
    setSavedArticles(storedArticles);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
        <SkeletonLoader />
      </div>
    );
  }

  if (error) {
    return <div>Error loading news: {error.message}</div>;
  }

  // Filter articles based on search term
  const filteredArticles = articles?.filter((article) => {
    return (
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const renderArticles = (articles: Article[], startIndex: number) => {
    const isLeftSide = (startIndex / 5) % 2 === 0;
    const firstArticle = articles[startIndex];
    const nextArticles = articles.slice(startIndex + 1, startIndex + 5);

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 h-auto gap-4 p-4">
        {/* Fullscreen for first news */}
        {firstArticle && (
          <div
            className={`bg-gray-200 p-4 md:h-full md:flex flex-col justify-between ${
              isLeftSide ? "" : "md:order-last"
            }`}
          >
            <img
              className="w-full md:h-3/4 object-cover rounded-lg"
              src={firstArticle.urlToImage || "/placeholder.jpg"}
              alt={firstArticle.title}
            />
            <div className="mt-4">
              <h3 className="text-lg md:text-2xl font-bold">
                {firstArticle.title}
              </h3>
              <small className="block mt-2 text-gray-500 text-sm">
                Published on:{" "}
                {new Date(firstArticle.publishedAt).toLocaleString()}
              </small>
              <p className="mt-2 text-sm md:text-base">
                {firstArticle.description}
              </p>
              <a
                href={firstArticle.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => saveToLocalStorage(firstArticle)} // Save article on click
                className="text-blue-500 text-sm"
              >
                Read more
              </a>
            </div>
          </div>
        )}

        {/* Zigzag 2x2 Grid for next 4 articles */}
        <div className="grid grid-cols-2 grid-rows-2 gap-4 h-full">
          {nextArticles.map((article, index) => (
            <div
              key={article.url}
              className={`bg-gray-200 p-4 flex flex-col justify-between ${
                index % 2 === 0 ? "md:order-first" : "md:order-last"
              }`} // Zigzag layout
            >
              <img
                className="w-full h-40 object-cover rounded-lg"
                src={article.urlToImage || "/placeholder.jpg"}
                alt={article.title}
              />
              <div className="mt-2">
                <h3 className="text-sm font-bold md:text-base">
                  {article.title}
                </h3>
                <small className="block my-2 text-gray-500 text-xs md:text-sm">
                  Published on: {new Date(article.publishedAt).toLocaleString()}
                </small>
                <p className="text-xs mt-1 md:text-sm">{article.description}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => saveToLocalStorage(article)} // Save article on click
                  className="text-blue-500 text-xs md:text-sm"
                >
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Search Input */}
      <div className="p-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search news..."
          className="w-full p-2 border rounded-lg"
        />
      </div>

      {/* Button to toggle saved articles */}
      <div className="p-4">
        <button
          onClick={() => setShowSaved(!showSaved)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          {showSaved ? "Hide Saved Articles" : "View Saved Articles"}
        </button>
      </div>

      {/* Display saved articles */}
      {showSaved && (
        <div className="p-4">
          <h2 className="text-2xl font-bold">Saved Articles</h2>
          {savedArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {savedArticles.map((article) => (
                <div
                  key={article.url}
                  className="bg-gray-200 p-4 flex flex-col justify-between"
                >
                  <img
                    className="w-full h-40 object-cover rounded-lg"
                    src={article.urlToImage || "/placeholder.jpg"}
                    alt={article.title}
                  />
                  <div className="mt-2">
                    <h3 className="text-sm font-bold md:text-base">
                      {article.title}
                    </h3>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 text-xs md:text-sm"
                    >
                      Read more
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>No saved articles.</div>
          )}
        </div>
      )}

      <div className="p-4">
        <h2 className="text-2xl font-bold">Articles</h2>
      </div>
      {/* Display filtered articles */}
      {filteredArticles?.length > 0 ? (
        filteredArticles.map((_, index) =>
          index % 5 === 0 ? renderArticles(filteredArticles, index) : null
        )
      ) : (
        <div className="p-4">No articles found.</div>
      )}
    </div>
  );
};

const SkeletonLoader: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 w-full h-full">
    {/* Skeleton for the first (fullscreen) article */}
    <div className="bg-gray-200 p-4 md:h-full flex flex-col justify-between">
      <div className="bg-gray-300 w-full h-3/4 rounded-lg"></div>
      <div className="mt-4">
        <div className="bg-gray-400 h-6 rounded w-3/4"></div>
        <div className="bg-gray-400 mt-2 h-4 rounded w-1/2"></div>
        <div className="bg-gray-400 mt-2 h-4 rounded w-3/4"></div>
      </div>
    </div>

    {/* Skeleton for the next 4 articles (2x2 grid) */}
    <div className="grid grid-cols-2 grid-rows-2 gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className={`bg-gray-200 p-4 flex flex-col justify-between ${
            index % 2 === 0 ? "md:order-first" : "md:order-last"
          }`}
        >
          <div className="bg-gray-300 w-full h-40 rounded-lg"></div>
          <div className="mt-2">
            <div className="bg-gray-400 h-4 rounded w-3/4"></div>
            <div className="bg-gray-400 mt-2 h-4 rounded w-1/2"></div>
            <div className="bg-gray-400 mt-2 h-4 rounded w-3/4"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default NewsPage;
