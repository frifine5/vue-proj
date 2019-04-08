<template>
    <div class="change-log">
        <div class="maskBox" :class="{hidden:maskShow}" @click="maskShow=true"></div>
        <div class="wrap">
            <div class="top">
                <div class="center-width">
                    <div class="query-box">
                        <span>印章名称</span>
                        <MyInput :inputValue="searchParams.sealName" placeholder="请输入印章名称" @change="(e, value) => {searchParams.sealName = value}" ></MyInput>
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
                        <div v-if="!errorMsg" >
                          <p class="result-title">印章名称：<span>{{results.sealName}}</span>当前状态：<span>{{results.sealStatus}}</span></p>
                            <div class="table-wr" v-if="tableMsg.length > 0">
                                <!--<MyTable :columns="columns"
                                         :stripe="false"
                                         :showTotal="false"
                                         :showElevator="false"
                                         :data="tableMsg"
                                         :total="total"
                                         :pagination="pagination"
                                         @myQuery="myQuery"
                                ></MyTable>-->
                                <Table
                                    :columns="columns"
                                    :data="tableMsg"
                                >

                                </Table>
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
    import pageMix from '@/mixins/pageMixin.js'
    export default {
        name: 'ChangeLog',
        mixins: [pageMix],
        data () {
            return {
                searchParams: {
                    sealName: ''
                },
                results: {
                    sealName: '',
                    sealStatus: ''
                },
                columns: [
                    {
                        type: 'index',
                        title: '序号',
                        width: 80
                    },
                    {
                        title: '印章名称',
                        key: 'sealName',
                        minWidth: 150
                    },
                    {
                        title: '状态变更生效时间',
                        key: 'updateTime',
                        minWidth: 200
                    },
                    {
                        title: '变更类型',
                        key: 'typeText',
                        minWidth: 100
                    },
                    {
                        title: '状态',
                        key: 'sealStatusText',
                        minWidth: 100
                    },
                    {
                        title: '变更原因',
                        key: 'updateReasonText',
                        minWidth: 100
                    },
                    {
                        title: '变更说明',
                        key: 'updateDescribe',
                        minWidth: 200
                    },
                    {
                        title: '变更来源',
                        key: 'updateSourceText',
                        minWidth: 100
                    }
                ],
                tableMsg: [
                ],
                // total: 0,
                lookVisible: false,
                sliderVerification: '',
                errorMsg: '查询中',
                maskShow: true
            }
        },
        mounted () {
            if (sessionStorage.getItem('sealLogQuery')) {
                let params = JSON.parse(sessionStorage.getItem('sealLogQuery'))
                this.searchParams.sealName = params.sealName
                this.searchParams.cert = params.cert
                this.myQuery()
            } else {
                this.errorMsg = '请输入印章名称'
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
                        _this.myQuery(_this.pagination)
                    }
                })
            },
            query (evt) {
                if (!this.searchParams.sealName) {
                    this.$Message.error('印章名称不能为空')
                    return
                }
                this.maskShow = false
                this.sliderVerification = this.sliderVerify()
                this.sliderVerification.showLayer()
                evt.stopPropagation()
            },
            myQuery () {
                this.tableMsg = []
                sessionStorage.setItem('sealLogQuery', JSON.stringify({sealName: this.searchParams.sealName, cert: this.searchParams.cert}))
                this.http.post(this.ports.seal.sealChange.historyQuery, this.searchParams, res => {
                    if (!res.success) {
                        this.errorMsg = res.message
                        return
                    }
                    let resp = res.data.results[0]
                    let results = resp.data
                    if (!results || results.length === 0) { // 有印章没记录
                        this.errorMsg = '该印章没有变更记录'
                        return
                    }
                    this.errorMsg = ''
                    this.results.sealName = resp.sealName
                    switch (resp.sealStatus) {
                    case '0' : this.results.sealStatus = '有效'; break
                    case '1' : this.results.sealStatus = '无效'; break
                        /*  case '2': this.results.sealStatus = '冻结'; break;
                    case '3': this.results.sealStatus = '吊销'; break;
                    case '4': this.results.sealStatus = '撤销'; break; */
                    }
                    let _this = this
                    results.forEach(function (e, index) {
                        let value = {}
                        value.sealName = e.sealName
                        value.updateTime = e.updateTime
                        value.type = e.type
                        value.updateReason = e.updateReason
                        value.updateDescribe = e.updateDescribe
                        value.updateSource = e.updateSource
                        switch (e.sealStatus) {
                        case '0' :
                            value.sealStatusText = '有效'
                            break
                        case '1' :
                            value.sealStatusText = '无效'
                            break
                        }
                        switch (e.updateReason) {
                        case '0': value.updateReasonText = '密钥泄露'; break
                        case '1': value.updateReasonText = '信息变更'; break
                        case '2': value.updateReasonText = '业务终止'; break
                        case '3': value.updateReasonText = '印章丢失'; break
                        case '5': value.updateReasonText = '虚假注册'; break
                        case '6': value.updateReasonText = '超范围经营'; break
                        case '7': value.updateReasonText = '无故不开业或停业'; break
                        case '8': value.updateReasonText = '单位逾期不参加年检手续'; break
                        case '10': value.updateReasonText = '印章发布'; break
                        default: value.updateReasonText = '其他'; break
                        }
                        switch (e.updateSource) {
                        case '0': value.updateSourceText = '制作系统'; break
                        case '1': value.updateSourceText = '职能部门文件'; break
                        }
                        switch (e.type) {
                        case '0': value.typeText = '吊销'; break
                        case '1': value.typeText = '冻结'; break
                        case '2': value.typeText = '解冻'; break
                        case '3': value.typeText = '撤销'; break
                        case '4': value.typeText = '挂失'; break
                        case '5': value.typeText = '发布'; break
                        }
                        _this.tableMsg.push(value)
                    })
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
        margin: 0 0 0 24px;
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
        padding: 0 50px 102px;
        text-align: center;
        margin-top: 80px;
    }
    .query-result h3{
        font-size: 18px;
        color: #1C2438;
        letter-spacing: 12.86px;
        line-height: 48px;
        border-bottom:1px solid #E9EAEC;
    }
    .result-title{
        text-align: left;
        font-size: 14px;
        color: #495060;
        margin: 42px 0 16px 0;
    }
    .result-title span{
        margin-right: 40px;
    }
    .error-msg{
        font-size: 18px;
        color: #495060;
        margin-top: 20px;
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
