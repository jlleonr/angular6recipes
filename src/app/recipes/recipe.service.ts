import { Recipe } from "./recipe.model";
import { EventEmitter } from "../../../node_modules/@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class RecipeService {

  recipeSeleced = new EventEmitter<Recipe>();

  testUrl: string = 'https://walkingonsunshinerecipes.com/wp-content/uploads/2017/02/CheesyOnePotCasseroleFEATUREDPHOTOfromWalkingonSunshine.jpg';

  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      this.testUrl,
      [
        new Ingredient('Meat', 1),
        new Ingredient('French fries', 20)
      ]),
    new Recipe(
      'Big Fat Burger',
      'What else you need to say?',
      this.testUrl,
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ]),
    new Recipe(
      'Chicken Marinara',
      'Italian style meal',
      this.testUrl,
      [
        new Ingredient('Marinara sauce', 1),
        new Ingredient('Chicken', 1),
        new Ingredient('Spaghetti noodles', 5)
      ])
  ];

  constructor() { }

  public getRecipes() {
    return this.recipes.slice();
  }
}
