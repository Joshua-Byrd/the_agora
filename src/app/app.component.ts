import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';


//import all components
import { NavbarComponent } from './components/navbar/navbar.component';
import { ArticleGridComponent } from './components/article-grid/article-grid.component';
import { ArticleModalComponent } from './components/article-modal/article-modal.component';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';


@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent,
    ArticleGridComponent,
    ArticleModalComponent,
    KanbanBoardComponent,
    DragDropModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  
}

