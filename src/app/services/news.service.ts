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
  providedIn: 'root'
})

export class NewsService {
  
  //if downloading and running from Github, change this to your own API key
  private apiKey = '8aaee90f51a245999fc29a980d1ce20c';
  //the base URL for NewsAPI
  private baseUrl = 'https://newsapi.org/v2';

  //stores the currently downloaded articles
  private articlesSubject = new BehaviorSubject<Article[]>([]);
  articles$ = this.articlesSubject.asObservable();

  //the article currently selected for display
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
        this.articlesSubject.next(response.articles);
      })
  }
}
