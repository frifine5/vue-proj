<template>
    <div class="api-pg">
        <div class="bg-l"></div>
        <div class="bg-r"></div>
        <div class="api-bd">
            <div class="aside">
                <h2>自助演示</h2>
                <api-menu></api-menu>
            </div>
            <div class="right-box">
                <div class="module-name">
                    <Breadcrumb separator="/">
                        <BreadcrumbItem v-for="(item, index) in breadcrumb" :to="item.path" :key="index">
                            <span v-if="index === 0"><MyIcon type="shangyibu" interval="interval"></MyIcon></span>
                            {{item.meta.breadcrumbName}}
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <hr class="income-underline"/>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import ApiMenu from '@/components/apiMenu.vue'
    export default {
        name: 'SelfGuide',
        components: {
            ApiMenu
        },
        data () {
            return {
                breadcrumb: ''
            }
        },
        mounted () {
            this.getBreadcrumb()
        },
        methods: {
            getBreadcrumb () {
                let len = this.$route.matched.length
                this.breadcrumb = this.$route.matched.slice(1, len)
            }
        },
        watch: {
            $route () {
                this.getBreadcrumb()
            }
        }
    }
</script>

<style scoped>
    .api-pg{
        width: 100%;
        height: 100%;
        font-size: 0;
        overflow-y: auto;
    }
    .bg-l{
        width: 50%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background-color: #f8f8f9;
        z-index: -1;
    }
    .bg-r{
        width: 50%;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        background-color: #ffffff;
        z-index: -1;
    }
    .api-bd{
        width: 1000px;
        height: 100%;
        margin: 0 auto;
        position: relative;
        background-color: #ffffff;
    }
    .aside {
        display: inline-block;
        width: 220px;
        background-color: #f8f8f9;
        position: absolute;
        top: 0;
        height: 100%;
    }
    h2 {
        font-size: 30px;
        padding: 40px 0 0 30px ;
        color: #1c2438;
        font-weight: 400;
        margin-bottom: 60px;
    }
    .right-box{
        display: inline-block;
        width: 780px;
        margin-left: 240px;
        background-color: #ffffff;
        font-size: 16px;
        height: 100%;
        overflow-y: auto;
        padding-bottom: 80px;
    }
    /*滚动条样式*/
    .api-pg::-webkit-scrollbar {/*滚动条整体样式*/
        width: 0px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 0px;
    }
    .api-pg::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: rgba(0,0,0,0.2);
    }
    .api-pg::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 0;
        background: rgba(0,0,0,0.1);
    }
    .right-box::-webkit-scrollbar {/*滚动条整体样式*/
        width: 0px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 0px;
    }
    .right-box::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: rgba(0,0,0,0.2);
    }
    .right-box::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 0;
        background: rgba(0,0,0,0.1);
    }
    .module-name{
        font-size: 14px;
        color: #495060;
        padding-top: 16px;
    }
    .income-underline {
        height: 1px;
         margin: 16px 0;
        /* background-color: #DDDEE1;*/
        background-color: #E9EAEC;
        border: 0;
    }
    .ivu-breadcrumb {
        display: inline-block;
    }
</style>
