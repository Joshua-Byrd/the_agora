import { Component } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { TopicButtonsComponent } from '../topic-buttons/topic-buttons.component';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-navbar',
  imports: [SearchBarComponent, TopicButtonsComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {

  constructor(private newsService: NewsService){}

  /**
   * Receives the search terms from search-bar.component.ts and passes it to the NewsService
   * @param term the keywords searched for by the user
   */
  onSearchTermReceipt(term: string) {
    // console.log("search term received from child: ", term);
    this.newsService.searchArticles(term);
    
  }

  /**
   * Receives the topic emitted by topic.buttons.component.ts and passes it to the NewsService
   * @param topic the topic of news articles to display (i.e. the button that was clicked)
   */
  onTopicReceipt(topic: string) {
    // console.log("topic received from child: ", topic);
    this.newsService.getTopHeadlines(topic);
  }
}
