import { Component } from '@angular/core';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import { KanbanColumnComponent } from "../kanban-column/kanban-column.component";
import { Article } from '../../services/news.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kanban-board',
  imports: [DragDropModule, KanbanColumnComponent, CommonModule],
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.css'
})
export class KanbanBoardComponent {

  //list of ids for the cdk droplists
  dropListIds = ['gridList','toBeReadList', 'readingList', 'trashList'];
  
  //arrays store cards that have been dragged to their respective boards
  toBeRead: Article[] = [];
  reading: Article[] = [];

  /**
   * handler for the drop action on the kanban columns. The article is added to the
   * appropriate target array  (unless being dragged to the read board) and removed from the source
   * @param target 
   * @param event 
   * @returns 
   */
  handleDrop(target: 'toBeRead' | 'reading' | 'read', 
    event: CdkDragDrop<Article[]>) {

      const article = event.item.data as Article;

    //remove from source if necessary
    this.toBeRead = this.toBeRead.filter(a => a !== article);
    this.reading = this.reading.filter(a => a !== article);
    
    //if dragging to the read (trash) column, don't add to any array
    if (target === 'read') {
      return;
    }

    //otherwise add to the target array
    if (target === 'toBeRead') {
      this.toBeRead.push(article);
    } else if (target === 'reading') {
      this.reading.push(article);
    }
  }
}
