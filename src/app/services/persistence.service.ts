import { Injectable } from '@angular/core';
import { Article } from './news.service';

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {

  constructor() { }

  //a prefix for the JSON objects when they get saved
  private storagePrefix = "_agora";

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
   * returns an array of Articles if it exists in local storage. Otherwise
   * returns an empty array
   * 
   * @param board the name of the board to get
   * @returns an array of articles if it is present in storage
   */
  loadBoardState(board: 'toBeRead' | 'reading'): Article[] {
    const data = localStorage.getItem(this.storagePrefix + board);
    return data? JSON.parse(data): [];
  }
}
