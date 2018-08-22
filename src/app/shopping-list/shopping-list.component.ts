import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] = [];

  private sub: Subscription = null;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.sub = this.shoppingListService.getIngredientsFromHttp()
      .subscribe(
        (result: Ingredient[]) => {
          result.map(
            (ing) => {
              this.ingredients.push(new Ingredient(ing.name, ing.amount));
            }
          )
        },
        (error: any) => {
          console.log('ngOnInit: ' + error);
          console.log('Using default ingredient values.');
          this.ingredients = this.shoppingListService.getDefaultIngredients();
        }
      );

    this.shoppingListService.ingredientChanged.subscribe(
      (ingredient: Ingredient[]) => {
        this.ingredients = ingredient;
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
