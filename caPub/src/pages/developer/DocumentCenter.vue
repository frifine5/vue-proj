<template>
    <div class="doc-pg">
        <div class="bg-title">
            <p>电子印章状态发布子系统文档中心</p>
        </div>
        <div class="main">
            <div class="hd">产品文档</div>
            <div class="bd clearfix">
                <div class="left doc-lr">
                    <div class="tt">平台说明</div>
                    <div>
                        <router-link to="/docs/newGuide"><i></i><span>新手指引</span></router-link>
                        <router-link to="/docs/accessDoc"><i></i><span>接前说明</span></router-link>
                    </div>
                </div>
                <!--<div class="right doc-lr">
                    <div class="tt">开发文档</div>
                    <div>
                        <a href="javascript:;"><i></i><span>用户授权说明</span></a>
                        <a href="javascript:;"><i></i><span>SDK说明</span></a>
                    </div>
                </div>-->
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'DocumentCenter'
    }
</script>

<style scoped>
    .bg-title{
        color: #ffffff;
        font-size:40px;
        background: url("../../assets/images/banner_pc.png");
        height: 200px;
        text-align: center;
        line-height: 200px;
    }
    .main{
        width: 1000px;
        margin: 0 auto;
        color: #1C2438;
        letter-spacing: 0;
    }
    .hd{
        font-size: 30px;
        text-align: center;
        line-height: 82px;
        border-bottom: 1px solid #e9eaec;
    }
    .doc-lr{
        display: inline-block;
        width: 460px;
        float: left;
    }
    .doc-lr .tt{
        font-size: 18px;
        margin: 25px 0;
    }
    .doc-lr > div:nth-child(2) a{
        display: inline-block;
        width: 180px;
        height: 60px;
        line-height: 60px;
        font-size: 14px;
        color: #004098;
        text-align: center;
        border: 1px solid #dddee1;
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
        margin-left: 40px;
        position: relative;
        float: left;
    }
    .doc-lr > div:nth-child(2) a:nth-child(2){
        margin-left: 60px;
    }
    .doc-lr i {
        display: inline-block;
        width: 30px;
        height: 30px;
        vertical-align: middle;
        margin-right: 20px;
    }
    .left {
        margin-right: 80px;
    }
    .left a:nth-child(1) i{
        background: url("../../assets/images/doc_pic.png") no-repeat 2px 0 ;
        background-size: 350px 350px;
    }
    .left a:nth-child(2) i{
        background: url("../../assets/images/doc_pic.png") no-repeat -124px 0 ;
        background-size: 350px 350px;
    }
    .right a:nth-child(1) i{
        background: url("../../assets/images/doc_pic.png") no-repeat -36px 0 ;
        background-size: 350px 350px;
    }
    .right a:nth-child(2) i{
        background: url("../../assets/images/doc_pic.png") no-repeat -80px 0 ;
        background-size: 350px 350px;
    }
</style>
