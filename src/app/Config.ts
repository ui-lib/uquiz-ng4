/**
 * ajax url config
 */

const prefix = "http://api.studypointshare.com";

export default class Config {

    static prefix = prefix

    //  获取微信二维码地址
    static scanView = `${prefix}/api/teacher/scanView`

    //    扫码登录
    static scanLogin = `${prefix}/scan-login`

    //  图片地址
    static picURI = (ticket) => `https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${ticket}`

    //  登录
    static login = `${prefix}/api/teacher/login`

    //  教师课程
    static listCourse = `${prefix}/api/teacher/listCourse`

    //  文件上传
    static upload = `${prefix}/api/file/upload`

    //  添加课程内容
    static addContent = `${prefix}/api/teacher/addContent`

    //  删除课程内容
    static deleteItems = `${prefix}/api/teacher/contents/del`

    //  删除课程
    static delCourse = (id) => `${prefix}/api/teacher/delCourse/${id}`

    //  获取课程详情
    static course = (id) => `${prefix}/api/teacher/course/${id || 0}`

    //  更改课程
    static couseEdit = `${prefix}/api/teacher/couse/edit`

    //  获取教师信息
    static teacherInfo = `${prefix}/api/teacher/info`

    //  更新教师信息
    static modify = `${prefix}/api/teacher/modify`

    //  文件前缀
    static file = (id) => `${prefix}/api/file/z/${id}`

    //  文章详情
    static courseDetail=  (id) => `${prefix}/api/teacher/course/${id}`

    //  默认图片
    static mainPic = "http://www.studypointshare.com/static/img/main-pic.jpg"
}
