import { Injectable } from '@angular/core';
import { CoolHttp } from 'angular2-cool-http';

import qs from "qs";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import CommonService from "./common.service";

import Config from '../Config';

declare interface saveInfoParam {
	course?: any,
	createTime: number,
	headImg: string,
	id: number,
	level: string,
	name: string,
	nickName: string,
	openId: string,
	phone: string,
	status: string,
	university: string
};

@Injectable()
export default class MyService extends CommonService {

	constructor(public http: CoolHttp) {
	    super(http);
	}

  	public modify(info: saveInfoParam) {
  		return this.http.postAsync(Config.modify, info);
  	}
}

