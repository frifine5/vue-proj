<template>
    <div class="cer-query1">

        <div class="wrap">
            <div class="top">
                <div class="center-width">
                    <div class="query-box">
                        <span>请输入你要查询的证书申请编号</span>
                        <MyInput :inputValue="searchParams.info" placeholder="请输入证书申请编号"
                                 @change=" (e,value) => {searchParams.info=value ; this.scinfo=false }"></MyInput>
                    </div>
                    <div class="query-box">
                        <Button type="primary" class="btn" @click="doQuery">查询</Button>
                    </div>
                </div>
            </div>


            <div class="content">
                <div class="center-width">
                    <div class="query-result">
                        <h3>查询结果</h3>
                        <div v-if="!errorMsg">
                            <div class="result-item">
                                <div id="qrcode"
                                     style="width:50px; height:50px; margin-top:15px; margin-left: 20px;"></div>
                            </div>
                            <div v-if="scinfo">
                                <span>< 你输入的信息是 ></span>{{searchParams.oldInfo}}
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
        name: 'CerApyQuery',
        data() {
            return {
                searchParams: {
                    info: '',
                    color: '#000',
                    oldInfo: '',
                },
                scinfo: false,
                sliderVerification: '',
                errorMsg: '',
                maskShow: true,
                dateEditable: false
            }
        },
        mounted() {
        },
        methods: {

            doQuery(){



            },




        }
    }
</script>

<style scoped>
    .top {
        width: 100%;
        height: 100px;
        background: #f8f8f9;
        padding: 30px 0;
    }

    .query-box {
        float: left;
    }

    .query-box:nth-child(3) {
        float: right;
    }

    .query-box > span {
        font-size: 14px;
        color: #495060;
        line-height: 40px;
        float: left;
        margin-right: 24px;
    }

    .wrap .inputground {
        width: 300px;
    }

    .btn {
        margin: 0;
        height: 40px;
        padding: 0 30px;
        background: #004098;
        border-radius: 2px;
        color: #FFFFFF;
        font-size: 20px;
    }

    .query-result {
        background: #FFFFFF;
        box-shadow: 0 20px 50px 0 rgba(0, 0, 0, 0.10);
        -webkit-border-radius: 16px;
        -moz-border-radius: 16px;
        border-radius: 16px;
        padding: 0 50px;
        text-align: center;
        margin-top: 80px;
        height: 327px;
    }

    .query-result h3 {
        font-size: 18px;
        color: #1C2438;
        letter-spacing: 12.86px;
        line-height: 48px;
        border-bottom: 1px solid #E9EAEC;
    }

    .result-item {
        margin-top: 50px;
        font-size: 14px;
        color: #495060;
    }

    .result-item p:nth-child(1) {
        margin-top: 20px;
    }

    .result-item p:nth-child(2) {
        font-size: 18px;
        color: #004098;
        margin-top: 10px;
    }

    .error-msg {
        font-size: 18px;
        color: #495060;
        margin-top: 20px;
        background: transparent;
        border: none;
    }



</style>
