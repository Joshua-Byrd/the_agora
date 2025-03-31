import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

//import all components
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { TopicButtonsComponent } from './components/topic-buttons/topic-buttons.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { MainArticleComponent } from './components/main-article/main-article.component';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';


@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent,
    SearchBarComponent,
    TopicButtonsComponent,
    CarouselComponent,
    MainArticleComponent,
    KanbanBoardComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title: string = 'The Agora';
  subTitle: string = 'Coming soon for all your news needs!';
}

