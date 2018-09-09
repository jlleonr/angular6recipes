import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivePageService } from '../shared/active-page.service';
import { Subscription } from 'rxjs';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {

  currentPage: any = 'Recipes';
  badgeNum: number = 0;
  private subs: Subscription[] = [];

  constructor(private activePageService: ActivePageService,
    private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {

    var apsSub = this.activePageService.currentPage.subscribe(
      page => {
        this.currentPage = page;
      }
    );

    this.subs.push(apsSub);

    var slsSub = this.shoppingListService.ingredientsAddedCounter.subscribe(
      (num: number) => {
        this.badgeNum = num > 0 ? this.badgeNum + num : 0;
      }
    )
    this.subs.push(slsSub);
  }

  ngOnDestroy() {
    this.subs.forEach(
      sub => sub.unsubscribe()
    )
  }

  onShoppingListLink() {
    this.shoppingListService.incrementIngredientsAdded(0);
  }

}
