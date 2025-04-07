import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsService, Article } from '../../services/news.service';
import { CdkDragDrop, CdkDropList, CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-article-grid',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './article-grid.component.html',
  styleUrls: ['./article-grid.component.css']
})
export class ArticleGridComponent implements OnInit {
  //list of articles to display
  articles: Article[] = [];
  //where articles can be droppped
  connectedDropLists = ['toBeReadList', 'readingList', 'trashList'];

  constructor(public newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService.articles$.subscribe((articles) => {
      this.articles = articles;
    });

    this.newsService.getTopHeadlines();
  }
}
