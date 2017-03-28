import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	  nav:string;

	  constructor() {
		    this.nav = "home";
	  }

  	navChanged(nav:string) {
  	  	this.nav = nav;
  	}
}
