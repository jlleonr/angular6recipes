import { Ingredient } from "../shared/ingredient.model";
import { EventEmitter } from "../../../node_modules/@angular/core";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { map } from 'rxjs/operators';
import { Subject, Observable } from "rxjs";

@Injectable()
export class ShoppingListService {

  private ingredientsList: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
    new Ingredient('Salt', 7),
    new Ingredient('Oregano', 4),
    new Ingredient('BBQ Sauce', 1),
    new Ingredient('Sprouts', 6),
    new Ingredient('Onions', 5)
  ];

  private ingredientListSource = new Subject<Ingredient[]>();
  private ingredientsAddedCounterSource: Subject<number> = new Subject<number>();

  refreshIngredientsList: Observable<Ingredient[]> = this.ingredientListSource.asObservable();
  ingredientsAddedCounter: Observable<number> = this.ingredientsAddedCounterSource.asObservable();

  constructor(private http: HttpClient) { }

  private url: string = 'https://np23d4gpl3.execute-api.us-east-2.amazonaws.com/staging/ingredients';

  public getIngredientsFromHttp() {
    return this.http.get(this.url)
      .pipe(
        map(res => res),
        map(res => res['Items'])
      )
  }

  public getDefaultIngredients() {
    var list = [
      new Ingredient('Apples', 5),
      new Ingredient('Tomatoes', 10),
      new Ingredient('Salt', 7),
      new Ingredient('Oregano', 4),
      new Ingredient('BBQ Sauce', 1),
      new Ingredient('Sprouts', 6),
      new Ingredient('Onions', 5)
    ];

    this.ingredientsList = list.slice();
    this.ingredientListSource.next(this.ingredientsList.slice());
  }

  public addIngredient(ingredient: Ingredient): void {
    this.ingredientsList.push(ingredient);
    this.ingredientListSource.next(this.ingredientsList.slice());
  }

  public addIngredients(ingredients: Ingredient[]) {
    this.ingredientsList.push(...ingredients);
    this.ingredientListSource.next(this.ingredientsList.slice());
  }

  public removeIngredient(index: number) {
    this.ingredientsList.splice(index, 1);
    this.ingredientListSource.next(this.ingredientsList.slice());
  }

  public getIngredients(): Ingredient[] {
    return this.ingredientsList.slice();
  }

  public incrementIngredientsAdded(num: number) {
    this.ingredientsAddedCounterSource.next(num);
  }

}
