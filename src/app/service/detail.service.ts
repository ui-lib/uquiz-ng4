import { Injectable } from '@angular/core';
import { CoolHttp } from 'angular2-cool-http';

import qs from "qs";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import CommonService from "./common.service";

import Config from '../Config';

@Injectable()
export default class DetailService extends CommonService {

    constructor(public http: CoolHttp) {
      super(http);
    }

    public queryDetail(id: number) {
       return this.http.getAsync(Config.courseDetail(id));
    }
}

