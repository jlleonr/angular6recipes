import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  public testUrl: string ='https://walkingonsunshinerecipes.com/wp-content/uploads/2017/02/CheesyOnePotCasseroleFEATUREDPHOTOfromWalkingonSunshine.jpg';

  recipes: Recipe[] = [
    new Recipe('A Test Recipe1', 'This is simply a test1', this.testUrl),
    new Recipe('A Test Recipe2', 'This is simply a test2', this.testUrl),
    new Recipe('A Test Recipe3', 'This is simply a test3', this.testUrl)
  ];

  constructor() { }

  ngOnInit() {
  }

}
