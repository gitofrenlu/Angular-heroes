import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-herodetail',
  templateUrl: './heroDetail.component.html',
  styleUrls: ['./heroDetail.component.css']
})
export class HeroDetailComponent implements OnInit {

  selectHero: Hero;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private heroservice: HeroService
  ) {

  }

  ngOnInit() {
    this.getHero();
  }
  getHero() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroservice.getHero(id).subscribe(heros => this.selectHero = heros);
  }
  goBack() {
    this.location.back();
  }
  save() {
    this.heroservice.saveHero(this.selectHero).subscribe(
      () => {
        this.goBack();
      });

  }
}
