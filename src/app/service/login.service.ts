import { Injectable } from '@angular/core';
import { CoolHttp } from 'angular2-cool-http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import Config from '../Config';

@Injectable()
export default class LoginService {

	constructor(private http: CoolHttp) {}

  	getErCodeURI() {
  		return this.http.getAsync(Config.scanView);
  	}
}
