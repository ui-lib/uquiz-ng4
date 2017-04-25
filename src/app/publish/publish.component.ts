import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

import PublishService from "../service/publish.service";
import { EditorComponent } from "../editor/editor.component";

import Alert from '../Alert';

//  input change事件参数
declare interface InputEvent extends Event {
	target: HTMLInputElement & EventTarget;
}

@Component({
  	selector: 'app-publish',
  	templateUrl: './publish.component.html',
  	styleUrls: ['./publish.component.css'],
  	providers: [PublishService]
})
export class PublishComponent implements OnInit {

	public contents: any[] = [];
	public text: string = "";
  public title: string = "";
	public courseId: number;
	public teacherInfo;

	@ViewChild(EditorComponent)
  private editor: EditorComponent;

  	constructor(private service: PublishService, private router: Router) { }

  	ngOnInit() {
  		this.service.autoNewArticle().then((res) => {
  			const {id, message} = res;
  			if (!id) {
  				Alert.error({
	        		content: message
	        	}).then(() => {
	        		this.router.navigate(["/publish"]);
	        	});
  			} else {
  				this.courseId = id;
  			}
  		}).catch(() => {
        	Alert.error({
        		content: "网络异常,请重试!"
        	});
  		});
  		this.service.queryTeacherInfo().then((res) => {
  			this.teacherInfo = res;
  		}).catch(() => {
        	Alert.error({
        		content: "网络异常,请重试!"
        	});
  		});
  	}

  	selectImage(ev: InputEvent) {
  		const {target} = ev,
            file = target.files[0],
            {size} = file;
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
        	return this.service.addContent(addContent);
        }).then((res) => {
        	this.contents.push(res);
        }).catch(() => {
        	Alert.error({
        		content: "网络异常,请重试!"
        	});
        });
  	}

  	selectMusic(ev: InputEvent) {
      const {target} = ev,
        file = target.files[0],
        {size, name} = file;
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
            return this.service.addContent(contentParam);
          })
          .then((res) => {
            this.contents.push(res);
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
  		const content = this.editor.outputContent(),
  			contentParam = {
  				contentType: "TEXT",
  				id: 0,
  				courseId: this.courseId,
  				content,
  				sort: 0,
  				status: "ENABLED",
	  		};
  		if (!content) {
	    	Alert.warn({
	    		content: "请先输入内容!"
	    	});
	      return;
  		}
  		this.service.addContent(contentParam).then((res) => {
  				this.contents.push(res);
  			})
  			.catch(() => {
	        	Alert.error({
	        		content: "网络异常,请重试!"
	        	});
	        });
        this.editor.reset();
  	}

    confirmPublish() {
      let {title, contents, courseId} = this;
      title = title.trim();
      if (!contents.length) {
        Alert.error({
          content: "请先至少添加一条消息!"
        });
        return;
      }

      if (!title) {
        Alert.error({
          content: "请先输入标题!"
        });
        return;
      }

      this.service.submitAtricle({
        title,
        contents,
        courseId,
        teacherId: this.teacherInfo.id
      }).then((res) => {
        Alert.success({
          content: "发布成功"
        }).then(() => {
          this.router.navigate(["/home"]);
        });
      })
        .catch((e) => {
          Alert.error({
            content: "网络异常,请重试!"
          });
        });
    }

}
