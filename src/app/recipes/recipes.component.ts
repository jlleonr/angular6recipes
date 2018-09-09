import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { ActivePageService } from '../shared/active-page.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {

  private page: string = 'Recipes';
  selectedRecipe: Recipe;

  constructor(private recipeService: RecipeService,
    private activePageService: ActivePageService) { }

  ngOnInit() {
    this.recipeService.recipeSeleced.subscribe(
      (recipe: Recipe) => {
        this.selectedRecipe = recipe;
      }
    );

    this.activePageService.setCurrentPage(this.page)
  }

}
