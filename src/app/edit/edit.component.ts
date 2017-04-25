import { Component, OnInit, ViewChild } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import EditService from "../service/edit.service";
import Alert from '../Alert';
import DOM from "../DOM";

import { EditorComponent } from "../editor/editor.component";

//  input change事件参数
declare interface InputEvent extends Event {
	target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [EditService]
})
export class EditComponent implements OnInit {

	public contents: any[] = [];
	public text: string = "";
	public title: string = "";
	public courseId: number;
	public teacherInfo;

	private index: number = -1;
	private dragging: boolean = false;
	private sub: any;
	private line: any;
	private parent: any;

	@ViewChild(EditorComponent)
	private editor: EditorComponent;

  	constructor(private service: EditService, private router: ActivatedRoute) { }

  	ngOnInit() {
		this.sub = this.router.params.subscribe(params => {
			this.courseId = +params["id"];
			this.service.queryTeacherInfo().then((res) => {
	  			this.teacherInfo = res;
	  			return this.service.queryDetail(this.courseId)
	  		})
	  		.then((res) => {
	  			const {contents, title} = res;
	  			this.title = title;
	  			this.contents = contents;
	  		})
	  		.catch(() => {
	  			Alert.error({
	  				content: "网络异常,请重试!"
	  			}).then(() => {
	  				location.reload();
	  			});
	  		});
		});
		this._initEvents();
  	}

    checkItem(content) {
      content.checked = !content.checked;
    }

    deleteItems() {
      const { contents } = this,
          ids = contents.filter((content) => content.checked)
                .map((content) => content.id);
      if (!ids.length) {
        Alert.error({
          content: "请先选择要删除的项!"
        });
        return;
      }
      this.service.deleteContents(ids)
      .then(() => {
        Alert.success({
          content: "删除成功!"
        })
        .then(() => {
          location.reload();
        });
      })
      .catch(() => {
        Alert.error({
          content: "网络异常,请重试!"
        });
      });
    }

  	selectImage(ev: InputEvent) {
  		this.index = this._findIndex();
  		const {target} = ev,
            file = target.files[0],
            {size} = file,
            {index, contents} = this,
            id = index <= contents.length ? contents[index].id : 0;
            if (size > 1024 * 1024 * 5) {
            	Alert.warn({
            		content: "你上传的文件超过5兆,请重新选择5兆以下的文件进行上传!"
            	});
                return;
            }
        this.service.upload(file).then((res) => {
        	const { id } = res,
        		content = this.service.getFileUrl(id),
        		addContent = {
        			id,
        			contentType: "IMAGE",
        			courseId: this.courseId,
        			content,
        			sort: 0,
        			status: "ENABLED",
        		};
        	return this.service.addContent(addContent, id);
        }).then((res) => {
        	this._insertToContents(res, index);
        }).catch(() => {
        	Alert.error({
        		content: "网络异常,请重试!"
        	});
        });
  	}

  	selectMusic(ev: InputEvent) {
  	  this.index = this._findIndex();
      const {target} = ev,
        file = target.files[0],
        {size, name} = file,
        {index, contents} = this,
        id = index <= contents.length ? contents[index].id : 0;
      let audio = new Audio(), duration;
      audio.src = URL.createObjectURL(file);
      if (!/\.mp3$/i.test(name)) {
          Alert.warn({
            content: "你上传的文件不是mp3类型,请重新选择mp3类型的文件进行上传!"
          });
          return;
      }
      if (size > 1024 * 1024 * 5) {
          Alert.warn({
            content: "你上传的文件超过5兆,请重新选择5兆以下的文件进行上传!"
          });
          return;
      }
      audio.oncanplay = () => {
        duration = audio.duration;
        this.service.uploadAudio({file, duration})
          .then((res) => {
            const {id} = res,
              content = this.service.getFileUrl(id),
              contentParam = {
                contentType: "VIDEO",
                id: 0,
                courseId: this.courseId,
                duration,
                content,
                sort: 0,
                status: "ENABLED",
              };
            return this.service.addContent(contentParam, id);
          })
          .then((res) => {
            this._insertToContents(res, index);
          })
          .catch(() => {
            Alert.error({
              content: "网络异常,请重试!"
            });
          });
      };
  	}

  	changeFontStyle(ev: MouseEvent) {
  		this.editor.boldText();
  		ev.preventDefault();
  	}

