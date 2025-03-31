import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-search-bar',
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})

export class SearchBarComponent {

  //stores the user's search from the search bar
  searchTerm: string = '';

  @Output() search = new EventEmitter<string>();

  /**
   * Trims the user's search terms and emits to the parent component
   * search -> navbar -> NewsService
   */
  searchHandler(): void {
    const trimmedSearchTerm = this.searchTerm.trim();

    if (trimmedSearchTerm) {
      this.search.emit(trimmedSearchTerm);
    }
  }
}
