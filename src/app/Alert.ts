/**
 * sweetalert简单调用
 */

import swal from "sweetalert2";

export default class Alert {

	constructor() {}

	/**
	 * useage
	 * 成功提示
	 * Alert.success({
	 * 		title: "提示",
	 * 		content: "提示信息"
	 * }).then(() => {});
	 */
	static success({title = "提示", content}) {
		return swal({
			title: title || "提示",
			text: content || "成功",
			type: "success",
			allowOutsideClick: false,
			confirmButtonText: "确定"
		});
	}

	/**
	 * useage
	 * Alert.comfirm({
	 * 		title: "确认",
	 * 		content: "你确定要继续此操作吗?",
	 * 		cfmText: "确定",
	 * 		canText: "取消"
	 * }).then(() => {}, () => {});
	 */
	static confirm({title = "提示", content, cfmText = "确定", canText = "取消"}) {
		return swal({
			title: title || "确认",
			text: content || "你确定要继续此操作吗?",
			type: "warning",
			showConfirmButton: true,
			confirmButtonText: cfmText || "确定",
			showCancelButton: true,
			cancelButtonText: canText || "取消",
			allowOutsideClick: false
		});
	}

	/**
	 * useage
	 * Alert.warn({
	 * 		title: "确认",
	 * 		content: "警告信息"
	 * }).then(() => {});
	 */
	static warn({title = "警告", content}) {
		return swal({
			title: title || "警告",
			text: content || "警告信息",
			type: "warning",
			confirmButtonText: "确定",
			allowOutsideClick: false
		});
	}

	/**
	 * useage
	 * Alert.info({
	 * 		title: "提示",
	 * 		content: "提示信息"
	 * }).then(() => {});
	 */
	static info({title = "提示", content}) {
		return swal({
			title: title || "提示",
			text: content || "提示信息",
			type: "info",
			confirmButtonText: "确定",
			allowOutsideClick: false
		});
	}

	/**
	 * useage
	 * Alert.error({
	 * 		title: "错误",
	 * 		content: "发生错误!"
	 * }).then(() => {});
	 */
	static error({title = "错误", content}) {
		return swal({
		  	title: title || "错误",
		  	text: content || "发生错误!",
		  	type: "error",
			confirmButtonText: "确定",
			allowOutsideClick: false
		});
	}
}

