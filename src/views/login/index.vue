<template>
  <div class="login-container">

    <el-form
      v-if="loginType === 'password'"
      ref="loginForm"
      class="login-form"
      :model="loginForm"
      :rules="loginRules"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">登录 SpringBoot Easy</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          key="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-form-item prop="code">
        <span class="svg-container">
          <svg-icon icon-class="form" />
        </span>
        <el-input
          key="code"
          ref="code"
          v-model="loginForm.code"
          name="code"
          tabindex="3"
          auto-complete="off"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd">
          <el-image :src="image" style="height: 30px;width: 100px;" @click="refreshImageCode" />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >
        登 录
      </el-button>

      <FlexBox class="tips">
        <FlexItem style="text-align: left">
          <el-link type="primary" @click="loginType='email'">Email验证码登陆</el-link>
        </FlexItem>
        <FlexItem style="text-align: right">
          <el-link type="primary" @click="loginType='mobile'">手机验证码登陆</el-link>
        </FlexItem>
      </FlexBox>
    </el-form>

    <el-form
      v-else-if="loginType === 'mobile'"
      ref="mobileForm"
      class="login-form"
      :model="mobileForm"
      :rules="mobileRules"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">登录 SpringBoot Easy</h3>
      </div>

      <el-form-item ref="mobile" prop="mobile">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          key="mobile"
          v-model="mobileForm.mobile"
          placeholder="请输入手机号"
          name="mobile"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="code">
        <span class="svg-container">
          <svg-icon icon-class="form" />
        </span>
        <el-input
          ref="smsCode"
          v-model="mobileForm.code"
          name="code"
          tabindex="3"
          auto-complete="off"
          @keyup.enter.native="handleSmsLogin"
        />
        <span class="show-pwd">
          <VButton @click="sendSmsCode">发送验证码</VButton>
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleSmsLogin"
      >
        登 录
      </el-button>

      <FlexBox class="tips">
        <FlexItem style="text-align: left">
          <el-link type="primary" @click="loginType='email'">Email验证码登陆</el-link>
        </FlexItem>
        <FlexItem style="text-align: right">
          <el-link type="primary" @click="loginType='password'">密码验证登陆</el-link>
        </FlexItem>
      </FlexBox>
    </el-form>

    <el-form
        v-else-if="loginType === 'email'"
        ref="emailForm"
        class="login-form"
        :model="emailForm"
        :rules="emailRules"
        auto-complete="on"
        label-position="left"
    >
      <div class="title-container">
        <h3 class="title">登录 SpringBoot Easy</h3>
      </div>

      <el-form-item ref="email" prop="email">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
            key="email"
            v-model="emailForm.email"
            placeholder="请输入邮箱地址"
            name="email"
            type="text"
            tabindex="1"
            auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="code">
        <span class="svg-container">
          <svg-icon icon-class="form" />
        </span>
        <el-input
            ref="smsCode"
            v-model="emailForm.code"
            name="code"
            tabindex="3"
            auto-complete="off"
            @keyup.enter.native="handleEmailLogin"
        />
        <span class="show-pwd">
          <VButton @click="sendEmailCode">发送验证码</VButton>
        </span>
      </el-form-item>

      <el-button
          :loading="loading"
          type="primary"
          style="width:100%;margin-bottom:30px;"
          @click.native.prevent="handleEmailLogin"
      >
        登 录
      </el-button>

      <FlexBox class="tips">
        <FlexItem style="text-align: left">
          <el-link type="primary" @click="loginType='mobile'">手机验证码登陆</el-link>
        </FlexItem>
        <FlexItem style="text-align: right">
          <el-link type="primary" @click="loginType='password'">密码验证登陆</el-link>
        </FlexItem>
      </FlexBox>
    </el-form>
  </div>
</template>

<script>
import {getCode, sendSmsCode, sendEmailCode} from '@/api/user'

export default {
  name: 'Login',
  data() {
    return {
      loginType: 'password',
      image: '',
      loginForm: {
        username: 'admin',
        password: '123456',
        key: '',
        code: ''
      },
      loginRules: {
        username: [{required: true, trigger: 'blur', message: '请输入用户名'}],
        password: [{required: true, trigger: 'blur', message: '请输入用户密码'}],
        code: [{required: true, trigger: 'blur', message: '请输入验证码'}]
      },
      mobileForm: {
        mobile: '13512345678',
        code: ''
      },
      mobileRules: {
        mobile: [{required: true, trigger: 'blur', message: '请输入手机号'}],
        code: [{required: true, trigger: 'blur', message: '请输入验证码'}]
      },
      emailForm: {
        email: 'admin@foxmail.com',
        code: ''
      },
      emailRules: {
        email: [{required: true, trigger: 'blur', message: '请输入邮箱地址'}],
        code: [{required: true, trigger: 'blur', message: '请输入验证码'}]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    this.refreshImageCode()
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    async refreshImageCode() {
      this.loginForm.code = '';
      const {data: {k, v}} = await getCode()
      this.loginForm.key = k
      this.image = v
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({path: this.redirect || '/'})
            this.loading = false
          }).catch(() => {
            this.loading = false
            this.refreshImageCode()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async sendSmsCode() {
      this.$refs.mobile.validate()
      if (!this.mobileForm.mobile) {
        return
      }
      await sendSmsCode(this.mobileForm.mobile)
      this.$message.success("验证码发送成功")
    },
    handleSmsLogin() {
      this.$refs.mobileForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/smsLogin', this.mobileForm).then(() => {
            this.$router.push({path: this.redirect || '/'})
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async sendEmailCode() {
      this.$refs.email.validate()
      if (!this.emailForm.email) {
        return
      }
      await sendEmailCode(this.emailForm.email)
      this.$message.success("验证码发送成功")
    },
    handleEmailLogin() {
      this.$refs.emailForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/emailLogin', this.emailForm).then(() => {
            this.$router.push({path: this.redirect || '/'})
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  }
}
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg: #283443;
  $light_gray: #fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
