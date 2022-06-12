import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })

export class MovieService  {
    private moviesUrl = 'https://advancedwebdevapi.azurewebsites.net/api'
    //private moviesUrl = 'https://localhost:7058/api'

    constructor(private http: HttpClient) {}

    getCastMembers(): Observable<any> {
        return this.http.get<any>(`${this.moviesUrl}/Cast`).pipe(map(results => {
                return Array.from(results.map((x: { name: string; }) => x.name)).sort();
            }));
    }

    getDirectors(): Observable<any> {
        return this.http.get<any>(`${this.moviesUrl}/Directors`).pipe(map(results => {
            return Array.from(results.map((x: { name: string; }) => x.name)).sort();
        }));
    }

    getReleaseYears(): Observable<any> {
        return this.http.get<any>(`${this.moviesUrl}/Movies/releaseYears`).pipe(map(results => {
            return results.sort();
        }));
    }

    getGenres(): Observable<any> {
        return this.http.get<any>(`${this.moviesUrl}/Genres`).pipe(map(results => {
            return Array.from(results.map((x: { name: string; }) => x.name)).sort();
        }));
    }

    getFilteredMovies(filters: Map<string, Set<string>>, numOfResults: number): Observable<any> {
        var mappedFilters: any = {};

        filters.forEach((value, key) => {
            mappedFilters[key] = Array.from(value);
        })

        var body : any = {
            Filters : mappedFilters,
            NumOfResults : numOfResults
        }
        
        return this.http.post<any>(`${this.moviesUrl}/Movies`, body);
    }   
}