import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Article } from '../../services/news.service';
import { CdkDropList, CdkDropListGroup, CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';

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
  //the id for it to be a cdk droplist
  @Input() dropListId: string = '';
  @Input() connectedDropLists: string[] = [];

  //emitter for when an article is dropped
  @Output() articleDropped = new EventEmitter<{ article: Article, from: Article[] | null }>();

  /**
   * 
   * @param event 
   */
  onDrop(event: CdkDragDrop<Article[]>) {
    const article = event.item.data;

    this.articleDropped.emit({
      article,
      from: event.previousContainer.data || null
    })
  }

}
