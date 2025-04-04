import { Injectable } from '@angular/core';
import { Article } from './news.service';

@Injectable({
  //service is a singleton
  providedIn: 'root'
})
export class PersistenceService {

  constructor() { }

  //a prefix for the JSON objects when they get saved
  private storagePrefix = "agora_";

  /**
   * Saves the given array of articles to local storage
   * @param board the name fo the board, either 'toBeRead' or 'Reading'
   * @param articles an array of articles to be saved
   */
  saveBoardState(board: 'toBeRead' | 'reading', articles: Article[]): void {
    localStorage.setItem(
      this.storagePrefix + board,
      JSON.stringify(articles)
    );
  }

  /**
   * returns the given array of Articles if it exists in local storage. Otherwise
   * returns an empty array
   * 
   * @param board the name of the board to get
   * @returns an array of articles if it is present in storage
   */
  loadBoardState(board: 'toBeRead' | 'reading'): Article[] {
    const data = localStorage.getItem(this.storagePrefix + board);
  
    try {
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error(`Error loading board "${board}":`, error);
      return [];
    }
  }

  /**
   * clears the given board from local storage
   * @param board the array to remove
   */
  clearBoard(board: 'toBeRead' | 'reading'): void {
    localStorage.removeItem(this.storagePrefix + board);
  }
}
