import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Article } from '../../services/news.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-kanban-column',
  imports: [DragDropModule, CommonModule,],
  templateUrl: './kanban-column.component.html',
  styleUrl: './kanban-column.component.css'
})
export class KanbanColumnComponent {
  
  //the title of the card that has been dragged to the board
  @Input() title: string = '';
  //used to determine whether to render a regualr boord or the trash board
  @Input() isTrash: boolean = false;
  //the list of cards currently on the board
  @Input() articles: Article[] = [];

  
  @Output() articleDropped = new EventEmitter<{ article: Article, from: Article[] | null }>();

  onDrop(event: CdkDragDrop<Article[]>) {
    const article = event.item.data;

    this.articleDropped.emit({
      article,
      from: event.previousContainer.data || null
    })
  }

}
