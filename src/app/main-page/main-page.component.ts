import { Component, ElementRef, ViewChild } from '@angular/core';
import { Movie } from '../movies/movies.model';
import { MatTable } from '@angular/material/table';
import { MovieService } from '../movies/movie.service';
import { DisplayFilterComponent } from '../display-filter/display-filter.component';
import { FilterComponentComponent } from '../filter-component/filter-component.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent {

  @ViewChild("resultsTable") resultsTable!: MatTable<any>; // A reference to the results table
  @ViewChild("filterNumber") filterNumber!: ElementRef; // A reference to number of results selector
  @ViewChild("requestedFilters") requestedFiltersComponent!: DisplayFilterComponent;
  @ViewChild("popularityFilterComponent") popularityFilterComponent!: FilterComponentComponent;
  @ViewChild("genreFilterComponent") genreFilterComponent!: FilterComponentComponent;
  @ViewChild("castFilterComponent") castFilterComponent!: FilterComponentComponent;
  @ViewChild("releaseYearFilterComponent") releaseYearFilterComponent!: FilterComponentComponent;
  @ViewChild("directorFilterComponent") directorFilterComponent!: FilterComponentComponent;

  allMovies: Movie[] =  [];
  sortedMovies: Movie[] = [];
  CastFilterItems: string[] = [];
  ReleaseYearFilterItems: string[] = [];
  DirectorFilterItems: string[] = [];
  GenreFilterItems: string[] = [];
  PopularityFilterItems: string[] = [];

  constructor(private movieService: MovieService) {

    // Get items that will be used to populate the filter components from in-memory database.
    // These are bound to the filter components in the HTML.
    this.movieService.getCastMembers().subscribe((castMembers: string[]) => {
      this.CastFilterItems = castMembers;
    });

    this.movieService.getDirectors().subscribe((directors: string[]) => {
      this.DirectorFilterItems = directors;
    });
    
    this.movieService.getReleaseYears().subscribe((releaseYears: string[]) => {
      this.ReleaseYearFilterItems = releaseYears;
    });
    
    this.movieService.getGenres().subscribe((genres: string[]) => {
      this.GenreFilterItems = genres;
    });

    this.PopularityFilterItems = [
      '0.0 - 0.5',
      '0.5- 1.0',
      '1.0 - 1.5',
      '1.5- 2.0',
      '2.0 - 2.5',
      '2.5- 3.0',
      '3.0 - 3.5',
      '3.5- 4.0',
      '4.0 - 4.5',
      '4.5- 5.0',
    ];   
  }

  // Define the display columns the table will use in the html.
  displayColumns: string[] = ['title', 'popularity', 'budget', 'revenue', 'cast', 'director', 'genres', 'release_year', 'relevance'];

  // A dictionary of the filters that have been requested. The key is the name of the category, such 
  // as "requestedCastFilters", and the value is the set of filters.
  requestedFilters: Map<string, Set<string>> = new Map<string, Set<string>>();

  // Events bound the filter components when check changes. The logic is the same for each:
  // Add or update the requestedFilters dictionary with the new passed in filters.
  onPopularityFiltersChanged(filters: any) {
    this.requestedFilters.set("requestedPopularityFilters", filters);
    this.doFiltering();
  }

  onCastFiltersChanged(filters: any) {
    this.requestedFilters.set("requestedCastFilters", filters);
    this.doFiltering();
  }

  onReleaseYearsFiltersChanged(filters: any) {
    this.requestedFilters.set("requestedReleaseYearFilters", filters);
    this.doFiltering();
  }

  onDirectorFiltersChanged(filters: any) {
    this.requestedFilters.set("requestedDirectorFilters", filters);
    this.doFiltering();
  }

  onGenresFiltersChanged(filters: any) {
    this.requestedFilters.set("requestedGenreFilters", filters);
    this.doFiltering();  
  }

  // Filtering function ran when apply filters button is clicked.
  doFiltering() {

    this.requestedFiltersComponent?.onItemsChanged(this.requestedFilters);
    
    this.movieService.getFilteredMovies(this.requestedFilters, this.filterNumber?.nativeElement?.value).subscribe((movies: any) => {
      this.sortedMovies = movies.data;
    }); 
  }

  clearFilters() {
    this.requestedFilters  = new Map<string, Set<string>>();
    this.popularityFilterComponent.clearFilters();
    this.genreFilterComponent.clearFilters();
    this.castFilterComponent.clearFilters();
    this.releaseYearFilterComponent.clearFilters();
    this.directorFilterComponent.clearFilters();
    this.doFiltering();
  }
}
