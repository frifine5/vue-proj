<template>

    <div>
        <h1 class="set-font-style1">证书申请单</h1>
        <table class="set-table1" cellpadding="0" cellspacing="0 ">
            <tr>
                <td width="15%">

                </td>
                <td width="30%">
                    证书名称<br/><small><small><small>（如不填，将以统一社会信用代码+单位名称组合作为证书名称）</small></small></small>
                </td>
                <td colspan="2">
                    <MyInput :inputValue="caReq.certName" placeholder="请输入证书名称"
                             @change=" (e,value) => {caReq.certName=value}"></MyInput>
                </td>
            </tr>
            <tr>
                <td width="15%">
                    *单位/机构名称
                </td>
                <td width="30%">
                    <MyInput :inputValue="caReq.entName" placeholder="请输入申请单位/机构名称"
                             @change=" (e,value) => {caReq.entName=value}"></MyInput>
                </td>
                <td width="15%">
                    *<small>统一社会信用代码</small>
                </td>
                <td width="30%">
                    <MyInput :inputValue="caReq.uniSocCode" placeholder="请输入统一社会信用代码"
                             @change=" (e,value) => {caReq.uniSocCode=value}"></MyInput>
                </td>
            </tr>
            <tr>
                <td width="15%">
                    *地区
                </td>
                <td width="30%">
                    <MyInput :inputValue="caReq.province" placeholder="请输入省（直辖市）"
                             @change=" (e,value) => {caReq.province=value}"></MyInput>
                    <MyInput :inputValue="caReq.city" placeholder="请输入市"
                             @change=" (e,value) => {caReq.city=value}"></MyInput>
                    <MyInput :inputValue="caReq.county" placeholder="请输入区（县）"
                             @change=" (e,value) => {caReq.county=value}"></MyInput>
                </td>
                <td width="15%" >
                    *<small>有效期(年限和结束时间二选一，两项都填则以结束时间为准)</small>
                </td>
                <td width="30%">
                    <MyInput :inputValue="caReq.validAge" placeholder="请输入有效年期"
                             @change=" (e,value) => {caReq.validAge=value}"></MyInput>
                    <br/>
                    <DatePicker :value="caReq.validEnd" :editable="dateEditable" type="date" format="yyyy-MM-dd"
                                style="width:85%" @on-change="(value) => {caReq.validEnd=value}"></DatePicker>
                </td>
            </tr>
            <tr>
                <td width="15%">
                    *<small>单位/公司详细地址</small>
                </td>
                <td colspan="3">
                    <MyInput :inputValue="caReq.address" placeholder="请输入单位/公司详细地址"
                             @change=" (e,value) => {caReq.address=value}"></MyInput>
                </td>
            </tr>

            <tr>
                <td width="15%">
                    联系电话
                </td>
                <td colspan="3">
                    <MyInput :inputValue="caReq.telephone" placeholder="请输入联系电话"
                             @change=" (e,value) => {caReq.telephone=value}"></MyInput>
                </td>
            </tr>




        </table>
        <div class="btn-tops">
            <MyButton type="second" v-on:click="reset">重置</MyButton>
            <MyButton type="second" v-on:click="j2pv">下一步</MyButton>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'caApplyUnit',
        props: {

            ModalParams: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        data() {
            return {
                caReq: {
                    entName: '',        // 企业/机构名称
                    uniSocCode: '',        // 统一社会信用代码
                    certName: '',       // 证书名称
                    province: '',       // 省
                    city: '',           // 市
                    county: '',         // 县
                    address: '',        // 详细地址
                    telephone: '',      // 联系电话
                    validEnd: '',       // 有效期止
                    validAge: '',       // 有效期（年）
                },
                sliderVerification: '',
                dateEditable: false,
            }
        },
        methods: {

            getNowFormatDate() {
                var date = new Date()
                var seperator1 = '-'
                var month = date.getMonth() + 1
                var strDate = date.getDate()
                if (month >= 1 && month <= 9) {
                    month = '0' + month
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = '0' + strDate
                }
                var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                return currentdate
            },
            // 跳转到步骤 ‘检查和预览’
            j2pv() {
                let flag = this.paramCheck()
                if(!flag){// add logic check
                    return
                }else{
                    // chg step
                    this.$root.bus.$emit('chgStep', 1)
                    console.log(this.caReq)

                    // router push
                    this.$router.push({
                        name: 'caApyView',
                        query: {
                            caReq: this.caReq,
                        }
                    })
                }

            },
            paramCheck(){
                let params = this.caReq
                if(null === params.entName || "" === params.entName){
                    return this.checkMsg('单位名称不能为空')
                }
                if(null === params.uniSocCode || "" === params.uniSocCode){
                    return this.checkMsg('统一社会信用代码不能为空')
                }else if(params.uniSocCode.length !== 18){
                    return this.checkMsg('统一社会信用代码格式错误')
                }
                if(null === params.address || "" === params.address){
                    return this.checkMsg('详细地址不能为空')
                }
                if("" === params.validEnd && ""===params.validAge){
                    return this.checkMsg('有效期不能为空')
                }
                if("" === params.province|| "" === params.city || "" === params.county){
                    return this.checkMsg('省市区县不能为空')
                }else if(params.province.length >6 ||params.city.length >6 ||params.county.length >6 ){
                    return this.checkMsg('省市区县代码错误')
                }
                return true
            },
            checkMsg(msg){
                this.$Modal.warning({
                    title: '提示框',
                    content: msg,
                    closable: true
                })
                return false
            },
            reset() {
                this.caReq ={
                        entName: '',        // 企业/机构名称
                        uniSocCode: '',        // 统一社会信用代码
                        certName: '',       // 证书名称
                        province: '',       // 省
                        city: '',           // 市
                        county: '',         // 县
                        address: '',        // 详细地址
                        telephone: '',      // 联系电话
                        validEnd: '',       // 有效期止
                        validAge: '',       // 有效期（年）
                }
            },
        },


        computed: {

        },
        created: function() {
            this.caReq = undefined === this.$route.query.caReq ?  this.caReq : this.$route.query.caReq
        },
        watch: {

        },
    }
</script>

<style scoped>
    .set-font-style1 {
        font-size: 14px;
        color: #1C2438;
        text-align: center;
    }


    .set-font-style2 span {
        margin-right: 5px;
    }

    .set-table1 {
        border: 2px solid #DDDEE1;
        width: 100%;
        margin: 10px auto
    }

    .set-table1 td {
        padding: 5px 5px;
        border-right: 1px solid #dddee1;
        border-bottom: 1px solid #dddee1;
    }


    .btn-tops {
        width: 100%;
        margin: 0 auto;
        text-align: right;
    }

    .table-bottom td {
        border-bottom: none;
    }




</style>
