<template>
    <div class="header-wrap">
        <div class="header">
            <div class="logo">Crab证书服务</div>
            <the-menu></the-menu>
            <a v-if="logoutShow" class="logout" href="javascript:;" @click="logout">退出</a>
        </div>
    </div>
</template>

<script>
    import TheMenu from '@/components/TheMenu.vue'
    export default {
        name: 'the-header',
        data () {
            return {
                activeClass: 'doc',
                logoutShow: false
            }
        },
        components: {
            TheMenu
        },
        mounted () {
            let hash = location.hash
            let stingStrHash = hash.substring(1)
            if (stingStrHash === '/developer') {
                this.logoutShow = true
            }
        },
        methods: {
            logout () {
                let loginToken = null
                let cookieArr = document.cookie.match(new RegExp('(^| )loginToken=([^;]*)(;|$)'))
                if (!cookieArr) {
                    return
                } else {
                    loginToken = unescape(cookieArr[2])
                }
                this.http.post(this.ports.manage.logout, {
                    loginToken: loginToken
                }, res => {
                    if (res.success) {
                        localStorage.removeItem('loginInfo')
                        let expires = new Date()
                        expires.setTime(expires.getTime() - 1)
                        document.cookie = 'loginToken=' + '' + ';expires=' + expires.toGMTString()
                        this.$router.push({path: '/login'})
                    }
                })
            }
        },
        watch: {
            '$route' (to, from) {
                if (to.fullPath === '/developer') {
                    this.logoutShow = true
                } else {
                    this.logoutShow = false
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .header-wrap {
        width: 100%;
        height: 70px;
        background: #004098;
        position: relative;
    }
    .header {
        width: 1000px;
        margin: 0 auto;
    }

    .logo {
        @include title_font;
        font-size: 24px;
        float: left;
        margin-right: 48px;
        line-height: 70px;
    }

    .title {
        @include normal_font;
        float: right;
        overflow: hidden;
    }
    .title a {
        color: #ffffff;
        font-size: 14px;
        font-weight: 400;
        padding: 0 23px;
        float: left;
        line-height: 66px;
    }
    .title a.router-link-active{
        border-bottom: 4px solid #52b7fc;
    }
    .logout{
        float: right;
        margin: 0 20px;
        color: #FFFFFF;
        font-size: 14px;
        line-height: 70px;
    }

</style>
