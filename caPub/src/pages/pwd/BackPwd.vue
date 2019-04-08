<template>
    <div>
    <div class="maskBox" :class="{hidden:maskShow}" @click="maskShow=true"></div>
    <div class="center-width">
        <div class="seal-wrap">
            <h2>电子印章状态发布子系统</h2>
            <div class="panel seal-form">
                <h3>找回密码</h3>
                <Form :model="searchParams"  onsubmit="return false">
                    <FormItem>
                        <MyInput :inputValue="searchParams.userAccount" placeholder="请输入用户名" @change="(e, value) => {searchParams.userAccount=value}"></MyInput>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" class="btn" @click="nextStep">下一步</Button>
                    </FormItem>
                </Form>
                <p>*目前仅支持通过邮箱找回密码，如邮箱不可用，请联系管理员</p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        name: 'BackPwd',
        data () {
            return {
                maskShow: true,
                searchParams: {
                    userAccount: '',
                    cert: ''
                }
            }
        },
        methods: {
            sliderVerify () {
                let _this = this
                return new SliderVerification('#Trigger_slider_box', {
                    width: '208',
                    height: '32',
                    successCallback: function () {
                        _this.searchParams.cert = localStorage.getItem('token')
                        _this.maskShow = true
                        _this.query()
                    }
                })
            },
            nextStep (evt) {
                if (!this.searchParams.userAccount) {
                    this.$Modal.warning({
                        title: '提示框',
                        content: '用户名不能为空',
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
                this.http.post(this.ports.pwd.sendEmail, this.searchParams, res => {
                    if (res.success) {
                        let email = res.data.results[0].email
                        this.$router.push({path: '/pwd/findPwd-2', query: {email: email}})
                    } else {
                        this.$Modal.error({
                            title: '提示框',
                            content: res.message,
                            closable: true
                        })
                    }
                })
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
    }
    .panel > p{
        color: #9ea7b4;
        text-align: center;
        margin-top: 124px;
    }
</style>
