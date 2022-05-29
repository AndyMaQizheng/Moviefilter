import { Component, ElementRef, ViewChild, ViewChildren } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { MatTable } from '@angular/material/table';
import MovieJson from './MovieData.json';

interface MOVIES {
  id: string;
  popularity: number;
  budget: number;
  revenue: number;
  title: string;
  cast: string[];
  homepage: string;
  director: string;
  short_summary: string;
  genres: string[];
  production_companies: string[];
  release_year: string;
  relevance: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  @ViewChild("resultsTable") resultsTable!: MatTable<any>;
  @ViewChild("filterNumber") filterNumber!: ElementRef;

  allMovies: MOVIES[] = MovieJson;
  sortedMovies: MOVIES[] = this.allMovies
    .sort((a,b) => {return a.title.localeCompare(b.title)})
    .slice(0, this.filterNumber?.nativeElement?.value ?? 5);

  CastFilterItems: string[] = Array
    .from(new Set(this.allMovies.flatMap(x => x.cast).flatMap(x => x.trim())))
    .sort();
  ReleaseYearFilterItems: string[] = Array
    .from(new Set(this.allMovies.map(x => x.release_year.trim())))
    .sort()
    .reverse();
  DirectorFilterItems: string[] = Array
    .from(new Set(this.allMovies.map(x => x.director.trim())))
    .sort()
  GenreFilterItems: string[] = Array
    .from(new Set(this.allMovies.flatMap(x => x.genres).flatMap(x => x.trim())))
    .sort();

  displayColumns: string[] = ['title', 'popularity', 'budget', 'revenue', 'cast', 'homepage', 'director', 'genres', 'production_companies', 'release_year', 'relevance'];

  requestedFilters: Map<string, Set<string>> = new Map<string, Set<string>>();  

  onCastFiltersChanged(filters: any) {
    this.requestedFilters.set("requestedCastFilters", filters)
  }

  onReleaseYearsFiltersChanged(filters: any) {
    this.requestedFilters.set("requestedReleaseYearFilters", filters)
  }

  onDirectorFiltersChanged(filters: any) {
    this.requestedFilters.set("requestedDirectorFilters", filters);
  }

  onGenresFiltersChanged(filters: any) {
    this.requestedFilters.set("requestedGenreFilters", filters);
  }

  doFiltering() {

    var numOfSelectedCats = 0;
    
    this.requestedFilters.forEach(x => {
      if (x.size > 0) {
        numOfSelectedCats++;
      }
    }) 

    if (numOfSelectedCats > 0) {
      this.allMovies.forEach(x => x.relevance = 0);

      if (this.requestedFilters.has("requestedCastFilters")) {
        var castFilters = this.requestedFilters.get("requestedCastFilters");
        if (castFilters!.size > 0) {
          this.allMovies.forEach(x => {
            if (x.cast.find(y => castFilters?.has(y))) {
              x.relevance = x.relevance + 10;
            }
          })
        }
      }

      if (this.requestedFilters.has("requestedReleaseYearFilters")) {
        var releaseYearFilters = this.requestedFilters.get("requestedReleaseYearFilters");
        if (releaseYearFilters!.size > 0) {
          this.allMovies.forEach(x => {
            if (releaseYearFilters?.has(x.release_year)) {
              x.relevance = x.relevance + 10;
            }
          })
        }
      }

      if (this.requestedFilters.has("requestedDirectorFilters")) {
        var directorFilters = this.requestedFilters.get("requestedDirectorFilters");
        if (directorFilters!.size > 0) {
          this.allMovies.forEach(x => {
            if (directorFilters?.has(x.director)) {
              x.relevance = x.relevance + 10;
            }
          })
        }
      }

      if (this.requestedFilters.has("requestedGenreFilters")) {
        var genreFilters = this.requestedFilters.get("requestedGenreFilters");
        if (genreFilters!.size > 0) {
          this.allMovies.forEach(x => {
            if (x.genres.find(y => genreFilters?.has(y))) {
              x.relevance = x.relevance + 10;
            }
          })
        }
      }

      var skew = 100 - (numOfSelectedCats * 10);

      this.allMovies.forEach(x => {
        if (x.relevance > 0 ) {
          x.relevance = x.relevance + skew
        }        
      });      
    } else {
      this.allMovies.forEach(x => x.relevance = 100)
    }

    this.sortedMovies = this.allMovies
      .sort((a,b) => {return b.relevance-a.relevance || a.title.localeCompare(b.title)})
      .slice(0, this.filterNumber?.nativeElement?.value);
  }

  onMovieClicked(id: string) {
    window.open(`https://www.imdb.com/title/${id}/`, '_blank')
  }
}