import { Injectable } from '@angular/core';
import { Movie } from './movies.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })

export class MovieService  {
    private moviesUrl = 'api/movies'

    constructor(private http: HttpClient,) {}

    getMovies(): Observable<Movie[]> {
        return this.http.get<Movie[]>(this.moviesUrl).pipe(
            retry(2),
            catchError((error: HttpErrorResponse) => {
                console.error(error);
                return throwError(error);
            })
        );
    }

    getCastMembers(): Observable<any> {
        const response = this.getMovies().pipe(map((movies: Movie[]) => {
            return Array
                .from(new Set(movies.flatMap(x => x.cast).flatMap(x => x.trim()).filter(x => x)))
                .sort();
        }));

        return response;
    }

    getDirectors(): Observable<any> {

        const response = this.getMovies().pipe(map((movies: Movie[]) => {
            // Loop through director items, filtering out null/empty values, sort them, and store them in DirectorFilterItems
            let rawDirectorFilterItems: string[] = Array
                .from(new Set(movies.map(x => x.director.trim()).filter(x => x)));

            var directors: string[] = [];

            // Break apart any concatinated names            
            rawDirectorFilterItems.forEach(e => {
            if(e.includes("|")) {
                let names = e.split("|");
                names.forEach(name => {
                directors.push(name);
                });
            }
            else {
                directors.push(e);
            }
            });

            directors.sort();
            
            return directors;
        }))

        return response;
    }

    getReleaseYears(): Observable<any> {
        const response = this.getMovies().pipe(map((movies: Movie[]) => {
            // Loop through release year items, filtering out null/empty values, sort them, and reverse them so they are in descending order
            return Array
                .from(new Set(movies.map(x => x.release_year.trim()).filter(x => x)))
                .sort()
                .reverse();
        }));

        return response;
    }

    getGenres(): Observable<any> {
        const response = this.getMovies().pipe(map((movies: Movie[]) => {
            return Array
                .from(new Set(movies.flatMap(x => x.genres).flatMap(x => x.trim()).filter(x => x)))
                .sort();
        }));

        return response;
    }

    // 
    getPopularity(): Observable<any> {
        const response = this.getMovies().pipe(map((movies: Movie[]) => {
            // Loop through popularity items, filtering out null/empty values, and sorting them in ascending order
            var values: string[] = [
                '0.0 - 0.1',
                '0.1 - 0.2',
                '0.2 - 0.3',
                '0.3 - 0.4',
                '0.4 - 0.5',
                '0.5 - 0.6',
                '0.6 - 0.7',
                '0.7 - 0.8',
                '0.8 - 0.9',
                '0.9 - 1.0'
            ]
            return values;
        }));

        return response;
    }
}