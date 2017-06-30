import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TextSearchService } from "../services/text-search.service";

@Component({
    selector: 'app-text-search-bar',
    templateUrl: './text-search-bar.component.html',
    styleUrls: ['./text-search-bar/text-search-bar.component.css']
})

export class TextSearchBarComponent implements OnInit {

    @Input() searchTerm: string;
    @Output() onSearchTermChanged = new EventEmitter<string>();
    @Output() onSearchInputInfoChanged = new EventEmitter<string>();

    constructor(private textSearchService: TextSearchService) { }
    ngOnInit() { }

    search(query: string) {
        this.onSearchTermChanged.emit(query);
        this.textSearchService.getQueryResults(query).subscribe((results) => {
            this.textSearchService.sendQueryResults(results);
        });
    }
}
