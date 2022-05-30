import { Component, ElementRef, ViewChild, ViewChildren } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { MatTable } from '@angular/material/table';
import MovieJson from './MovieData.json'; // Define import to JSON file that has movie data.

// Define interface that matches JSON structure
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

// Set location of items component will use.
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  @ViewChild("resultsTable") resultsTable!: MatTable<any>; // A reference to the results table
  @ViewChild("filterNumber") filterNumber!: ElementRef; // A reference to number of results selector

  allMovies: MOVIES[];
  sortedMovies: MOVIES[];
  CastFilterItems: string[];
  ReleaseYearFilterItems: string[];
  DirectorFilterItems: string[];
  GenreFilterItems: string[];


  constructor() {
    // Map our MoviesJson file to an array of movies
    this.allMovies = (<MOVIES[]>MovieJson);

    // Clean up some of the number data to prevent long decimals
    this.allMovies.forEach(movie => {
      movie.popularity = Math.round(movie.popularity * 100) / 100;
    });

    // Sort our movies by title, then take the top 5 results.
    this.sortedMovies = this.allMovies
      .sort((a,b) => {return a.title.localeCompare(b.title)})
      .slice(0, this.filterNumber?.nativeElement?.value ?? 5);


    // Get items that will be used to populate the filter components.
    // These are bound to the filter components in the HTML.

    // Loop through cast items, filtering out null/empty values, sort them, and store them in CastFilterItems
    this.CastFilterItems = Array
      .from(new Set(this.allMovies.flatMap(x => x.cast).flatMap(x => x.trim()).filter(x => x)))
      .sort();

    // Loop through release year items, filtering out null/empty values, sort them, reverse them so they are in descending order,
    // and store them in ReleaseYearFilterItems
    this.ReleaseYearFilterItems = Array
      .from(new Set(this.allMovies.map(x => x.release_year.trim()).filter(x => x)))
      .sort()
      .reverse();

    // Loop through director items, filtering out null/empty values, sort them, and store them in DirectorFilterItems
    let RawDirectorFilterItems: string[] = Array
      .from(new Set(this.allMovies.map(x => x.director.trim()).filter(x => x)))
      .sort()

    // Break apart any concatinated names
    this.DirectorFilterItems = [];
    RawDirectorFilterItems.forEach(e => {
      if(e.includes("|")) {
        let names = e.split("|");
        names.forEach(name => {
          this.DirectorFilterItems.push(name);
        });
      }
      else {
        this.DirectorFilterItems.push(e);
      }
    });
    this.DirectorFilterItems.sort();

    // Loop through genre items, filtering out null/empty values, sort them, and store them in GenreFilterItems
    this.GenreFilterItems = Array
      .from(new Set(this.allMovies.flatMap(x => x.genres).flatMap(x => x.trim()).filter(x => x)))
      .sort();
  }


  // Define the display columns the table will use in the html.
  displayColumns: string[] = ['title', 'popularity', 'budget', 'revenue', 'cast', 'director', 'genres', 'release_year', 'relevance'];

  // A dictionary of the filters that have been requested. The key is the name of the category, such 
  // as "requestedCastFilters", and the value is the set of filters.
  requestedFilters: Map<string, Set<string>> = new Map<string, Set<string>>();  



  // Events bound the filter components when check changes. The logic is the same for each:
  // Add or update the requestedFilters dictionary with the new passed in filters.
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



  // Filtering function ran when apply filters button is clicked.
  doFiltering() {

    // This variable keeps track of the number of categories that have applied filters.
    // We have to keep track in order to determine the relevance score for each movie.
    // Start by assuming no filter categories are in use.
    var numOfSelectedCats = 0; 
    
    // Loop through the requestedFilters dictionary, and for each entry that has any
    // filters applied, increment our counter by 1. 
    this.requestedFilters.forEach(x => {
      if (x.size > 0) {
        numOfSelectedCats++;
      }
    }) 

    if (numOfSelectedCats > 0) { // If any categories have applied filters, enter block

      // Start by setting the relevance for each movie to 0.
      this.allMovies.forEach(x => x.relevance = 0);


      // The logic for the next few IF statements is similar.
      // If the requestedFilters dictionary has any applied filters of the type
      // being checked, find the movies that match the filter, and increase
      // their relevance by ten.

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
            if(x.director.includes("|")) {
              let names = x.director.split("|");
              names.every(element => {
                if(directorFilters?.has(element)) {
                  x.relevance = x.relevance + 10;
                  return false;
                }
                return true;
              });
            }
            else if (directorFilters?.has(x.director)) {
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

      // At this point, because the max relevance that we can have is 40, we need to figure
      // out how much to increase it to make it correct. Because the amount to increase 
      // depends on the number of categories with applied filters, we do a small calculation.
      var skew = 100 - (numOfSelectedCats * 10);

      // Loop through all the movies and if they don't have a relevance score of zero (which means
      // they didn't match any filters) then add the skew to their relevance score to determine
      // their actual relevance.
      this.allMovies.forEach(x => {
        if (x.relevance > 0 ) {
          x.relevance = x.relevance + skew
        }        
      });      
    } else {

      // If no filter categories are in use, we assume all movies are 100% relevant.
      this.allMovies.forEach(x => x.relevance = 100)
    }

    // Sort the movies first by relevance, then by title, and take the number of results
    // that user put in the drop down box.
    this.sortedMovies = this.allMovies
      .sort((a,b) => {return b.relevance-a.relevance || a.title.localeCompare(b.title)})
      .slice(0, this.filterNumber?.nativeElement?.value);
  }

  reslice() {
    // Sort the movies first by relevance, then by title, and take the number of results
    // that user put in the drop down box.
    this.sortedMovies = this.allMovies
      .sort((a,b) => {return b.relevance-a.relevance || a.title.localeCompare(b.title)})
      .slice(0, this.filterNumber?.nativeElement?.value);
  }
}