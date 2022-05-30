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
        var castMembers: string[] = [];

        const response = this.getMovies().pipe(map((movies: Movie[]) => {
            return Array
                .from(new Set(movies.flatMap(x => x.cast).flatMap(x => x.trim()).filter(x => x)))
                .sort();
        }));

        return response;
    }
}