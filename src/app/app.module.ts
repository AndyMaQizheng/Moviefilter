import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule} from "@angular/material/table";
import { MatSelectModule } from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FilterComponentComponent } from './filter-component/filter-component.component';
import { LargeNumSuffixPipe } from './large-num-suffix.pipe';
import { AddSpacePipe } from './add-space.pipe';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryMovieService } from './data.services';

import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DisplayFilterComponent } from './display-filter/display-filter.component';
@NgModule({
  declarations: [
    AppComponent,
    FilterComponentComponent,
    LargeNumSuffixPipe,
    AddSpacePipe,
    NotFoundPageComponent,
    MainPageComponent,
    NavbarComponent,
    DisplayFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatTooltipModule,
    MatSelectModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryMovieService, {dataEncapsulation: false}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
