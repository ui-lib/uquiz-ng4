import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import MyService from "../service/my.service";
import NavService from "../service/nav.service";
import Alert from '../Alert';

@Component({
  selector: 'app-my',
  templateUrl: './my.component.html',
  styleUrls: ['./my.component.css'],
  providers: [MyService, NavService]
})
export class MyComponent implements OnInit {

	public teacherInfo;
	public showEdit: boolean = false;
	public nickName: string;
	public name: string;
	public phone: string;
	public university: string;

  	constructor(private service: MyService, private navService: NavService, private router: Router) { }

  	ngOnInit() {
      this.navService.changeNav("my");
  		this.init();
  	}

  	init() {
  		this.showEdit = false;
  		this.service.queryTeacherInfo().then((res) => {
  			const { nickName, name, phone, university } = res;
  			this.teacherInfo = res;
  			this.nickName = nickName;
  			this.name = name;
  			this.phone = phone;
  			this.university = university;
  		}).catch(() => {
        	Alert.error({
        		content: "网络异常,请重试!"
        	});
  		});
  	}

  	update() {
  		const { nickName, name, phone, university, teacherInfo } = this;
  		this.service.modify(Object.assign({}, teacherInfo, {
  			nickName, name, phone, university
  		})).then(() => {
  			return this.init();
  		}).then(() => {
  			Alert.success({
        		content: "修改成功!"
        	});
  		}).catch(() => {
        	Alert.error({
        		content: "网络异常,请重试!"
        	});
  		});
  	}

  	edit() {
  		this.showEdit = true;
  	}

  	cancel() {
	  	const { nickName, name, phone, university } = this.teacherInfo;
		this.nickName = nickName;
		this.name = name;
		this.phone = phone;
		this.university = university;
  		this.showEdit = false;
  	}

}
