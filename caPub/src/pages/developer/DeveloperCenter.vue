<template>
    <div>
        <div class="center-width">
            <div class="left">
                <div class="moudle-info">
                    <h3>基本信息</h3>
                    <div class="cont">
                        <div class="cont-item">
                            <p>单位名称</p>
                            <p>{{userInfo.unitName}}</p>
                        </div>
                        <div class="cont-item">
                            <p>单位联系人：</p>
                            <p>{{userInfo.unitContact}}</p>
                        </div>
                        <div class="cont-item">
                            <p>单位邮箱：</p>
                            <p>{{userInfo.unitEmail}}</p>
                        </div>
                    </div>
                </div>
                <div class="moudle-info">
                    <h3>授权信息</h3>
                    <div class="cont">
                        <div class="cont-item">
                            <p>appkey</p>
                            <p>{{userInfo.appKey}}</p>
                        </div>
                        <div class="cont-item">
                            <p>appsecret</p>
                            <p>{{userInfo.appSecret}}</p>
                        </div>
                        <div class="cont-item">
                            <p>用户盐值</p>
                            <p>{{userInfo.userSalt}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="moudle-info">
                    <h3>单位资质图片</h3>
                    <div class="cont">
                        <img v-if="userInfo.qualificationUrl" v-bind:src="userInfo.qualificationUrl" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'DeveloperCenter',
        data () {
            return {
                userInfo: {
                    unitName: '1111',
                    unitContact: '',
                    unitEmail: '',
                    appKey: '',
                    appSecret: '',
                    userSalt: '',
                    qualificationUrl: ''
                }
            }
        },
        mounted () {
            let cookieArr = document.cookie.match(new RegExp('(^| )loginToken=([^;]*)(;|$)'))
            if (!cookieArr) {
                this.$router.push({path: '/login'})
                return
            } else {
                unescape(cookieArr[2])
            }
            let info = JSON.parse(window.localStorage.getItem('loginInfo'))
            this.userInfo.unitName = info.companyName
            this.userInfo.unitContact = info.userName
            if (info.companyEmail) {
                this.userInfo.unitEmail = info.companyEmail
            }
            this.userInfo.appKey = info.appKey
            this.userInfo.appSecret = info.appSecret
            this.userInfo.userSalt = info.userSalt
            this.userInfo.qualificationUrl = info.qualificationUrl
        },
        methods: {
        }
    }
</script>

<style scoped>
    .left,
    .right{
        float: left;
        margin-top: 80px;
    }
    .right{
        margin-left: 20px;
    }
    .moudle-info{
        width: 490px;
        font-size: 14px;
        margin-bottom: 30px;
        background: #FFFFFF;
        box-shadow: 0 16px 30px 0 rgba(0,0,0,0.08);
        border-radius: 16px;
        padding: 0 30px 50px 30px;
    }
    .left .moudle-info{
        height: 327px;
    }
    .right .moudle-info{
        height: 684px;
    }
    .moudle-info h3{
        color: #1C2438;
        letter-spacing: 10px;
        line-height: 47px;
        padding-left: 16px;
        border-bottom: 1px solid #f8f8f9;
        font-size: 18px;
    }
    .cont-item p{
        margin-top: 20px;
        color: #495060;
    }
    .cont-item p:nth-child(2){
        margin-top: 10px;
        color: #004098;
        font-size: 18px;
    }
    .right .cont{
        text-align: center;
        overflow: auto;
        height: 616px;
    }
    .cont img{
        margin-top: 20px;
    }
</style>
