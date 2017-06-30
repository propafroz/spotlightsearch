import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TextSearchService {

  private subject = new Subject<any>();
  private SUGGESTIONS_ENDPOINT = 'assets/suggestions.json';
  private selectedItemIndex;
  private results = [];


  constructor(private http: Http) { }

  getQueryResults(query: string) {
    return this.http.get(this.SUGGESTIONS_ENDPOINT)
      .map((res: Response) => {
        let suggestions = res.json();
        return this.filter(query, suggestions);
      });
  }

  filter(query: string, suggestions: any) {
    let pattern = new RegExp(query);
    if (!query || !query.length) {
      return [];
    }
    let suggestionArray = [];
    for (let i in suggestions) {
      let label = suggestions[i].label.toUpperCase();
      query = query.toUpperCase();
      if (label.lastIndexOf(query, 0) === 0) {
        suggestionArray.push(suggestions[i]);
      }
    }
    if (suggestionArray.length) {
      suggestionArray[0].class = 'active';
    }
    return suggestionArray;
  }

  sendQueryResults(results) {
    this.setCurrentQueryResults(results);
    this.subject.next(results);
  }

  getSelectedItemIndex() {
    return this.selectedItemIndex || 0;
  }

  getSelectedItemAtIndex(idx) {
    return this.results[idx];
  }

  resetSelectedItemIndex() {
    this.selectedItemIndex = 0;
  }

  setCurrentQueryResults(results) {
    this.results = results;
  }

  getCurrentQueryResults() {
    return this.results || [];
  }

  resetCurrentQueryResults() {
    this.sendQueryResults([]);
  }

  setSelectedItemIndex(idx) {
    this.selectedItemIndex = idx;
  }

  retreiveQueryResults() {
    return this.subject.asObservable();
  }

}
