<template>
    <div class="doc-pg clearfix">
        <div class="aside">
            <doc-menu></doc-menu>
        </div>
        <div class="right-box">
            <div class="module-name" style="padding-left: 16px;">
                <Breadcrumb separator="/">
                    <BreadcrumbItem v-for="(item, index) in breadcrumb" :to="item.path" :key="index">
                        <MyIcon v-if="index === 0" type="shangyibu" interval="interval"></MyIcon>
                        {{item.meta.breadcrumbName}}
                    </BreadcrumbItem>
                </Breadcrumb>
            </div>
            <hr class="income-underline"/>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import DocMenu from '@/components/docMenu.vue'
    export default {
        name: 'docsHome',
        components: {
            DocMenu
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
 .doc-pg{
     width: 1000px;
     margin: 0 auto;
 }
 .aside {
     display: inline-block;
     width: 220px;
     /*background-color: #f8f8f9;*/
     float: left;
 }
    .right-box{
        width: 780px;
        float: left;
        border-left: 1px solid #dddee1;
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
     margin-left: 16px;
 }
 .ivu-breadcrumb {
     display: inline-block;
 }
</style>
