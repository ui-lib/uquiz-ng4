import { Component, OnInit, Input, ElementRef } from '@angular/core';
import APlayer from "aplayer";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

	@Input()
	narrow: boolean = false;

	@Input()
	autoplay: boolean = false;

	@Input()
	showlrc: boolean = false;

	@Input()
	mutex: boolean = false;

	@Input()
	preload: boolean = true;

	@Input()
	theme: string = "#b7daff";

	@Input()
	mode: string = "circulation";

	@Input()
	listmaxheight: string = "";

	@Input()
	music: any;

	private player: APlayer;

  	constructor(private el: ElementRef) {
  	}

  	ngOnInit() {
  		const {el, narrow, autoplay, showlrc, mutex, preload, mode, listmaxheight, music} = this;
  		this.player = new APlayer({
			element: el.nativeElement.querySelector("div"),
            narrow,
            autoplay,
            showlrc,
            mutex,
            preload,
            mode,
            listmaxheight,
            music
  		});
  	}

}
