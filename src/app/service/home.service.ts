import { Injectable } from '@angular/core';
import { CoolHttp } from 'angular2-cool-http';

import qs from "qs";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import CommonService from "./common.service";

import Config from '../Config';

interface QueryListParam {
    page: number;
    size: number;
    type: string
}

@Injectable()
export default class HomeService extends CommonService {

	constructor(public http: CoolHttp) {
		super(http);
	}

  	queryList(param: QueryListParam) {
  		return this.http.getAsync(`${Config.listCourse}?${qs.stringify(param)}`);
  	}
}

