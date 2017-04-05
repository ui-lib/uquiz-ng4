import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import PublishService from "../service/publish.service";
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
	public courseId: number;
	public teacherInfo;

  	constructor(private service: PublishService, private router: Router) { }

  	ngOnInit() {
  		this.service.autoNewArticle().then((res) => {
  			const {id, message} = res;
  			if (!id) {
  				Alert.error({
	        		content: message
	        	}).then(() => {
	        		this.router.navigate(["/"]);
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
  		const target = ev.target,
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

  	}

  	changeFontStyle(ev: InputEvent) {}

  	addTop(ev: MouseEvent) {

  		console.log("addTop");

  	}

}
