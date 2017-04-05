import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

	private frame: any = document.createElement("iframe");
	private div;

  	constructor() {
  	}

  	ngOnInit() {
  		this.div = document.querySelector("#editor");
  		this.div.innerHTML = "";
  		const { offsetWidth, offsetHeight } = this.div;
  		this.frame.style.cssText = `
			    width: ${offsetWidth}px;
                height: ${offsetHeight}px;
                border: none;
  		`;
  		this.frame.designMode = "on";
  		this.div.appendChild(this.frame);

  // 		this.frame.open();
		// this.frame.write("<html><head></head><body style='word-break:break-all;color: #999;'></body></html>");

                // iframeDocument.body.addEventListener("focus", () => {
                //     const {innerHTML} = iframeDocument.body;
                //     if (innerHTML === this.inputContent) {
                //         iframeDocument.body.innerHTML = "";
                //     }
                // });
                // iframeDocument.body.addEventListener("blur", () => {
                //     const {innerHTML} = iframeDocument.body;
                //     if (innerHTML === "") {
                //         this.reset();
                //     }
                // });
  	}

}
