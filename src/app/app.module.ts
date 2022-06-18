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

import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DisplayFilterComponent } from './display-filter/display-filter.component';
import { AboutComponent } from './about/about.component';
import { RoundNumberPipe } from './round-number.pipe';
import { FavoriteMoviesComponent } from './favorite-movies/favorite-movies.component';
import { FavoriteChangeServiceService } from './favorite-change-service.service';
import { MovieService } from './movies/movie.service';

@NgModule({
  declarations: [
    AppComponent,
    FilterComponentComponent,
    LargeNumSuffixPipe,
    AddSpacePipe,
    NotFoundPageComponent,
    MainPageComponent,
    NavbarComponent,
    DisplayFilterComponent,
    AboutComponent,
    RoundNumberPipe,
    FavoriteMoviesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatTooltipModule,
    MatSelectModule,
    HttpClientModule
  ],
  providers: [ FavoriteChangeServiceService, MovieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
