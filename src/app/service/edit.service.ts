import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { CoolHttp } from 'angular2-cool-http';

import qs from "qs";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import DetailService from "./detail.service";

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
export default class EditService extends DetailService {

      constructor(public http: CoolHttp) {
        super(http);
      }

      public addContent(param: AddContentParam, id?: number) {
          let url = Config.addContent;
          if (id) {
            url = `${url}?${qs.stringify({id})}`;
          }
          return this.http.postAsync(Config.addContent, param, new RequestOptions({
              withCredentials: true
          }));
      }

      public submitAtricle({title, contents, courseId, teacherId}) {
          return this.http.postAsync(Config.couseEdit, {
            title, 
            contents, 
            courseId, 
            teacherId,
            id: courseId,
            status: "ENABLED"
          }, new RequestOptions({
              withCredentials: true
          }));        
      }
}

