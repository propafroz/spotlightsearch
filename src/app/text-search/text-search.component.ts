import { Component, OnInit, HostListener } from '@angular/core';
import { TextSearchService } from './services/text-search.service';
import * as $ from "jquery";


const KEY = {
    UP: 38,
    DOWN: 40,
    ESC: 27,
    ENTER: 13
};

@Component({
    providers: [TextSearchService],
    host: {
        '(document:keydown)': 'handleKeyDown($event)',
        '(document:keyup)': 'handleKeyUp($event)',
        '(document:click)': 'handleClick($event)'
    },
    selector: 'app-text-search',
    templateUrl: './text-search.component.html',
    styles: [`.ng-spotlight{
                left: 50%;
                margin-left: -340px;
                width: 680px;
                position: absolute;
                top: 20%;
                z-index: 2147483647;
                font-size: 12px;
                letter-spacing: .3px;
                overflow: hidden;
                border-radius: 3px;           
                background: #eee;
                box-shadow: 0 6px 1px -2px rgba(0,0,0,.14), 0 2px 2px 0 rgba(0,0,0,.098), 0 1px 5px 0 rgba(0,0,0,.084);
        }`]
})


export class TextSearchComponent implements OnInit {
    private searchTerm;
    private selectedItem;
    private KEY_MAP = { 17: false, 65: false, 32: false };
    constructor(private textSearchService: TextSearchService) { }

    ngOnInit() {
        this.searchTerm = null;
        this.selectedItem = undefined;
    }

    setSearchTerm(query) {
        this.searchTerm = query;
    }

    selectItemAtIndex(idx) {
        let currentItemIndex = 0;
        let searchResults = this.textSearchService.getCurrentQueryResults();
        searchResults.forEach(function(item) {
            let isActive = currentItemIndex === (idx || 0);
            item.class = isActive ? "active" : "";
            currentItemIndex++;
        });
        this.selectedItem = this.textSearchService.getSelectedItemAtIndex(idx);
        this.textSearchService.setSelectedItemIndex(idx);
    }

    selectPreviousEntry() {
        var idx = this.textSearchService.getSelectedItemIndex();
        if (idx - 1 >= 0) {
            this.selectItemAtIndex(idx - 1)
        }
    }

    selectNextEntry() {
        var idx = this.textSearchService.getSelectedItemIndex();
        if (idx + 1 < this.textSearchService.getCurrentQueryResults().length) {
            this.selectItemAtIndex(idx + 1)
        }
    }

    resetSearch() {
        this.searchTerm = null;
        this.selectedItem = undefined;
        this.textSearchService.resetCurrentQueryResults();
        this.textSearchService.setSelectedItemIndex(undefined);
    }

    _showSpotlightSearch() {
        let element = <HTMLElement>document.querySelector('.ng-spotlight-overlay');
        element.style.display = "block";
        element = <HTMLElement>document.querySelector('.ng-spotlight-overlay input');
        element.focus();
    }

    _hideSpotLightSearch() {
        let element = <HTMLElement>document.querySelector('.ng-spotlight-overlay');
        element.style.display = "none";
    }

    handleKeyDown(event) {
        if (event.keyCode in this.KEY_MAP) {
            this.KEY_MAP[event.keyCode] = true;
            if (this.KEY_MAP[17] && this.KEY_MAP[65] && this.KEY_MAP[32]) {
                this._showSpotlightSearch();
            }
        }
        switch (event.keyCode) {
            case KEY.UP:
                event.preventDefault();
                this.selectPreviousEntry();
                break;
            case KEY.DOWN:
                event.preventDefault();
                this.selectNextEntry();
                break;
            case KEY.ESC:
                this.resetSearch();
                break;
        }
    }

    handleClick(event) {
        if ($(event.target).closest('.ng-spotlight').length === 0) {
            this._hideSpotLightSearch();
        } else {
            this._showSpotlightSearch();
        }
    }

    handleKeyUp(event) {
        if (event.keyCode in this.KEY_MAP) {
            this.KEY_MAP[event.keyCode] = false;
        }
    }

}
