import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-topic-buttons',
  imports: [CommonModule],
  templateUrl: './topic-buttons.component.html',
  styleUrl: './topic-buttons.component.css'
})
export class TopicButtonsComponent {

  //topics supported by NewsAPI
  topics: string[] = [
    'business', 
    'entertainment', 
    'general', 
    'health', 
    'science', 
    'sports', 
    'technology'
  ]

  @Output() selectedTopic = new EventEmitter<string>;

  /**
   * Emits the selected topic to the parent component (navbar) ot be used in an API call
   * topic button -> navbar -> NewsService
   * @param topic 
   */
  selectTopic(topic: string): void {
    this.selectedTopic.emit(topic)
  }

}
