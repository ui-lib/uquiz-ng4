import { Component, EventEmitter, Output, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import HomeService from "../service/home.service";
import Alert from '../Alert';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HomeService]
})

export class HomeComponent implements OnInit {
	@Output() updateNav = new EventEmitter<any>();

	public articles: any;
	private page: number = 1;
	private size: number = 29;
	private type: string = "use";

	constructor(private service: HomeService, private router: Router) {}

	ngOnInit() {
		this.updateNav.emit("home");
		this.service.autoLogin().then(() => {
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
		.catch((e) => {
			Alert.error({
				content: "网络异常, 请刷新浏览器重试!"
			});
		});
	}

	queryList() {
		const {page, size, type} = this;
		return this.service.queryList({page, size, type});
	}

}
