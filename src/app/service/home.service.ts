import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { CoolHttp } from 'angular2-cool-http';

import qs from "qs";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import CommonService from "./common.service";

//	查询首页数据
declare interface QueryListParam {
	page: number;
	size: number;
	type: string
}

import Config from '../Config';

//	格式化时间
function formatNumber(num) {
    return num < 10 ? `0${num}` : num;
}

@Injectable()
export default class HomeService extends CommonService {

	  constructor(public http: CoolHttp) {
		    super(http);
	  }

  	queryList(param: QueryListParam) {
  		return this.http.getAsync(`${Config.listCourse}?${qs.stringify(param)}`, new RequestOptions({
          withCredentials: true
      }));
  	}

  	organizeContent(content: any[]) {
  		return content.map((item) => {
  			const time = new Date(item.createTime);
			return Object.assign(item, {
				createTime: `${formatNumber(time.getMonth() + 1)} - ${formatNumber(time.getDate())} ${formatNumber(time.getHours())}:${formatNumber(time.getSeconds())}`,
	            firstImageContent: item.firstImageContent !== null ? item.firstImageContent.content : Config.mainPic,
	            link: `/detail/${item.id}`,
		        statusText: item.status !== "AUDITING" ? "已发布" : "未发布"
			});
  		});
  	}
}

