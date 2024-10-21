export class Article {
    name: string;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
  
    constructor({ name, author, title, description, url, urlToImage, publishedAt }: Partial<Article>) {
      this.name = name ?? 'Unknown';
      this.author = author ?? 'Unknown';
      this.title = title ?? '';
      this.description = description ?? '';
      this.url = url ?? '';
      this.urlToImage = urlToImage ?? '';
      this.publishedAt = publishedAt ?? '';
    }
  }
  