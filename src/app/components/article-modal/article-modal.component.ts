import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsService, Article } from '../../services/news.service';

@Component({
  selector: 'app-article-modal',
  imports: [CommonModule],
  templateUrl: './article-modal.component.html',
  styleUrl: './article-modal.component.css'
})
export class ArticleModalComponent implements OnInit {
  //stores the seleted article
  article: Article | null = null;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService.selectedArticle$.subscribe(article => {
        this.article = article;
    })
  }

}
