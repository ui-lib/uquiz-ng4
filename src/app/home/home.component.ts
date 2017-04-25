import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import HomeService from "../service/home.service";
import NavService from '../service/nav.service';
import Alert from '../Alert';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HomeService, NavService]
})
export class HomeComponent implements OnInit {
	public articles: any;
	private page: number = 0;
	private size: number = 29;
	private type: string = "use";

	constructor(private service: HomeService, private navService: NavService, private router: Router) {}

	ngOnInit() {
		this.navService.changeNav("home");
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
