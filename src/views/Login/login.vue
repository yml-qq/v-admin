<template>
  <div id="login" class="rela">
    <el-form
      :model="ruleForm"
      label-position="top"
      :rules="rules"
      ref="ruleForm"
      class="login-form abso"
    >
      <h4 class="text-center">v-admin后台管理</h4>
      <el-form-item prop="name">
        <el-input
          v-model="ruleForm.name"
          prefix-icon="el-icon-user"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="" prop="password">
        <el-input
          type="text"
          v-model="ruleForm.password"
          prefix-icon="el-icon-lock"
          suffix-icon="el-icon-view"
          maxlength="20"
          minlength="6"
        ></el-input>
      </el-form-item>
      <el-row type="flex">
        <el-col :span="14">
          <el-form-item prop="vcCode">
            <el-input
              type="text"
              v-model="ruleForm.vcCode"
              prefix-icon="el-icon-c-scale-to-original"
              placeholder="请输入验证码"
              maxlength="4"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" class="flex-col row-left col-bottom">
          <img
            class="captcha"
            :src="imgCode"
            height="842"
            width="1191"
            alt="sdf"
            @click="GetCaptcha"
          />
        </el-col>
      </el-row>
      <el-form-item>
        <el-button
          class="login-btn"
          type="primary"
          @click="submitForm('ruleForm')"
          >登陆</el-button
        >
      </el-form-item>
      <el-row class="flex other-login row-center">
        <i class="iconfont icon-qq" style="margin: 0"></i>
        <i class="iconfont icon-weixin"></i>
        <i class="iconfont icon-weibo"></i>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { GetCode, Login } from "../../api/login";
import { stripscript, filtePass } from "../../utils/validate.js";
import { onMounted, reactive, ref } from "@vue/composition-api";
export default {
  setup(props, {refs}) {
    /*
    * 声明数据
    */
    // 密码验证规则
    const validatePass = (rule, value, callback) => {
      //过滤特殊字符和空格
      ruleForm.password = stripscript(value);
      value = ruleForm.password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (filtePass(value)) {
        callback(new Error("密码为6-12位字母和数字，不含特殊字符"));
      } else {
        callback();
      }
    };
    const imgCode = ref("");
    const key = ref("");
    const ruleForm = reactive({
      name: "",
      password: "",
      vcCode: ""
    });
    const rules = reactive({
      name: [{ required: true, message: "请输入账号", trigger: "blur" }],
      password: [{ validator: validatePass, trigger: "blur" }],
      vcCode: [{ required: true, message: "请输入验证码", trigger: "blur" }]
    });

    /*
    * 生命周期，挂载完成后
    */
    onMounted(() => {
      GetCaptcha();
    });

    /*
    * 声明普通函数
    */
    // 获取验证码
    const GetCaptcha = (()=> {
      GetCode().then(res=> {
        imgCode.value = res.data.count.captcha;
        key.value = res.data.count.key;
        console.log(key.value)
      })
    });
    // 登陆
    const submitForm = formName => {
      refs[formName].validate(valid => {
        if (valid) {
          const loginParams = {
            username: ruleForm.name,
            password: ruleForm.password,
            captcha: ruleForm.vcCode,
            key: key.value
          }
          Login(loginParams).then(res=> {
            console.log(res);
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };

    return {
      imgCode,
      key,
      ruleForm,
      rules,
      submitForm,
      GetCaptcha
    };
  }
};
</script>

<style lang="scss" scoped>
#login {
  padding: 50px 20px;
  box-sizing: border-box;
  background-image: url(../../assets/image/login-bg.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  h4 {
    font-size: 20px;
    margin: 0 0 20px 0;
  }
}
#login:before {
  content: "";
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.login-form {
  width: 360px;
  max-width: 100%;
  top: 50%;
  left: 50%;
  padding: 25px 30px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
  border-radius: 4px;
  z-index: 2;
  transform: translateX(-50%);
  margin-top: -250px;
  background: #ffffff;
  .login-btn {
    width: 100%;
  }
}
.other-login i {
  float: left;
  padding: 4px 6px;
  border-radius: 50%;
  font-size: 23px;
  margin-left: 25px;
  color: #ffffff;
}
.login-form .captcha {
  width: 102px;
  height: 38px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  text-align: center;
  cursor: pointer;
}
.other-login i:nth-child(1) {
  background: rgb(52, 146, 237);
}
.other-login i:nth-child(2) {
  background: rgb(77, 175, 41);
}
.other-login i:nth-child(3) {
  background: rgb(207, 25, 0);
}
</style>
