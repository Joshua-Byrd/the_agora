import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';


//import all components
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { TopicButtonsComponent } from './components/topic-buttons/topic-buttons.component';
import { ArticleGridComponent } from './components/article-grid/article-grid.component';
import { ArticleModalComponent } from './components/article-modal/article-modal.component';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';


@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent,
    SearchBarComponent,
    TopicButtonsComponent,
    ArticleGridComponent,
    ArticleModalComponent,
    KanbanBoardComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  
}

