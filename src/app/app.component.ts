import { Component } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import NavService from './service/nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NavService]
})
export class AppComponent {
    private nav: string;
    private subscription: Subscription;

	  constructor(private navService: NavService) {
      this.subscription = this.navService.nav.subscribe((nav) => {
        this.nav = nav;
      });
	  }

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
}
