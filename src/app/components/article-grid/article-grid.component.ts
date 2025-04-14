import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsService, Article } from '../../services/news.service';
import { CdkDragDrop, CdkDropList, CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-article-grid',
  standalone: true,
  imports: [CommonModule, DragDropModule, FormsModule],
  templateUrl: './article-grid.component.html',
  styleUrls: ['./article-grid.component.css']
})
export class ArticleGridComponent implements OnInit {
  //list of articles to display
  articles: Article[] = [];

  //droplists where articles can be droppped
  connectedDropLists = ['toBeReadList', 'readingList', 'trashList'];

  //the order to sort the articles
  sortOrder: 'newest' | 'oldest' = 'newest';

  constructor(public newsService: NewsService) {}

  /**
   * calls the internal method to sort the articles
   */
  sortArticles(): void {
     this.articles = this.sortArticleList(this.articles);
  }

  /**
   * Sorts the given array of articles based on this.sortOrder (newest or oldest)
   * @param list - the list of articles to sort
   * @returns - the list of articles sorted either newest to oldest or vice versa
   */
  private sortArticleList(list: Article[]): Article[] {
    //copy the array of articles
    return [...list].sort((a, b) => {
      //get publishing dates
      const dateA = new Date(a.publishedAt).getTime();
      const dateB = new Date(b.publishedAt).getTime();
      //sort based on newst or oldest
      return this.sortOrder === 'newest'
        ? dateB - dateA
        : dateA - dateB;
    });
  }

  ngOnInit(): void {
    this.newsService.articles$.subscribe((articles) => {
      this.articles = articles;
    });

    this.newsService.getTopHeadlines();
  }
}
