<template>
<div class="r-wrap wrap">
    <div class="maskBox" :class="{hidden:maskShow}" @click="maskShow=true"></div>
    <div class="form-hd">单位注册</div>
    <div class="register">
        <Form :model="formParams" onsubmit="return false">
            <FormItem>
                <MyInput :inputValue="formParams.unitName"
                         placeholder="*请输入单位名称"
                         :maxLength="maxLength.companyName"
                         @change="(e, value) => {formParams.unitName=value}"
                         @focus="companyFocus"
                ></MyInput>
                <p v-if="hintWord.companyName" class="hint-word">{{hintWord.companyName}}</p>
            </FormItem>
            <FormItem>
                <MyInput :inputValue="formParams.creditCode"
                         placeholder="*统一社会信用代码"
                         @change="(e, value) => {formParams.creditCode=value}"
                         @focus="creditCodeFocus"
                         @blur="creditCodeBlur"
                ></MyInput>
                <p v-if="hintWord.creditCode" class="hint-word">{{hintWord.creditCode}}</p>
            </FormItem>
           <!-- <FormItem>
                <MyInput :inputValue="formParams.legalPerson" placeholder="*请输入法人名称" @change="(e, value) => {formParams.legalPerson=value}"></MyInput>
            </FormItem>-->
            <FormItem>
                <MyInput :inputValue="formParams.unitEmail"
                         placeholder="*请输入单位邮箱"
                         @change="(e, value) => {formParams.unitEmail=value}"
                         @focus="companyEmailFocus"
                         @blur="companyEmailBlur"
                ></MyInput>
                <p v-if="hintWord.companyEmail" class="hint-word">{{hintWord.companyEmail}}</p>
            </FormItem>
            <FormItem>
                <MyInput :inputValue="formParams.username"
                         placeholder="*请输入用户名称"
                         :maxLength="maxLength.username"
                         @change="(e, value) => {formParams.username=value}"
                         @focus="usernameFocus"
                ></MyInput>
                <p v-if="hintWord.userName" class="hint-word">{{hintWord.userName}}</p>
            </FormItem>
            <FormItem>
                <MyInput :inputValue="formParams.userAccount"
                         placeholder="*请输入登录账号"
                         @change="(e, value) => {formParams.userAccount=value}"
                         @focus="userAccountFocus"
                         @blur="userAccountBlur"
                ></MyInput>
                <p v-if="hintWord.userAccount" class="hint-word">{{hintWord.userAccount}}</p>
            </FormItem>
            <FormItem>
                <MyInput :inputValue="formParams.password"
                         inputType="password"
                         placeholder="*请输入登录密码"
                         @change="(e, value) => {formParams.password=value}"
                         @focus="passwordFocus"
                         @blur="passwordBlur"
                ></MyInput>
                <p v-if="hintWord.password" class="hint-word">{{hintWord.password}}</p>
            </FormItem>
            <FormItem>
                <div class="upload-formitem">
                    <span>企业资质证明</span>
                    <div class="uploadBox">
                        <MyButton id="uploadBtn" type="third" :class="{'upbtn':true, 'error-upload':hintWord.pic}"><MyIcon interval="interval" type="yidongduan_conbanbenshengji"></MyIcon>上传文件</MyButton>
                        <input contentEditable="false" type='file' id="uploadInput"  name='photos' class="upfile" @change="fileChange">
                    </div>
                    <span style="font-size: 12px;color: #FF8F00;">支持png、jpg，最大10M</span>
                </div>
                <div class="pic" v-if="picName"><span>{{picName}}</span><span class="icon-del" @click="deletePic"><MyIcon type="yidongduan_condelete"></MyIcon></span></div>
                <p v-if="hintWord.pic" class="hint-word">{{hintWord.pic}}</p>
            </FormItem>
            <FormItem>
                <Button type="primary" class="btn" @click="register">注册</Button>
            </FormItem>
           <!-- <FormItem>
                <Checkbox v-model="formParams.isAgree">同意注册协议<a class="link" href="javascript:;" style="color:#001c3e;">《发布系统开发者注册协议》</a></Checkbox>
            </FormItem>-->
        </Form>
        <div class="form-ft">
            <p>已有账号？<router-link to="/login">去登录</router-link></p>
        </div>
    </div>
