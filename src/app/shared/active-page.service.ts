import { Subject, Observable } from "rxjs";

export class ActivePageService {

  private currentPageSource: Subject<any> = new Subject();
  currentPage: Observable<any> = this.currentPageSource.asObservable();

  constructor() { }

  setCurrentPage(page) {
    this.currentPageSource.next(page);
  }
}
