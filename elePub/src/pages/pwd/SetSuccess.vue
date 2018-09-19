<template>
    <div>
        <div class="center-width">
            <div class="seal-wrap">
                <h2>电子印章状态发布子系统</h2>
                <div class="panel send-email">
                    <h3>密码设置成功</h3>
                    <i class="font_family icon-chenggong"></i>
                    <div style="color: #1c2438;font-size: 14px;">恭喜，新密码设置成功</div>
                    <p style="color: #9ea7b4;margin-bottom: 20px;">页面将在{{downTime}}s后就跳转到登录页面，请使用新密码登录系统</p>
                    <Button type="primary" class="btn" @click="backLogin">立即登录</Button>
                    <p class="bot">*请牢记您的登录密码，祝您使用愉快！</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '../../assets/font/iconfont.css'
    export default {
        name: 'SetSuccess',
        data () {
            return {
                downTime: 10
            }
        },
        mounted () {
            let _this = this
            let timer = setInterval(function () {
                _this.downTime -= 1
                console.log(_this.downTime);
                if (_this.downTime === 0) {
                    clearInterval(timer)
                    _this.$router.push({path: '/login'})
                }
            }, 1000)
        },
        methods: {
            backLogin () {
                this.$router.push({path: '/login'})
            }
        }
    }
</script>

<style scoped>
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
        text-align: left;
        margin-top: 48px;
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
    .hint-word{
        color: #f44336;
    }
    .icon-chenggong {
        font-size: 70px;
        color: #dddee1;
        color: #1FCA74;
    }
</style>
