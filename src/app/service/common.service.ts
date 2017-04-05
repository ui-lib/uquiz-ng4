import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { CoolHttp } from 'angular2-cool-http';
import qs from "qs";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import Config from '../Config';

//	文件上传类型
declare interface UploadAudioParam {
    file: File,
    duration: number
}

@Injectable()
export default class CommonService {

  	constructor(public http: CoolHttp) {}

  	autoLogin() {
  		let openId = sessionStorage.getItem("openId");
		return this.http.postAsync(`${Config.login}?${qs.stringify({openId})}`, "", new RequestOptions({
            withCredentials: true
        }));
  	}

    queryTeacherInfo() {
        return this.http.getAsync(Config.teacherInfo, new RequestOptions({
            withCredentials: true
        }));
    }

    upload(file: File) {
        let form = new FormData();
        form.append("file", file);
        form.append("space", "uquiz_image");
        form.append("owner", "-1");
        form.append("name", "-1");
        return this.http.postAsync(Config.upload, form, new RequestOptions({
            withCredentials: true
        }));
    }

    uploadAudio(param: UploadAudioParam) {
        let form = new FormData();
        const {file} = param;
        form.append("file", file);
        form.append("space", "uquiz_video");
        form.append("owner", "-1");
        form.append("name", "-1");
        return this.http.postAsync(Config.upload, form, new RequestOptions({
            withCredentials: true
        }));
    }
}
