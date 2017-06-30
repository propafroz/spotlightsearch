import { Component, OnInit, Input } from '@angular/core';
import {TextSearchService} from "../services/text-search.service";

@Component({
  selector: 'app-text-search-result-detail',
  templateUrl: './text-search-result-detail.component.html',
  styleUrls: ['./text-search-result-detail/text-search-result-detail.component.css']
})

export class TextSearchResultDetailComponent implements OnInit {

  @Input() selectedItem: any;
  constructor(private textSearchService: TextSearchService) { }

  ngOnInit() {
      this.textSearchService.retreiveQueryResults().subscribe(message => { 
          this.selectedItem = this.textSearchService.getSelectedItemAtIndex(0);
      });
  }

}
