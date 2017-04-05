import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { CoolHttp } from 'angular2-cool-http';

import qs from "qs";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import CommonService from "./common.service";

//	添加内容类型
declare interface AddContentParam {
    content: string,
    contentType: string,
    courseId: number,
    id: number,
    sort: number,
    status: string,
    duration?: number
}

import Config from '../Config';

@Injectable()
export default class PublishService extends CommonService {

      constructor(public http: CoolHttp) {
        super(http);
      }

      //    新建一篇文章获取id
      autoNewArticle() {
          return this.http.getAsync(`${Config.course(0)}`, new RequestOptions({
              withCredentials: true
          }));
      }

      //  获取上传的图片地址
      getFileUrl(id: number) {
          return Config.file(id);
      }

      //    上传内容
      addContent(param: AddContentParam) {
        return this.http.postAsync(Config.addContent, param, new RequestOptions({
            withCredentials: true
        }));
      }
}

