import { Component, OnInit } from '@angular/core';

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

	public articles: any;

	private page: number = 1;
	private size: number = 50;
	private type: string = "use";

	constructor(private service: HomeService, private router: Router) { }

	ngOnInit() {
		this.service.autoLogin().then(() => {
			this.queryList();
		}).catch(() => {
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
