<template>
    <div class="l-wrap wrap">
        <div class="maskBox" :class="{hidden:maskShow}" @click="maskShow=true"></div>
        <div class="form-hd">用户登录</div>
        <div class="login">
            <Form :model="formParams"  onsubmit="return false">
                <FormItem>
                    <MyInput :inputValue="formParams.userAccount"
                             placeholder="请输入登录账号"
                             @change="(e, value) => {formParams.userAccount=value}"
                             @focus="userAccountFocus"
                    ></MyInput>
                    <div><p v-if="hintWord.userAccount" class="hint-word">{{hintWord.userAccount}}</p></div>
                </FormItem>
                <FormItem>
                    <MyInput :inputValue="formParams.password"
                             inputType="password"
                             placeholder="请输入登录密码"
                             @change="(e, value) => {formParams.password=value}"
                             @focus="passwordFocus"
                    ></MyInput>
                    <div><p v-if="hintWord.password" class="hint-word">{{hintWord.password}}</p></div>
                </FormItem>
               <!-- <FormItem>
                    <p class="verify">验证码</p>
                    <div id="Trigger_slider_box" class="Trigger_slider_box"></div>
                </FormItem>-->
                <FormItem class="clearfix">
                    <!--<Checkbox v-model="formParams.rememberPwd">记住密码</Checkbox>-->
                    <a href="javascript:;" style="float: right;" @click="forgetPwd">忘记密码</a>
                </FormItem>
                <FormItem>
                    <Button type="primary" class="btn" @click="login">登录</Button>
                </FormItem>
            </Form>
            <div class="form-ft">
                <p><router-link to="/register">立即注册</router-link></p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'login',
        data () {
            return {
                formParams: {
                    userAccount: '',
                    password: '',
                    cert: '',
                    rememberPwd: ''
                },
                sliderVerification: '',
                maskShow: true,
                hintWord: {
                    userAccount: '',
                    password: ''
                },
                loginToken: ''
            }
        },
        mounted () {
        },
        methods: {
            sliderVerify () {
                let _this = this
                return new SliderVerification(null, {
                    width: '266',
                    height: '40',
                    successCallback: function () {
                        _this.formParams.cert = localStorage.getItem('token')
                        _this.maskShow = true
                        _this.getData()
                    }
                })
            },
            login (evt) {
                if (!this.formParams.userAccount) {
                    this.hintWord.userAccount = '登录账号不能为空'
                    return
                } else if (!this.reg.userAccount.test(this.formParams.userAccount)) {
                    this.hintWord.userAccount = '登录账号格式不正确'
                    return
                } else if (!this.formParams.password) {
                    this.hintWord.password = '登录密码不能为空'
                    return
                } else if (!this.reg.password.test(this.formParams.password)) {
                    this.hintWord.password = '登录密码格式不正确'
                    return
                }
                this.maskShow = false
                this.sliderVerification = this.sliderVerify()
                this.sliderVerification.showLayer()
                evt.stopPropagation()
            },
            getData () {
                this.http.post(this.ports.manage.login, {
                    userAccount: this.formParams.userAccount,
                    userPassword: this.formParams.password,
                    cert: this.formParams.cert
                }, res => {
                    if (res.success) {
                        let expires = new Date()
                        expires.setTime(expires.getTime() + 30 * 60 * 1000)
                        document.cookie = 'loginToken=' + escape(res.data.results[0].loginToken) + ';expires=' + expires.toGMTString()
                        /* if (this.formParams.rememberPwd) { // 记住密码
                            document.cookie = 'username=' + this.formParams.userAccount
                            document.cookie = 'password=' + this.formParams.password
                        } else {
                            document.cookie = 'username=' + ''
                            document.cookie = 'password=' + ''
                        } */
                        window.localStorage.setItem('loginInfo', JSON.stringify(res.data.results[0]))
                        this.$router.push({path: '/developer'})
                    } else {
                        let msg = res.message
                        this.$Modal.warning({
                            title: '提示框',
                            content: msg,
                            closable: true
                        })
                    }
                })
            },
            forgetPwd () {
                this.$router.push({path: '/pwd/findPwd-1'})
            },
            userAccountFocus () {
                this.hintWord.userAccount = ''
            },
            passwordFocus () {
                this.hintWord.password = ''
            }
        }
    }
</script>

<style scoped>
    .l-wrap {
        padding-top: 80px;
    }
    .login{
        width: 600px;
        margin: 0 auto;
        padding: 60px 100px 50px 100px;
        font-size: 14px;
        background: #FFFFFF;
        box-shadow: 0 20px 50px 0 rgba(0,0,0,0.10);
        border-radius: 16px;
    }
    .l-wrap .inputground{
        width: 400px !important;
        margin: 0 !important;
        height: 40px;
        float: inherit;
    }
    .wrap .ivu-input{
        height: 40px;
        font-size: 14px;
    }
    .form-hd{
        font-size: 32px;
        color: #1C2438;
        text-align: center;
        margin-bottom: 40px;
    }
    .form-ft{
        text-align: center;
        margin-top: 40px;
    }
    .form-ft a{
        color: #004098;
        font-size: 12px;
        cursor: pointer;
    }
    .btn{
        padding: 6px 135px;
        margin: 0;
        height: 40px;
        background-color: #004098;
        font-size: 20px;
        color: #ffffff;
        border-radius: 2px;
        line-height: 28px;
    }
    .ivu-form-item-content{
        line-height: 20px;
    }
    form .ivu-form-item:nth-last-child(1) .ivu-form-item-content{
        line-height: 20px !important;
    }
    .ivu-checkbox{
        color: #495060;
    }
    .l-wrap.wrap .ivu-input {
        height: 40px;
        font-size: 14px;
    }
    .l-wrap .btn{
        padding: 6px 85px;
        margin: 0;
        height: 40px;
        background-color: #004098;
        font-size: 20px;
        color: #ffffff;
        border-radius: 2px;
        line-height: 28px;
        width: 100%;
    }
    .ivu-form-item-content{
        line-height: 1;
    }
    .ivu-form-item{
        margin-bottom: 20px;
    }
    .ivu-form-item:nth-child(2),
    .ivu-form-item:nth-child(2){
        margin-bottom: 10px;
    }
    .maskBox{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        z-index: 900;
        background: rgba(0,0,0,0.5);
    }
    .hidden{
        display: none;
    }
    .hint-word{
        color: #f44336;
        padding-left: 16px;

    }
</style>
