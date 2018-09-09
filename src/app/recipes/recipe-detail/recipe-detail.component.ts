import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input()
  recipe: Recipe;

  constructor(private shoppingListService: ShoppingListService,
    public snackBar: MatSnackBar) { }

  ngOnInit() { }

  onAddIngredients(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
    this.shoppingListService.incrementIngredientsAdded(ingredients.length);
    this.snackBar.open(
      '(' + ingredients.length + ')'
      + ' ingredients have been added to the shopping list.',
      '',
      { duration: 1800 }
    );
  }

}
