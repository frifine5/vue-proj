<template>
    <div>
        <div class="maskBox" :class="{hidden:maskShow}" @click="maskShow=true"></div>
        <div class="center-width">
            <div class="seal-wrap">
                <h2>电子印章状态发布子系统</h2>
                <div class="panel seal-form">
                    <h3>找回密码</h3>
                    <Form :model="formParams"  onsubmit="return false">
                        <FormItem>
                            <MyInput :inputValue="formParams.newPassword"
                                     placeholder="请输入新密码"
                                     inputType="password"
                                     @change="(e, value) => {formParams.newPassword=value}"
                                     @focus="passwordFocus"
                                     @blur="passwordBlur"
                            ></MyInput>
                            <p v-if="hintWord.password" class="hint-word">{{hintWord.password}}</p>
                        </FormItem>
                        <FormItem>
                            <MyInput :inputValue="formParams.confirmPassword"
                                     inputType="password"
                                     placeholder="请再次输入新密码"
                                     @change="(e, value) => {formParams.confirmPassword=value}"
                                     @blur="confirmPwdBlur"
                            ></MyInput>
                            <p v-if="hintWord.confirmpwd" class="hint-word">{{hintWord.confirmpwd}}</p>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" class="btn" @click="setPwd">提交</Button>
                        </FormItem>
                    </Form>
                    <p class="bot">*目前仅支持通过邮箱找回密码，如邮箱不可用，请联系管理员</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '../../assets/font/iconfont.css'
    export default {
        name: 'SetPwd',
        data () {
            return {
                maskShow: true,
                formParams: {
                    newPassword: '',
                    confirmPassword: '',
                    cert: ''
                },
                userAccount: '',
                requestParam: '',
                hintWord: {
                    password: '',
                    confirmpwd: ''
                }
            }
        },
        mounted () {
            this.userAccount = this.$route.query.userAccount
            this.requestParam = this.$route.query.requestParam
        },
        methods: {
            sliderVerify () {
                let _this = this
                return new SliderVerification('#Trigger_slider_box', {
                    width: '208',
                    height: '32',
                    successCallback: function () {
                        _this.formParams.cert = localStorage.getItem('token')
                        _this.maskShow = true
                        _this.query()
                    }
                })
            },
            setPwd (evt) {
                if (!this.formParams.newPassword) {
                    this.$Modal.warning({
                        title: '提示框',
                        content: '密码不能为空',
                        closable: true
                    })
                    return
                } else if (!this.formParams.confirmPassword) {
                    this.$Modal.warning({
                        title: '提示框',
                        content: '再次输入密码不能为空',
                        closable: true
                    })
                    return
                }
                if (this.formParams.newPassword !== this.formParams.confirmPassword) {
                    this.$Modal.warning({
                        title: '提示框',
                        content: '两次输入密码不一致',
                        closable: true
                    })
                    return
                }
                this.maskShow = false
                this.sliderVerification = this.sliderVerify()
                this.sliderVerification.showLayer()
                evt.stopPropagation()
            },
            query () {
                this.http.post(this.ports.pwd.resetPwd, {
                    userAccount: this.userAccount,
                    userPassword: this.formParams.newPassword,
                    confirmPassword: this.formParams.confirmPassword,
                    requestParam: this.requestParam,
                    cert: this.formParams.cert
                }, res => {
                    if (res.success) {
                        this.$router.push({path: '/pwd/setSuccess'})
                    } else {
                        this.$router.push({path: '/pwd/setError'})
                    }
                })
            },
            passwordFocus () {
                this.hintWord.password = '登录密码必须是数字和字母的组合'
            },
            passwordBlur () {
                let pwdRegExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{1,}$/
                if (!pwdRegExp.test(this.formParams.newPassword)) {
                    this.hintWord.password = '密码格式不正确'
                } else if (this.formParams.newPassword.length < 6 || this.formParams.newPassword > 16) {
                    this.hintWord.password = '密码长度必须在6-16位之间'
                } else {
                    this.hintWord.password = ''
                }
            },
            confirmPwdBlur () {
                if (this.formParams.newPassword !== this.formParams.confirmPassword) {
                    this.hintWord.confirmpwd = '两次输入密码不一致'
                } else {
                    this.hintWord.confirmpwd = ''
                }
            }
        }
    }
</script>

<style scoped>
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
    .seal-wrap{
        width: 600px;
        margin: 0 auto;
        padding-top: 160px;
    }
    h2,h3 {
        font-size: 32px;
        color: #1C2438;
        text-align: center;
        margin-bottom: 30px;
    }
    h3{
        font-size: 24px;
    }
    .btn{
        width: 100%;
        height: 40px;
        color: #FFFFFF;
        background: #004098;
        font-size: 20px;
        text-align: center;
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
    }
    .panel {
        background: #FFFFFF;
        box-shadow: 0 20px 50px 0 rgba(0,0,0,0.10);
        border-radius: 16px;
        padding: 30px 100px 33px 100px;
        text-align: center;
    }
    .bot{
        color: #9ea7b4;
        text-align: center;
        margin-top: 124px;
    }
    .hint-word{
        color: #f44336;
        text-align: left;
    }
    .icon-youxiang {
        font-size: 70px;
        color: #dddee1;
    }
    .bot{
        color: #9ea7b4;
        text-align: center;
        margin-top: 60px;
    }
</style>
