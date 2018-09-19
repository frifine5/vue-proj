<template>
    <div class="seal-manage">
        <div class="maskBox" :class="{hidden:maskShow}" @click="maskShow=true"></div>
        <div class="wrap">
            <div class="top">
                <div class="center-width">
                    <div class="query-box">
                        <span>印章编码</span>
                        <MyInput :inputValue="searchParams.sealCode" placeholder="请输入印章编码" @change=" (e,value) => {searchParams.sealCode=value}" ></MyInput>
                    </div>
                    <div class="query-box">
                        <span>印章名称</span>
                        <MyInput :inputValue="searchParams.sealName" placeholder="请输入印章名称" @change=" (e,value) => {searchParams.sealName=value}" ></MyInput>
                    </div>
                    <div class="query-box">
                        <span>用章单位</span>
                        <MyInput :inputValue="searchParams.useUnit" placeholder="请输入用章单位" @change=" (e,value) => {searchParams.useUnit=value}" ></MyInput>
                    </div>
                    <div class="query-box">
                        <span>启用日期</span>
                        <DatePicker :value="searchParams.queryTime" :editable="dateEditable" type="date" format="yyyy-MM-dd" style="width: 300px"
                                    placeholder="将查询选定日期起之后启用的印章" @on-change="(value) => {searchParams.queryTime=value}"></DatePicker>
                    </div>
                    <div class="query-box">
                        <Button type="primary" class="btn" @click="query">查询</Button>
                    </div>
                </div>
            </div>
            <div class="content">
                <div class="center-width">
                    <div class="query-result">
                        <h3>查询结果</h3>
                        <div v-if="!errorMsg">
                            <div class="result-item">
                                <p>您当前查询的印章信息</p>
                                <p>{{results.sealName}}</p>
                            </div>


                        </div>
                        <div class="error-msg" v-else>
                            <div>{{errorMsg}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'sealManage',
        data () {
            return {
                searchParams: {
                    sealCode: '',
                    sealName: '',
                    useUnit: '',
                    queryTime: '',
                    cert: '',
                    total: 0,
                    pageNo: 1,
                    pageSize: 10,                },
                results: {
                    code: '',
                    message: '',
                    date:'',
                    total: 0,
                    pageNo: 1,
                    pageSize: 10,
                },
                sliderVerification: '',
                errorMsg: '',
                maskShow: true,
                dateEditable: false
            }
        },
        methods: {

            query (evt) {
                this.maskShow = false
                this.searchParams.cert = localStorage.getItem('token')
                this.maskShow = true
                let obj = {
                    sealCode: this.searchParams.sealCode,
                    sealName: this.searchParams.sealName,
                    useUnit: this.searchParams.useUnit,
                    queryTime: this.searchParams.queryTime,
                    pageNo: this.searchParams.pageNo,
                    pageSize: this.searchParams.pageSize,
                    cert: this.searchParams.cert
                }
                sessionStorage.setItem('sealQueryList', JSON.stringify(obj))
            },


        }
    }
</script>

<style scoped>
    .top{
        width: 100%;
        height: 150px;
        background: #f8f8f9;
        padding: 30px 0;
    }
    .query-box {
        float: left;
    }
    .query-box:nth-child(5){
        float: right;
    }
    .query-box > span{
        font-size: 14px;
        color: #495060;
        line-height: 40px;
        float: left;
        margin-right: 24px;
    }
    .wrap .inputground {
        width: 300px;
    }
    .btn{
        margin: 0;
        height: 40px;
        padding: 0 30px ;
        background: #004098;
        border-radius: 2px;
        color: #FFFFFF;
        font-size: 20px;
    }
    .query-result{
        background: #FFFFFF;
        box-shadow: 0 20px 50px 0 rgba(0,0,0,0.10);
        -webkit-border-radius: 16px;
        -moz-border-radius: 16px;
        border-radius: 16px;
        padding: 0 50px;
        text-align: center;
        margin-top: 80px;
        height: 327px;
    }
    .query-result h3{
        font-size: 18px;
        color: #1C2438;
        letter-spacing: 12.86px;
        line-height: 48px;
        border-bottom:1px solid #E9EAEC;
    }
    .result-item{
        font-size: 14px;
        color: #495060;
    }
    .result-item p:nth-child(1){
        margin-top:20px ;
    }
    .result-item p:nth-child(2){
        font-size: 18px;
        color: #004098;
        margin-top: 10px;
    }
    .error-msg{
        font-size: 18px;
        color: #495060;
        margin-top: 20px;
        background: transparent;
        border: none;
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
</style>
