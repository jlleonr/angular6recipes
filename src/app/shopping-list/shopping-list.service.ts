import { Ingredient } from "../shared/ingredient.model";
import { EventEmitter, OnDestroy } from "../../../node_modules/@angular/core";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { tap, map } from 'rxjs/operators';
import { Subscription } from "rxjs";

@Injectable()
export class ShoppingListService implements OnDestroy {

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private ingredientsList: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  //private tmpIngrLst: Ingredient[] = [];

  ingredientChanged = new EventEmitter<Ingredient[]>();

  constructor(private http: HttpClient) { }

  private url: string = 'https://np23d4gpl3.execute-api.us-east-2.amazonaws.com/staging/ingredients';
  private subs: Subscription = null;

  public getIngredientsFromHttp() {
    return this.http.get(this.url)
      .pipe(
        map(res => res),
        map(res => res['Items'])
      )
  }

  public getDefaultIngredients(): Ingredient[] {
    return this.ingredientsList.slice();
  }

  public addIngredient(ingredient: Ingredient): void {
    this.ingredientsList.push(ingredient);
    this.ingredientChanged.emit(this.ingredientsList.slice());
  }

  public addIngredients(ingredients: Ingredient[]) {
    this.ingredientsList.push(...ingredients);
    this.ingredientChanged.emit(this.ingredientsList.slice());
  }

  public resetIngredeints() {
    this.ingredientsList = [
      new Ingredient('Apples', 5),
      new Ingredient('Tomatoes', 10)
    ];

    this.ingredientChanged.emit(this.ingredientsList.slice());

  }

}
