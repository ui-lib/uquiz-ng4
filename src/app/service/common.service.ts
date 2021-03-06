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

  	constructor(public http: CoolHttp) {
        this.http.setWithCredentials(true);
    }

  	public autoLogin() {
  		let openId = sessionStorage.getItem("openId");
		return this.http.postAsync(`${Config.login}?${qs.stringify({openId})}`, "");
  	}

    public queryTeacherInfo() {
        return this.http.getAsync(Config.teacherInfo);
    }

    public upload(file: File) {
        let form = new FormData();
        form.append("file", file);
        form.append("space", "uquiz_image");
        form.append("owner", "-1");
        form.append("name", "-1");
        return this.http.postAsync(Config.upload, form);
    }

    public uploadAudio(param: UploadAudioParam) {
        let form = new FormData();
        const {file} = param;
        form.append("file", file);
        form.append("space", "uquiz_video");
        form.append("owner", "-1");
        form.append("name", "-1");
        return this.http.postAsync(Config.upload, form);
    }

    public getFileUrl(id: number) {
        return Config.file(id);
    }

    public getDate(date: number):string {
        const {formatNumber} = this,
            time = new Date(date);
        return `${[
            formatNumber(time.getMonth() + 1),
            formatNumber(time.getDate())
        ].join("-")} ${[
            formatNumber(time.getHours()),
            formatNumber(time.getSeconds())
        ].join(":")}`;
    }

    private formatNumber(num):string {
        num = "" + num;
        return (num < 10) ? `0${num}` : num;
    }
}
