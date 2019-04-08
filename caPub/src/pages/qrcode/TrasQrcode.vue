<template>
    <div class="seal-status">
        <div class="maskBox" :class="{hidden:maskShow}" @click="maskShow=true"></div>
        <div class="wrap">
            <div class="top">
                <div class="center-width">
                    <div class="query-box">
                        <span>请将二维码图置于扫描区</span>
                    </div>
                    <div class="query-box">
                        <Button type="primary" class="btn" @click="myQuery">识别</Button>
                    </div>
                </div>
            </div>
            <div class="content">
                <div class="center-width">
                    <div class="query-result">
                        <h3>查询结果</h3>
                        <div v-if="!errorMsg">
                            <div class="result-item">
                                <p>您当前查询的印章名称为</p>
                                <p>{{results.sealName}}</p>
                            </div>
                            <div class="result-item">
                                <p>盖章时间</p>
                                <p>{{results.queryTime}}</p>
                            </div>
                            <div class="result-item">
                                <p>盖章时间印章状态</p>
                                <p>{{results.sealStatus}}</p>
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
        name: 'SealStatus',
        data () {
            return {
                searchParams: {
                    sealName: '',
                    queryTime: '',
                    cert: ''
                },
                results: {
                    sealName: '',
                    queryTime: '',
                    sealStatus: '' // 有效：0 无效：1 冻结：2 吊销：3 注销：4
                },
                sliderVerification: '',
                errorMsg: '查询中',
                maskShow: true,
                dateEditable: false
            }
        },
        mounted () {
            if (sessionStorage.getItem('sealStatusQuery')) {
                let params = JSON.parse(sessionStorage.getItem('sealStatusQuery'))
                this.searchParams.sealName = params.sealName
                this.searchParams.queryTime = params.queryTime
                this.searchParams.cert = params.cert
                this.query()
            } else {
                this.errorMsg = '请输入查询参数'
            }
        },
        methods: {
            sliderVerify () {
                let _this = this
                return new SliderVerification(null, {
                    width: '208',
                    height: '32',
                    successCallback: function () {
                        _this.searchParams.cert = localStorage.getItem('token')
                        _this.maskShow = true
                        _this.query()
                    }
                })
            },
            myQuery (evt) {
                if (!this.searchParams.sealName) {
                    this.$Message.error('印章名称不能为空')
                    return
                } else if (!this.searchParams.queryTime) {
                    this.$Message.error('盖章时间不能为空')
                    return
                }
                this.maskShow = false
                this.sliderVerification = this.sliderVerify()
                this.sliderVerification.showLayer()
                evt.stopPropagation()
            },
            query () {
                this.http.post(this.ports.seal.sealStatus.sealQuery, {
                    sealName: this.searchParams.sealName,
                    queryTime: this.searchParams.queryTime,
                    cert: this.searchParams.cert
                }, res => {
                    if (res.success) {
                        this.errorMsg = ''
                        let data = res.data.results[0]
                        this.results.sealName = data.sealName
                        this.results.queryTime = data.queryTime
                        switch (data.sealStatus) {
                        case '0': this.results.sealStatus = '有效'; break;
                        case '1': this.results.sealStatus = '无效'; break;
                            /* case '2': this.results.sealStatus = '冻结'; break;
                        case '3': this.results.sealStatus = '吊销'; break;
                        case '4': this.results.sealStatus = '撤销'; break; */
                        }
                        sessionStorage.setItem('sealStatusQuery', JSON.stringify({sealName: this.searchParams.sealName, queryTime: this.searchParams.queryTime, cert: this.searchParams.cert}))
                    } else {
                        this.errorMsg = res.message
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .top{
        width: 100%;
        height: 100px;
        background: #f8f8f9;
        padding: 30px 0;
    }
    .query-box {
        float: left;
    }
    .query-box:nth-child(3){
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
