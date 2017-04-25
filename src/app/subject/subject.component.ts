import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';

import SubjectService from "../service/subject.service";
import Alert from '../Alert';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css'],
  providers: [SubjectService]
})
export class SubjectComponent implements OnInit {

	public articles: any;

	private page: number = 0;
	private size: number = 30;
	private type: string = "view";

  	constructor(private service: SubjectService) { }

  	ngOnInit() {
  		this.queryList()
		.then((res) => {
			const {code, message, content} = res;
			if (code === 10000) {
				Alert.error({
					content: message
				});
				return;
			}
			this.articles = this.service.organizeContent(content);
		})
		.catch(() => {
			Alert.error({
				content: "网络异常, 请刷新浏览器重试!"
			});
		});
  	}

  	queryList() {
		const {page, size, type} = this;
		return this.service.queryList({page, size, type});
  	}

  	deleteCourse(course) {
  		Alert.confirm({
  			content: "你确定要删除这篇文章吗?"
  		}).then((res) => {
  			const {code, message} = res,
  				{id} = course;
			if (code === 10000) {
				Alert.error({
					content: message
				});
			} else {
				this.service.deleteCourse(id).then((res) => {
					return Alert.success({
						content: "删除成功!"
					});
	  			})
	  			.then(() => {
	  				return this.queryList();
	  			})
				.then((res) => {
					const {code, message, content} = res;
					if (code === 10000) {
						Alert.error({
							content: message
						});
						return;
					}
					this.articles = this.service.organizeContent(content);
				})
	  			.catch(() => {
					Alert.error({
						content: "网络异常, 请刷新浏览器重试!"
					});
				});
			}
  		});
  	}

}
