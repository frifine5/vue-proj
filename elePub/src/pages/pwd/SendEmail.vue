<template>
    <div>
        <div class="maskBox" :class="{hidden:maskShow}"></div>
        <div class="center-width">
            <div class="seal-wrap">
                <h2>电子印章状态发布子系统</h2>
                <div class="panel send-email">
                    <h3>邮箱验证</h3>
                    <i class="font_family icon-youxiang"></i>
                    <div style="color: #1c2438;font-size: 14px;">设置新密码的链接已发送至<span class="email">{{email}}</span></div>
                    <p style="color: #9EA7B4;margin-bottom: 20px;">请您在5分钟之内登录邮箱，点击邮箱内的链接设置新密码</p>
                    <Button type="primary" class="btn" @click="back">返回</Button>
                    <p class="bot">*目前仅支持通过邮箱找回密码，如邮箱不可用，请联系管理员</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '../../assets/font/iconfont.css'
    export default {
        name: 'SendEmail',
        data () {
            return {
                maskShow: true,
                email: ''
            }
        },
        mounted () {
            if (this.$route.query.email) {
                this.email = this.$route.query.email
            } else {
                this.email = '*******'
            }
        },
        methods: {
            back () {
                this.$router.push({path: '/pwd/findPwd-1'})
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
        cursor: pointer;
    }
    .panel {
        background: #FFFFFF;
        box-shadow: 0 20px 50px 0 rgba(0,0,0,0.10);
        border-radius: 16px;
        padding: 30px 100px 33px 100px;
    }
    .icon-youxiang {
        font-size: 70px;
        color: #80848f;
        line-height: 92px;
    }
    .send-email{
        text-align: center;
    }
    .email{
        color: #004098;
        text-align: center;
        line-height: 20px;
    }
    .bot{
        color: #9ea7b4;
        text-align: center;
        margin-top: 60px;
    }
</style>
