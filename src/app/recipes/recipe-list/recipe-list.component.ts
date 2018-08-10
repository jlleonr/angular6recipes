import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeDetails } from '../../shared/recipeDetails.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  public testUrl: string = 'https://walkingonsunshinerecipes.com/wp-content/uploads/2017/02/CheesyOnePotCasseroleFEATUREDPHOTOfromWalkingonSunshine.jpg';

  recipes: Recipe[] = [
    new Recipe('A Test Recipe 1', 'This is simply a test1', this.testUrl),
    new Recipe('A Test Recipe 2', 'This is simply a test2', this.testUrl),
    new Recipe('A Test Recipe 3', 'This is simply a test3', this.testUrl)
  ];

  @Output()
  recipeWasSelected = new EventEmitter<Recipe>();

  constructor() { }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }

  ngOnInit() {
  }

}
