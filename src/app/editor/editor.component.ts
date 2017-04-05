import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

    @Input()
    placeholder: string;

    @Output()
    getContent

  	private editor: any = document.createElement("div");
	  private div;

    public getContet: EventEmitter<any> = new EventEmitter();

  	constructor() {
  	}

    bold() {
      document.execCommand("bold");
    }

  	ngOnInit() {
  		this.div = document.querySelector("#editor");
  		this.div.innerHTML = "";
  		const { offsetWidth, offsetHeight } = this.div;
  		this.editor.style.cssText = `
			    width: ${offsetWidth}px;
          height: ${offsetHeight}px;
          border: none;
          outline: none;
          padding: 10px;
  		`;

      this.editor.contentEditable = true;
      this.editor.innerHTML = "输入内容...";
      this.div.appendChild(this.editor);
      this.div.addEventListener("focus", () => {
          const {innerHTML} = this.div;

          console.log(this.div.innerHTML);
          if (innerHTML === this.placeholder) {
              this.div.innerHTML = "";
          }
      });
      this.div.addEventListener("blur", () => {
          const {innerHTML} = this.div;
          if (innerHTML === "") {
              this.editor.innerHTML = this.placeholder;
          }
      });
  	}


}