  	addTop(ev: MouseEvent) {
  		this.index = this._findIndex();
  		const {index, contents} = this,
  			content = this.editor.outputContent(),
  			contentParam = {
  				contentType: "TEXT",
  				id: 0,
  				courseId: this.courseId,
  				content,
  				sort: 0,
  				status: "ENABLED",
	  		},
	  		id = index <= contents.length ? contents[index].id : 0;
  		if (!content) {
	    	Alert.warn({
	    		content: "请先输入内容!"
	    	});
	      return;
  		}
      console.log(index);
  		this.service.addContent(contentParam, id).then((res) => {
  				this._insertToContents(res, index);
  			})
  			.catch(() => {
	        	Alert.error({
	        		content: "网络异常,请重试!"
	        	});
	        });
        this.editor.reset();
  	}


  	private _initEvents() {
  		this.dragging = false;
  		this.line = document.querySelector("#split-line");
  		this.parent = document.querySelector("#post-list");
  		this.line.addEventListener("mousedown", this._mouseDownHandler.bind(this));
  		this.parent.addEventListener("mousemove", this._mouseMoveHandler.bind(this));
        document.addEventListener("mouseup", this._mouseUpHandler.bind(this));
  	}

  	private _mouseDownHandler(e) {
  		const ev = e || event;
  		if (!this.dragging) {
  			this.dragging = true;
  			ev.preventDefault();
  		}
  	}

  	private _mouseMoveHandler(e) {
  		if (!this.dragging) {
  			return;
  		}
  		const ev = e || event,
  			{ line, parent } = this,
  			{pageY} = ev,
            {offsetTop, offsetHeight} = parent;
        let target = (pageY - offsetTop);
            if (target < -100) {
                target = -20;
            }
            if (target > offsetHeight) {
                target = offsetHeight;
            }
            line.style.cssText = `
                position: absolute;
                top: ${target}px;
            `;

		ev.preventDefault();
        window.getSelection().removeAllRanges();
  	}

  	private _mouseUpHandler(e) {
  		this.dragging = false;
  		const ev = e || event, 
  			{line, parent} = this,
  			{offsetTop} = parent,
            top = Number.parseFloat(line.style.top);
        let target, lineClone, nodes;
        nodes = [].slice.call(parent.querySelectorAll(".item"));
        this.index = this._getIndex();
        target = nodes[this.index - 1];
        if (top <= 15) {
            this.index = 0;
            target = nodes[0];
            lineClone = DOM.clone(line, [
                {
                    name: "mousedown",
                    handler: this._mouseDownHandler.bind(this)
                },
                {
                    name: "mousemove",
                    handler: this._mouseMoveHandler.bind(this)
                }
            ]);
            lineClone.style.cssText = "";
            parent.insertBefore(lineClone, target);
            parent.removeChild(line);
            this.line = lineClone;
            return;
        }
        if (target) {
            lineClone = DOM.clone(line, [
                {
                    name: "mousedown",
                    handler: this._mouseDownHandler.bind(this)
                },
                {
                    name: "mousemove",
                    handler: this._mouseMoveHandler.bind(this)
                }
            ]);
            lineClone.style.cssText = "";
            DOM.insertAfter(lineClone, target);
            parent.removeChild(line);
            this.line = lineClone;
        }
    }

    private _getIndex():number {
    	const {line, parent} = this,
  			{offsetTop} = parent,
            top = Number.parseFloat(line.style.top),
			      nodes = [].slice.call(parent.querySelectorAll(".item"));
        let topDis, bottomDis, cur, i, length, lineClone, index;
      index = 0;
		  for (i = 0, length = nodes.length; i < length; i++) {
            cur = nodes[i];
            topDis = cur.offsetTop - offsetTop;
            bottomDis = cur.offsetTop + cur.offsetHeight;
            if (bottomDis >= top) {
                index = i + 1;
                break;
            }
        }
        return index;
    }

    private _findIndex(): number {
      const {line, parent} = this,
            nodes = [].slice.call(parent.querySelectorAll(".item"));
      let i, len;
      for (i = 0, len = nodes.length; i < len; i ++) {
        if (nodes[i].isEqualNode(line)) {
          return i + 1;
        }
      }
      return 0;
    }

    private _insertToContents(item, index) {
    	if (index !== -1) {
            this.contents.splice(index, 0, item);
        } else {
            this.contents.push(item);
        }
    }
}

