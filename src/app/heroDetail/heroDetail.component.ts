import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-herodetail',
  templateUrl: './heroDetail.component.html',
  styleUrls: ['./heroDetail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() selectHero: Hero;

  constructor() { }

  ngOnInit() {
  }

}
