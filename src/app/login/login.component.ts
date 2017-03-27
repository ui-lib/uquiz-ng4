import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import sockjs from "sockjs-client";
import * as Stomp from "stompjs";

import LoginService from "../service/login.service";
import Alert from '../Alert';
import Config from '../Config';

@Component({
  	selector: 'app-login',
  	templateUrl: './login.component.html',
  	styleUrls: ['./login.component.css'],
  	providers: [LoginService]
})

export class LoginComponent implements OnInit {
	  public picURI: string;
    private io: any;
    private stomp: any;

  	constructor(private loginService: LoginService, private router: Router) {
  	}

  	ngOnInit() {
  	    this.loginService.getErCodeURI().then((res) => {
              this.picURI = Config.picURI(res);
              this.io = new sockjs(Config.scanLogin);
              this.stomp = Stomp.over(this.io);
              this.stomp.connect("guest", "guest", (frame) => {
                    this.stomp.subscribe("/user/queue/notifications", (ret) => {
                        if (ret && ret.body) {
                            this.io.close();
                            this.router.navigate(["/home"]);
                        } else if (ret.body === "false") {
                            Alert.error({
                                 title: "错误",
                                 content: "网络异常,请刷新浏览器重试!"
                             }).then(() => {
                                window.location.reload();
                             });
                        }
                    }, () => {
                      console.log("subscribe notifications fail");
                    });
                }, () => {
                      console.log("connect fail");
                });
          }).catch((e) => {
              Alert.error({
                  title: "错误",
                  content: "网络异常,请刷新浏览器重试!"
              }).then(() => {
                  window.location.reload();
              });
          });
  	}
}
