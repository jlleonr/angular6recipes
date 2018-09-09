import { Component, OnInit } from '@angular/core';
import { ActivePageService } from '../shared/active-page.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  private page: string = 'Not Found!';

  constructor(private activePageService: ActivePageService) { }

  ngOnInit() {
    this.activePageService.setCurrentPage(this.page);
  }

}
