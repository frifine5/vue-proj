<template>
    <div>
        <div class="center-width">
            <div class="seal-wrap">
                <h2>电子印章状态发布子系统</h2>
                <div class="panel email-error">
                    <h3>邮箱验证</h3>
                    <i class="font_family icon-youxiang"></i>
                    <p style="color: #495060;font-size: 14px;">错误：验证码已失效</p>
                    <a href="javascript:;" style="color: #004098;font-size: 14px;">{{downTime}}s中返回系统登录页</a>
                    <p class="bot">*目前仅支持通过邮箱找回密码，如邮箱不可用，请联系管理员</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '../../assets/font/iconfont.css'
    export default {
        name: 'SetError',
        data () {
            return {
                downTime: 10
            }
        },
        mounted () {
            let _this = this
            let timer = setInterval(function () {
                _this.downTime -= 1
                if (_this.downTime === 0) {
                    clearInterval(timer)
                    _this.$router.push({path: '/login'})
                }
            }, 1000)
        },
        methods: {
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
        line-height: 24px;
        margin-bottom: 0px;
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
    .hint-word{
        color: #f44336;
    }
    .icon-youxiang {
        font-size: 70px;
        color: #dddee1;
    }
    .bot{
        color: #9ea7b4;
        text-align: center;
        margin-top: 118px;
    }
</style>
