//正则过滤验证
// 字符串过滤，不含特殊字符
export function stripscript(s) {
  let pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\]<>/?~！@#￥……&*（）&;—|{}【 】‘；：”“'。，、？]")
  let rs = "";
  for (let i = 0; i < s.length; i++) {
    rs = rs + s.substr(i, 1).replace(pattern, "");
  }
  return rs;
}

//密码，6至20位的字母和数字
export function filtePass(val) {
  let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
  return !reg.test(val) ? true : false;
}
