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
  
  //remember to remove this after the project is done (the repo is public)
  private apiKey = '8aaee90f51a245999fc29a980d1ce20c';
  //the base URL for NewsAPI
  private baseUrl = 'https://newsapi.org/v2';

  //observable for the current collection of articles
  private articlesSubject = new BehaviorSubject<Article[]>([]);
  articles$ = this.articlesSubject.asObservable();

  //observable for the currently select article (to be displayed)
  private selectedArticleSubject = new BehaviorSubject<Article | null>(null);
  selectedArticle$ = this.selectedArticleSubject.asObservable();


  constructor(private http: HttpClient) {}


  /**
   * makes a GET request to the NewsAPI to retrieve the top headlines/atricles.  If the category is
   * present (i.e. a topic button has been clicked), retrieves tht etop headlines in that category.
   * Otherwise retrieves the general top headlines (this is the starting state when the page loads).
   * @param category an optional category form which to retrieve articles - directly corresponds to
   * topic buttons
   */
  getTopHeadlines(category?: string): void {
    //create request parameters object
    const params = new HttpParams()
      .set('apiKey', this.apiKey)
      .set('country', 'us')
      .set('category', category ?? '');
    
    //make the GET request
    this.http.get<{articles: Article[]}>(`${this.baseUrl}/top-headlines`, { params })
      .subscribe(response => {
        //notify subscribers to articlesSubject
        this.articlesSubject.next(response.articles);
      })
  }

  /**
   * makes a GET request with the search terms that user searches for
   * @param query the search terms a user has entered
   */
  searchArticles(query: string): void {
    
    //create request parameters object
    const params = new HttpParams()
      .set('apiKey', this.apiKey)
      .set('q', query)
    
      //make the GET request
    this.http.get<{articles: Article[]}>(`${this.baseUrl}/everything`, { params })
      .subscribe(response => {
        //notify subscribers
        this.articlesSubject.next(response.articles);
      })
  }

  /**
   * sets the currently selected article (the article to display) to be the given article
   * @param article the article to be displayed
   */
  selectArticle(article: Article): void {
    //when an article is selected, notify subscribers (the main component)
    this.selectedArticleSubject.next(article);
  }
}
