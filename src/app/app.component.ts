import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent {
    private nav: string = "home";

	  constructor() {
	  }

    changeNav(nav: string) {
      this.nav = nav;
    }
}
