import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { CoolHttp } from 'angular2-cool-http';

import qs from "qs";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import HomeService from "./home.service";

import Config from '../Config';

@Injectable()
export default class SubjectService extends HomeService {

	constructor(public http: CoolHttp) {
		super(http);
	}

  	public deleteCourse(id: number) {
  		return this.http.postAsync(Config.delCourse(id), {}, new RequestOptions({
  			withCredentials: true
  		}));
  	}
}

