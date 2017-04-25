import { Injectable }      from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export default class NavService {
  private navItemSource = new BehaviorSubject<string>("home");
  public nav = this.navItemSource.asObservable();

  changeNav(nav: string) {
    this.navItemSource.next(nav);
  }
}