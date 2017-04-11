import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

    @Input()
    placeholder: string;

  	private editor: any = document.createElement("div");
	  private div;

    public getContet: EventEmitter<any> = new EventEmitter();

  	constructor() {
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
      this.editor.addEventListener("focus", () => {
          const {innerHTML} = this.editor;
          if (innerHTML.trim() === this.placeholder) {
              this.editor.innerHTML = "";
          }
      });
      this.editor.addEventListener("blur", () => {
          const {innerHTML} = this.editor;
          if (innerHTML.trim() === "") {
              this.editor.innerHTML = this.placeholder;
          }
      });
  	}

    outputContent() {
      return this.editor.innerHTML.replace(/\<b\>/gim, "<b style='font-weight: 700;'>");
    }

    boldText() {
      document.execCommand("bold");
    }

    reset() {
      this.editor.innerHTML = this.placeholder;
    }

}
