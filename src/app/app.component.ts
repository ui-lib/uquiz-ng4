import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CoolHttp } from 'angular2-cool-http';

import Alert from "./Alert";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})

export class AppComponent {
    private nav: string = "home";

	  constructor(private http: CoolHttp, private router: Router) {
      this.http.registerResponseInterceptor({
          afterResponseAsync: (url, method, data, headers) => {
              let { _body } = url;
              return new Promise((resolve, reject) => {
                  resolve();
                  if (_body) {
                    _body = JSON.parse(_body);
                    const { code, message } = _body;
                    if (code === 10000) {
                      Alert.error({
                        content: "请先登录!"
                      }).then(() => {
                        this.router.navigate(["/"]);
                      });
                    }
                  }
              });
          }
      });
	  }

    ngOnInit() {

    }

    changeNav(nav: string) {
      this.nav = nav;
    }
}
