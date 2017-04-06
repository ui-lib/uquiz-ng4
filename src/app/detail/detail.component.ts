import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import DetailService from "../service/detail.service";
import Alert from '../Alert';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [DetailService]
})
export class DetailComponent implements OnInit {

	public detail: any = {};
	public teacherInfo: any;
	public link: string = "";
	public editLink: string = "";
	public allowEdit: boolean = false;

	private sub: any;
	private couseId: number;

  	constructor(private service: DetailService, private router: ActivatedRoute) { }

  	ngOnInit() {
  		this.sub = this.router.params.subscribe(params => {
		    this.couseId = +params["id"];
		    this.link = `/detail/${this.couseId}`;
		    this.editLink = `/edit/${this.couseId}`;

			this.service.queryTeacherInfo().then((res) => {
	  			this.teacherInfo = res;
	  			return this.service.queryDetail(this.couseId)
	  		})
	  		.then((res) => {
	  			this.detail = res;
	  		})
	  		.catch(() => {
	        	Alert.error({
	        		content: "网络异常,请重试!"
	        	});
	  		});
    	});
  	}

}
