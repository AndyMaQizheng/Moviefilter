import { Component, OnInit } from '@angular/core';
import { Movie } from '../movies/movies.model';
import { MovieService } from '../movies/movie.service';
import { FavoriteChangeServiceService } from '../favorite-change-service.service';

@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.css']
})
export class FavoriteMoviesComponent implements OnInit {

  favoriteIds: number[] = [];
  favoriteMovies: Movie[] = [];
  // Define the display columns the table will use in the html.
  displayColumns: string[] = ['title', 'popularity', 'budget', 'revenue', 'cast', 'director', 'genres', 'release_year'];

  constructor(private movieService: MovieService, private favoriteChangedService: FavoriteChangeServiceService) {
  }

  ngOnInit(): void {
    this.updateDisplay();
  }

  removeFavorite(id: number) {
    console.log("removing favorite");
    this.favoriteChangedService.toggleValue(id);
    this.updateDisplay();
  }

  updateDisplay() {
    this.favoriteIds = [];
    this.favoriteChangedService.getList().forEach(val => { this.favoriteIds.push(val); });
    this.movieService.getMoviesById(this.favoriteIds).subscribe((movies: any) => {
      this.favoriteMovies = movies.data;
    }); 
  }

  isFavorite(id: number) {
    return this.favoriteChangedService.hasId(id);
  }

}
