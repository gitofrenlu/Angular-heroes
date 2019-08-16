import { Injectable } from '@angular/core';

import { HEROES } from './mock-hero';
import { Hero } from './hero';

import { Observable, of } from 'rxjs';

import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

constructor(private http: HttpClient, private messageService: MessageService) { }

  private heroesUrl = 'api/heroes';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getHeros(): Observable<Hero[]> {
    // return of(HEROES);
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(_ => this.log('fetch heros')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }
  getHero(id: number): Observable<Hero> {
    return this.http.get<Hero>(`api/heroes/${id}`).pipe(
      tap(_ => this.log(`HeroService: fetched heroe ${id}`)),
      catchError(this.handleError<Hero>('getHeroById'))
    );
  }

  saveHero(hero: Hero): Observable<any> {

    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`Save hero ${hero.name}`) ),
      catchError(this.handleError<any>('updateHero', false))
    );
  }
  saveNew(newHero: Hero): Observable<Hero> {

    return this.http.post<Hero>(this.heroesUrl, newHero, this.httpOptions).pipe(
      tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  removeHero(hero: Hero | number): Observable<any> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete(url, this.httpOptions).pipe(
      tap(_ => this.log(`delete hero ${id}`)),
      catchError(this.handleError<any>('deleteHero'))
    );
  }

  searchHero(name: string): Observable<Hero[]> {
    if (!name) {
      return of([]);
    } else {
      return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${name}`, this.httpOptions).pipe(
        tap(_ => this.log(`search ${name}`) ),
        catchError(this.handleError<Hero[]>('searchHero', []))
      );
    }
  }

  private  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };

  }
  private log(message: string) {
    this.messageService.addMessage(message);
  }

}
