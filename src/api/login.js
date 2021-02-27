import service from "../utils/request";
/*
*  查询
*/
//获取验证码
export function GetCode() {
  return service.request({
    url: "/captcha",
    method: "get",
  })
}
//登陆
export function Login(data) {
  return service.request({
    url: "/login",
    method: "get",
    data: data
  })
}