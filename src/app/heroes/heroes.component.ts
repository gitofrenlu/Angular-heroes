import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HEROES } from '../mock-hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  selectHero: Hero;

  heros = HEROES;

  constructor() { }

  ngOnInit() {
  }
  onSelect(hero) {
    this.selectHero = hero;
  }

}
