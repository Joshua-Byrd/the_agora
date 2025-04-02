import { Component } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { KanbanColumnComponent } from "../kanban-column/kanban-column.component";
import { Article } from '../../services/news.service';

@Component({
  selector: 'app-kanban-board',
  imports: [DragDropModule, KanbanColumnComponent],
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.css'
})
export class KanbanBoardComponent {
  toBeRead: Article[] = [
    { title: 'This a headline, perhaps a long one to test how it will format within the Kanban boards', 
      description: 'Summary 1', url: '', urlToImage: '', source: { name: 'Demo' }, publishedAt: '', content: '' },
    { title: 'This a headline, perhaps a long one to test how it will format within the Kanban boards', 
        description: 'Summary 1', url: '', urlToImage: '', source: { name: 'Demo' }, publishedAt: '', content: '' },
    { title: 'This a headline, perhaps a long one to test how it will format within the Kanban boards', 
          description: 'Summary 1', url: '', urlToImage: '', source: { name: 'Demo' }, publishedAt: '', content: '' },
    { title: 'This a headline, perhaps a long one to test how it will format within the Kanban boards', 
      description: 'Summary 1', url: '', urlToImage: '', source: { name: 'Demo' }, publishedAt: '', content: '' }        
  ];

  reading: Article[] = [
    { title: 'This is also a headline, maybe longer, maybe not as long. This servers the same purpose to test how a card will render',
       description: 'Summary 2', url: '', urlToImage: '', source: { name: 'Demo' }, publishedAt: '', content: '' },
    { title: 'This a headline, perhaps a long one to test how it will format within the Kanban boards', 
      description: 'Summary 1', url: '', urlToImage: '', source: { name: 'Demo' }, publishedAt: '', content: '' },
    { title: 'This a headline, perhaps a long one to test how it will format within the Kanban boards', 
        description: 'Summary 1', url: '', urlToImage: '', source: { name: 'Demo' }, publishedAt: '', content: '' },
    { title: 'This a headline, perhaps a long one to test how it will format within the Kanban boards', 
          description: 'Summary 1', url: '', urlToImage: '', source: { name: 'Demo' }, publishedAt: '', content: '' },
    { title: 'This a headline, perhaps a long one to test how it will format within the Kanban boards', 
      description: 'Summary 1', url: '', urlToImage: '', source: { name: 'Demo' }, publishedAt: '', content: '' }
  ];

}
