import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';

import { HeroService } from '../hero.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heros: Hero[];

  constructor(private heroService: HeroService) {
  }

  ngOnInit() {
    this.heroService.getHeros().subscribe(heroes => this.heros = heroes);

  }
  add(name: string) {
    this.heroService.saveNew({name} as Hero).subscribe(hero => this.heros.push(hero));
  }

  delete(hero: Hero) {
    this.heros = this.heros.filter(h => h !== hero);
    this.heroService.removeHero(hero).subscribe(() => console.log('delete'));
  }

}