</div>
</template>
<script>
    import '../../assets/font/iconfont.css'
    export default {
        name: 'Register',
        data () {
            return {
                formParams: {
                    unitName: '',
                    creditCode: '',
                    // legalPerson: '',
                    unitEmail: '',
                    username: '',
                    userAccount: '',
                    password: '',
                    cert: '',
                    file: '',
                    isAgree: true
                },
                picName: '',
                maskShow: true,
                hintWord: {
                    companyName: '',
                    creditCode: '',
                    companyEmail: '',
                    userName: '',
                    userAccount: '',
                    password: '',
                    pic: ''
                },
                maxLength: {
                    companyName: 150,
                    username: 30
                }
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
            register (evt) {
                if (!this.formParams.unitName.trim()) {
                    this.hintWord.companyName = '单位名称不能为空'
                    return
                } else if (!this.formParams.creditCode.trim()) {
                    this.hintWord.creditCode = '统一社会信用代码不能为空'
                    return
                } else if (!this.reg.creditCode.test(this.formParams.creditCode)) {
                    this.hintWord.creditCode = '统一社会信用代码格式不正确'
                    return
                } else if (this.formParams.creditCode.length !== 18) {
                    this.hintWord.creditCode = '统一社会信用代码长度不正确'
                    return
                } else if (!this.formParams.unitEmail.trim()) {
                    this.hintWord.companyEmail = '单位邮箱不能为空'
                    return
                } else if (!this.reg.email.test(this.formParams.unitEmail)) {
                    this.hintWord.companyEmail = '单位邮箱格式不正确'
                    return
                } else if (!this.formParams.username.trim()) {
                    this.hintWord.userName = '用户名称不能为空'
                    return
                } else if (!this.formParams.userAccount.trim()) {
                    this.hintWord.userAccount = '登录账号不能为空'
                    return
                } else if (!this.reg.userAccount.test(this.formParams.userAccount)) {
                    this.hintWord.userAccount = '登录账号格式不正确'
                    return
                } else if (!this.formParams.password.trim()) {
                    this.hintWord.password = '登录密码不能为空'
                    return
                } else if (!this.reg.password.test(this.formParams.password)) {
                    this.hintWord.password = '登录密码格式不正确'
                    return
                } else if (!this.formParams.file) {
                    this.hintWord.pic = '未上传企业资质证明图片'
                    return
                } /* else if (!this.formParams.isAgree) {
                    this.$Message.config({
                        top: 770,
                        duration: 5
                    });
                    this.$Message.error({
                        content: '未同意注册协议',
                        duration: 5
                    })
                    return
                } */
                this.maskShow = false
                this.sliderVerification = this.sliderVerify()
                this.sliderVerification.showLayer()
                evt.stopPropagation()
            },
            getData () {
                let _this = this
                let fd = new FormData()
                fd.append('file', this.formParams.file)
                fd.append('companyName', this.formParams.unitName)
                fd.append('companyCreditCode', this.formParams.creditCode)
                fd.append('companyEmail', this.formParams.unitEmail)
                fd.append('userName', this.formParams.username)
                fd.append('userAccount', this.formParams.userAccount)
                fd.append('userPassword', this.formParams.password)
                fd.append('cert', this.formParams.cert)
                this.http.uploadFileFormData(this.ports.manage.register, fd, res => {
                    if (res.success) {
                        this.$Modal.success({
                            title: '提示框',
                            content: '注册成功，请等待后台审核！',
                            onOk: () => {
                                _this.$router.push({path: '/login'})
                            }
                        })
                    } else {
                        this.$Modal.warning({
                            title: '提示框',
                            content: '注册失败,' + res.message,
                            closable: true
                        })
                        this.picName = ''
                        this.deletePic()
                    }
                })
            },
            fileChange (evt) {
                this.hintWord.pic = ''
                this.formParams.file = ''
                if (!evt.target.files) {
                    let uploadInput = document.getElementById('uploadInput')
                    this.formParams.file = uploadInput.value
                    this.picName = uploadInput.value.substring(uploadInput.value.lastIndexOf('\\') + 1, uploadInput.value.length)
                    return
                }
                if (!evt.target) {
                    return
                }
                let target = evt.target
                let isIE = false
                if (window.addEventListener) {
                    isIE = false
                } else if (window.attachEvent) {
                    isIE = true
                }
                let fileSize = 0
                if (isIE && !target.files) {
                    let filePath = target.value
                    let fileSystem = new ActiveXObject('Scripting.FileSystemObject')
                    let file = fileSystem.GetFile (filePath)
                    fileSize = file.Size
                } else {
                    fileSize = target.files[0].size
                }
                // let size = fileSize / 1024 // (10*1024*1024)
                if (fileSize > 10 * 1024 * 1024) {
                    this.$Modal.warning({
                        title: '提示框',
                        content: '上传文件最大为10M，请重新上传。',
                        closable: true
                    })
                    this.deletePic()
                    return
                }
                let name = target.value
                let fileName = name.substring(name.lastIndexOf('.') + 1).toLowerCase()
                if (fileName !== 'png' && fileName !== 'jpg') {
                    this.$Modal.warning({
                        title: '提示框',
                        content: '请上传JPG、PNG格式的文件',
                        closable: true
                    })
                    this.deletePic()
                    return
                }
                this.formParams.file = target.files[0]
                this.picName = target.value.substring(target.value.lastIndexOf('\\') + 1, target.value.length)
            },
            companyFocus (e) {
                this.hintWord.companyName = ''
            },
            creditCodeFocus (e) {
                this.hintWord.creditCode = ''
            },
            creditCodeBlur (e) {
                if (this.formParams.creditCode.length !== 18) {
                    this.hintWord.creditCode = '统一社会信用代码长度不正确'
                } else if (!this.reg.creditCode.test(this.formParams.creditCode)) {
                    this.hintWord.creditCode = '统一社会信用代码格式不正确'
                } else {
                    this.hintWord.creditCode = ''
                }
            },
            companyEmailFocus (e) {
                this.hintWord.companyEmail = ''
            },
            companyEmailBlur (e) {
                if (!this.reg.email.test(this.formParams.unitEmail)) {
                    this.hintWord.companyEmail = '邮箱格式不正确'
                } else {
                    this.hintWord.companyEmail = ''
                }
            },
            usernameFocus (e) {
                this.hintWord.userName = ''
            },
            userAccountFocus (e) {
                this.hintWord.userAccount = '登录账号必须是数字、字母或字母和数字的组合'
            },
            userAccountBlur (e) {
                if (this.formParams.userAccount.length < 6 || this.formParams.userAccount.length > 16) {
                    this.hintWord.userAccount = '登录账号长度必须在6-16位之间'
                } else if (!this.reg.userAccount.test(this.formParams.userAccount)) {
                    this.hintWord.userAccount = '登录账号格式不正确'
                } else {
                    this.hintWord.userAccount = ''
                }
            },
            passwordFocus () {
                this.hintWord.password = '登录密码必须是数字和字母的组合'
            },
            passwordBlur () {
                if (this.formParams.password.length < 6 || this.formParams.password.length > 16) {
                    this.hintWord.password = '密码长度必须在6-16位之间'
                } else if (!this.reg.password.test(this.formParams.password)) {
                    this.hintWord.password = '密码格式不正确'
                } else {
                    this.hintWord.password = ''
                }
            },
            deletePic () {
                this.picName = ''
                let isIE10 = false
                if (window.navigator.userAgent.indexOf('MSIE') >= 1) { // 判断ie10以及以下
                    isIE10 = true
                } else {
                    isIE10 = false
                }
                let uploadInput = document.getElementById('uploadInput')
                if (isIE10) {
                    let form = document.createElement('form')
                    let beforInput = uploadInput.nextSibling
                    let parentInput = uploadInput.parentNode
                    form.appendChild(uploadInput)
                    form.reset()
                    parentInput.insertBefore(uploadInput, beforInput)
                    this.formParams.file = ''
                } else {
                    uploadInput.value = ''
                }
            }
        }
    }
</script>

<style scoped>
    .r-wrap {
        padding: 80px 0 20px 0;
    }
  .register{
      width: 600px;
      margin: 0 auto;
      padding: 60px 100px 50px 100px;
      font-size: 14px;
      background: #FFFFFF;
      box-shadow: 0 20px 50px 0 rgba(0,0,0,0.10);
      border-radius: 16px;
  }
    .r-wrap.wrap .inputground{
        width: 400px;
        margin: 0;
        height: 40px;
        float: inherit;
    }
    .r-wrap.wrap .ivu-input{
        height: 40px;
        font-size: 14px;
    }
  .r-wrap .form-hd{
      font-size: 32px;
      color: #1C2438;
      text-align: center;
      margin-bottom: 40px;
    }
  .r-wrap .form-ft{
        text-align: center;
        margin-top: 40px;
        font-size: 12px;
    }
  .r-wrap .form-ft a{
      font-size: 12px;
      color: #004098;
      cursor: pointer;
  }
  .r-wrap .btn{
        width: 400px;
        padding: 6px 85px;
        margin: 0;
        height: 40px;
        background-color: #004098;
        font-size: 20px;
        color: #ffffff;
        border-radius: 2px;
        line-height: 28px;
    }
  .r-wrap .link{
      color: #001C3E;
  }
  .r-wrap .ivu-form-item-content{
      line-height: 20px;
  }
  .r-wrap form .ivu-form-item:nth-last-child(1) .ivu-form-item-content{
      line-height: 20px !important;
  }
  .r-wrap .ivu-checkbox{
      color: #495060;
  }
    .r-wrap .ivu-input{
        height: 40px;
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
    .upload-formitem {
        overflow: hidden;
    }
    .upload-formitem > span{
        float: left;
        line-height: 40px;
    }
    .uploadBox{
        position: relative;
        display: inline-block;
        margin: 0 10px;
        overflow: hidden;
        float: left;
    }
    .upfile{
        width: 107px;
        height: 40px;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        font-size: 300px;
        margin-left: -6px;
        z-index: 999;
        cursor: pointer;
    }
    .upbtn{
        width: 102px;
        height: 40px;
        margin: 0;
        color: #004098;
        border-color:#004098 ;
    }
    .upbtn.error-upload{
        color: #f44336;
        border-color:#f44336 ;
    }
    .pic{
        background: #f8f8f9;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        color: #004098;
        line-height: 28px;
        padding: 0 10px;
        margin-top: 10px;
    }
    .hint-word{
        color: #f44336;
    }
    .icon-del{
        color: #80848f;
        float: right;
    }
</style>
