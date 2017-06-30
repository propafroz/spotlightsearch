import { Component, OnInit } from '@angular/core';
import {TextSearchService} from "../services/text-search.service";

@Component({
  selector: 'app-text-search-result',
  templateUrl: './text-search-result.component.html',
  styleUrls: ['./text-search-result/text-search-result.component.css']
})

export class TextSearchResultComponent implements OnInit {
  private results: any;
  constructor(private textSearchService: TextSearchService) { 
      
  }

  ngOnInit() {
    this.textSearchService.retreiveQueryResults().subscribe(message => { 
          this.results = message;
          this.textSearchService.resetSelectedItemIndex();
      });
  }


}
