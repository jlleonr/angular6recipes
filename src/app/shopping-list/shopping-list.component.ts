import { Component, OnInit, OnDestroy, ViewChildren, QueryList } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
import { ActivePageService } from '../shared/active-page.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { RemoveDialogComponent } from './shopping-list-modal/remove-dialog/remove-dialog.component';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] = [];

  @ViewChildren('button')
  private button: QueryList<any>;

  private sub: Subscription = new Subscription();
  private page: string = 'Shopping List';
  showDelay: number = 500;
  hideDelay: number = 25;
  position: string = 'before';

  constructor(private shoppingListService: ShoppingListService,
    private activePageService: ActivePageService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit() {

    if (environment.production) {
      this.shoppingListService.getIngredientsFromHttp()
        .subscribe(
          (result: Ingredient[]) => {
            result.map(
              (ing) => {
                this.ingredients.push(new Ingredient(ing.name, ing.amount));
              }
            )
          },
          (error: any) => {
            console.log('Error in getIngredientsFromHttp: ngOnInit- > ' + error);
          }
        );
    } else {

      console.log('Using default ingredient values.');

      this.sub = this.shoppingListService.refreshIngredientsList.subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients.slice();
        }
      );

      this.ingredients = this.shoppingListService.getIngredients();
    }
    // this.shoppingListService.getIngredientsFromHttp()
    //   .subscribe(
    //     (result: Ingredient[]) => {
    //       result.map(
    //         (ing) => {
    //           this.ingredients.push(new Ingredient(ing.name, ing.amount));
    //         }
    //       )
    //     },
    //     (error: any) => {
    //       console.log('Error: ngOnInit- > ' + error);
    //       console.log('Using default ingredient values.');

    //       this.sub = this.shoppingListService.refreshIngredientsList.subscribe(
    //         (ingredients: Ingredient[]) => {
    //           this.ingredients = ingredients.slice();
    //         }
    //       );

    //       this.ingredients = this.shoppingListService.getIngredients();
    //     }
    //   );

    this.activePageService.setCurrentPage(this.page);

    // console.log(environment.production);

  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onDelete(index: number) {
    var removedIngredient = this.ingredients[index].name;

    const dialogRef = this.dialog.open(
      RemoveDialogComponent, {
        data: {
          selectedIngredient: removedIngredient
        }
      }
    )

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.ingredients.splice(index, 1);
          this.shoppingListService.removeIngredient(index);
          this.snackBar.open(
            removedIngredient + ' has been removed from the list.',
            '',
            { duration: 1800 }
          );
        } else {

          //QnD fix to remove focus from the button after clicking Cancel
          //**This is a bug from angular-material
          this.button.forEach(
            (but, i) => {
              if (i == index) {
                but._elementRef.nativeElement.classList.remove("cdk-program-focused");
                but._elementRef.nativeElement.classList.add("cdk-mouse-focused");
              }
            }
          );

        }//if else result
      }//result observable
    )//subscribe
    //this.trashIcon.nativeElement.blur();
  }

}
