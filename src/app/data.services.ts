import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Movie } from './movies/movies.model';
import MovieJson from './MovieData.json'; // Define import to JSON file that has movie data.

@Injectable({
    providedIn: 'root'
  })

export class InMemoryMovieService implements InMemoryDbService {
    createDb() {
        const movies : Movie[] = <Movie[]>MovieJson;
        return {movies};
    }
}