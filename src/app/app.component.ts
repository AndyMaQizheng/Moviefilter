import { Component } from '@angular/core';
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
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  allMovies: MOVIES[] = MovieJson;
  Movies: MOVIES[] = this.allMovies;
  CastFilterItems: string[] = Array.from(new Set(this.Movies.flatMap(x => x.cast))).sort();

  displayColumns: string[] = ['title', 'cast', 'release_year'];

  requestedCastFilters: Set<string> = new Set<string>();

  castCheckChanged(event: any) {

    var data = event.target;

    if (data.checked) {
        this.requestedCastFilters.add(data.value);
    } else {
        this.requestedCastFilters.delete(data.value);
    }

    if (this.requestedCastFilters.size >= 1) {
    this.Movies = this.allMovies.filter(x => !!x.cast.find(z => this.requestedCastFilters.has(z)))
    } else {
    this.Movies = this.allMovies;
    }
  }

  onMovieClicked(id: string) {
    window.open(`https://www.imdb.com/title/${id}/`, '_blank')
  }
}