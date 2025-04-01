import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsService, Article } from '../../services/news.service';

@Component({
  selector: 'app-article-grid',
  imports: [CommonModule],
  templateUrl: './article-grid.component.html',
  styleUrl: './article-grid.component.css'
})
export class ArticleGridComponent  implements OnInit{
  //stores the articles to be displayed as cards
  articles: Article[] = []

  constructor(private newsService: NewsService){}

  ngOnInit(): void {
    //subscribe as an observer for articles$ in the NewsService
    this.newsService.articles$.subscribe(articles => {
      this.articles = articles;
    })

    //populate the carousel with the general top headlines initially
    this.newsService.getTopHeadlines();
  }

  /**
   * when a user clicks a card, calls selectArticle in NewsService to set the 
   * current article
   * @param article the article to be selected
   */
  onSelect(article:Article) {
    this.newsService.selectArticle(article);
  }
}
