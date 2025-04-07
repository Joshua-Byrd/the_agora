import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * represnts an article received from the NewsAPI
 */
export interface Article {
  title: string,
  description: string,
  url: string,
  urlToImage: string,
  source: {name: string},
  publishedAt: string,
  content: string
}


@Injectable({
  //NewsService is a singleton
  providedIn: 'root'
})

export class NewsService {
  
  //***DONT FORGET TO REMOVE THIS***
  private apiKey = '8aaee90f51a245999fc29a980d1ce20c';
  //the base URL for NewsAPI
  private baseUrl = 'https://newsapi.org/v2';

  //observable for the current collection of articles
  private articlesSubject = new BehaviorSubject<Article[]>([]);
  //observable for the currently select article (to be displayed)
  private selectedArticleSubject = new BehaviorSubject<Article | null>(null);
  
  //expose read only observables to subscribe to
  articles$ = this.articlesSubject.asObservable();  
  selectedArticle$ = this.selectedArticleSubject.asObservable();

  //time to live and prefix used for caching articles
  private readonly cacheTTL = 1000 * 60 * 60; // 1 hour
  private readonly cacheKeyPrefix = 'agora_cache_';


  constructor(private http: HttpClient) {}


  /**
   * makes a GET request to the NewsAPI to retrieve the top headlines/atricles.  If the category is
   * present (i.e. a topic button has been clicked), retrieves th etop headlines in that category.
   * Otherwise retrieves the general top headlines (this is the starting state when the page loads).
   * @param category an optional category from which to retrieve articles - directly corresponds to
   * topic buttons
   */
  getTopHeadlines(category?: string): void {

    //used for caching articles
    const cacheKey = `${this.cacheKeyPrefix}top_${category}`;
    const now = Date.now();

    //try to load from cache
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const parsed: { timestamp: number; articles: Article[] } = JSON.parse(cached);
      //if the current time is less than the TTL (1 hour), set the articlesSubject as the loaded articles
      if (now - parsed.timestamp < this.cacheTTL) {
        console.log(`Loaded top headlines for "${category}" from cache.`);
        this.articlesSubject.next(parsed.articles);
      }
    } else {
      //if no cached articles or past the TTL, fetch the articles from the API:

      //create request parameters object
      const params = new HttpParams()
        .set('apiKey', this.apiKey)
        .set('country', 'us')
        .set('category', category ?? '')
        .set('pageSize', 24);
      
      //make the GET request
      this.http.get<{articles: Article[]}>(`${this.baseUrl}/top-headlines`, { params })
        .subscribe(response => {
          const articles = response.articles;
          //push response onto articlesSubject and notify subscribers 
          this.articlesSubject.next(articles);
          
          //cache the articles with current timestamp
          const toCache = {
            timestamp: now,
            articles
          };
          
          localStorage.setItem(cacheKey, JSON.stringify(toCache));
          console.log(`Fetched and cached top headlines for "${category}"`);
        })
    }
  }

  /**
   * makes a GET request with the user's search terms
   * @param query the search terms a user has entered
   */
  searchArticles(query: string): void {
    const normalizedQuery = query.trim().toLowerCase();
    //used for caching search results
    const cacheKey = `${this.cacheKeyPrefix}search_${normalizedQuery}`;
    const now = Date.now();

    //try to load from cache
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
      const parsed: { timestamp: number; articles: Article[] } = JSON.parse(cached);
      //if the current time is less than the TTL (1 hour), set the articlesSubject as the loaded articles
      if (now - parsed.timestamp < this.cacheTTL) {
        console.log(`Loaded search results for "${query}" from cache.`);
        this.articlesSubject.next(parsed.articles);
      }
    } else {
      //if no cached articles or past the TTL, fetch the articles from the API:
      //create request parameters object
      const params = new HttpParams()
        .set('apiKey', this.apiKey)
        .set('q', normalizedQuery)
        .set('pageSize', 24);
      
        //make the GET request
      this.http.get<{articles: Article[]}>(`${this.baseUrl}/everything`, { params })
        .subscribe(response => {
          const articles = response.articles;
          //push response onto articlesSubject and notify subscribers
          this.articlesSubject.next(response.articles);

          //cache the search results
          const toCache = {
            timestamp: now,
            articles
          };
          localStorage.setItem(cacheKey, JSON.stringify(toCache));
          console.log(`Fetched and cached search results for "${query}"`);
        })
      }
  }

  /**
   * sets the currently selected article (the article to display) to be the given article
   * @param article the article to be displayed
   */
  selectArticle(article: Article | null): void {
    //when an article is selected, notify subscribers (the main component)
    this.selectedArticleSubject.next(article);
  }
}
