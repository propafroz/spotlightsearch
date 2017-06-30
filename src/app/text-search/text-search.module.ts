import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { TextSearchComponent} from './text-search.component';

import {TextSearchBarComponent} from './text-search-bar/text-search-bar.component';

import {TextSearchResultComponent} from './text-search-result/text-search-result.component';

import { TextSearchResultDetailComponent} from './text-search-result-detail/text-search-result-detail.component';


@NgModule({
  declarations: [
    TextSearchComponent,
    TextSearchBarComponent,
    TextSearchResultComponent,
    TextSearchResultDetailComponent
  ],
  imports: [
    HttpModule,
    BrowserModule
  ],
  exports:[
    TextSearchComponent,
    TextSearchBarComponent,
    TextSearchResultComponent,
    TextSearchResultDetailComponent
  ]
})
export class TextSearchModule { }
