import { Component, OnInit } from '@angular/core';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import { KanbanColumnComponent } from "../kanban-column/kanban-column.component";
import { Article, NewsService } from '../../services/news.service';
import { CommonModule } from '@angular/common';
import { PersistenceService } from '../../services/persistence.service';

@Component({
  selector: 'app-kanban-board',
  imports: [DragDropModule, KanbanColumnComponent, CommonModule],
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.css'
})
export class KanbanBoardComponent implements OnInit {

  constructor(
      private persistenceService: PersistenceService,
      private newsService: NewsService) {}

  ngOnInit(): void{
    //load boards from local storage when the component loads
    this.toBeRead = this.persistenceService.loadBoardState('toBeRead');
    this.reading = this.persistenceService.loadBoardState('reading')
  }

  //list of ids for the cdk droplists (also includes the main grid)
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
      //still need to save the board state if one is removed
      this.saveAllBoards();
      return;
    }

    //otherwise add to the target array
    if (target === 'toBeRead') {
      this.toBeRead.push(article);
    } else if (target === 'reading') {
      this.reading.push(article);
    }

    //when an article is dropped on a board, save the state to local storage
    this.saveAllBoards();
  }

  /**
   * uses the PersistenceService to save both boards to local storage
   */
  private saveAllBoards(): void {
    this.persistenceService.saveBoardState('toBeRead', this.toBeRead);
    this.persistenceService.saveBoardState('reading', this.reading);
  }

  /**
   * resets and saves both kanban boards
   */
  clearAllBoards(): void {
    this.toBeRead = [];
    this.reading = [];

    this.saveAllBoards();
  }

}
