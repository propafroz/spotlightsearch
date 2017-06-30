import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TextSearchModule} from 'spotlight-search';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    TextSearchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
