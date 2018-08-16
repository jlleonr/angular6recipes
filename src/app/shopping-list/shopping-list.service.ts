import { Ingredient } from "../shared/ingredient.model";
import { EventEmitter } from "../../../node_modules/@angular/core";

export class ShoppingListService {

  private ingredientsList: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  ingredientChanged = new EventEmitter<Ingredient[]>();

  constructor() { }

  public getIngredients(): Ingredient[] {
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
