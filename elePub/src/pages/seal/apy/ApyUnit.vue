<template>

    <div>
        <h1 class="set-font-style1">单位信息</h1>
        <table class="set-table1" cellpadding="0" cellspacing="0 ">
            <tr>
                <td width="15%">
                    *单位名称
                </td>
                <td width="30%">
                    <MyInput :inputValue="useUnit.entname" placeholder="请输入单位名称"
                             @change=" (e,value) => {useUnit.entname=value}"></MyInput>
                </td>
                <td width="15%">
                    *统一社会信用代码
                </td>
                <td width="30%">
                    <MyInput :inputValue="useUnit.uniscid" placeholder="请输入统一社会信用代码"
                             @change=" (e,value) => {useUnit.uniscid=value}"></MyInput>
                </td>
            </tr>
            <tr>
                <td width="15%">
                    *法定代表人
                </td>
                <td width="30%">
                    <MyInput :inputValue="useUnit.lgname" placeholder="请输入法定代表人"
                             @change=" (e,value) => {useUnit.lgname=value}"></MyInput>
                </td>
                <td width="15%">
                    *经营范围
                </td>
                <td width="30%">
                    <MyInput :inputValue="useUnit.opscope" placeholder="请输入经营范围"
                             @change=" (e,value) => {useUnit.opscope=value}"></MyInput>
                </td>
            </tr>
            <tr>
                <td width="15%">
                    *单位/公司详细地址
                </td>
                <td colspan="3">
                    <MyInput :inputValue="useUnit.address" placeholder="请输入单位/公司详细地址"
                             @change=" (e,value) => {useUnit.address=value}"></MyInput>
                </td>
            </tr>
            <tr>
                <td width="15%">
                    *成立日期
                </td>
                <td width="30%">
                    <DatePicker :value="useUnit.estdate" :editable="dateEditable" type="date" format="yyyy-MM-dd"
                                style="width: 100%"
                                @on-change="(value) => {useUnit.estdate=value}"></DatePicker>
                </td>
                <td width="15%">
                    *核准日期
                </td>
                <td width="30%">
                    <DatePicker :value="useUnit.apprdate" :editable="dateEditable" type="date" format="yyyy-MM-dd"
                                style="width: 100%"
                                @on-change="(value) => {useUnit.apprdate=value}"></DatePicker>
                </td>
            </tr>
            <tr>
                <td width="15%">
                    单位电话
                </td>
                <td colspan="3">
                    <MyInput :inputValue="useUnit.entel" placeholder="请输入单位电话"
                             @change=" (e,value) => {useUnit.entel=value}"></MyInput>
                </td>
            </tr>
            <tr>
                <td width="15%">
                    *经营期限
                </td>
                <td colspan="3">
                    自
                    <DatePicker :value="useUnit.opfrom" :editable="dateEditable" type="date" format="yyyy-MM-dd"
                                style="width: 35%; padding-right: 10px;" @on-change="(value) => {useUnit.opfrom=value}"></DatePicker>
                    至
                    <DatePicker :value="useUnit.opto" :editable="dateEditable" type="date" format="yyyy-MM-dd"
                                style="width: 35%" @on-change="(value) => {useUnit.opto=value}"></DatePicker>
                </td>
            </tr>


        </table>
        <div class="btn-tops">
            <MyButton type="second" v-on:click="reset">重置</MyButton>
            <MyButton type="second" v-on:click="j2seals">下一步</MyButton>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'ApplyUnit',
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
                useUnit: {
                    entname: '',//企业名称
                    uniscid: '',//统一社会信用代码
                    lgname: '',//法定代表人
                    opscope: '',//经营范围
                    estdate: '',//成立日期
                    apprdate: '',//核准日期
                    address: '',//单位详细地址
                    opfrom: '',//经营日期起
                    opto: '',//经营日期止
                    entel: '',//企业电话
                },
                sealList: [],
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
            // 跳转到步骤 ‘添加印章信息’
            j2seals() {
                // add logic

                // chg step
                this.$root.bus.$emit('chgStep', 1)
                // router push
                this.$router.push({
                    name: 'apySeals',
                    query: {
                        useUnit: this.useUnit,
                        sealList: this.sealList,
                    }
                })

            },
            reset() {
                this.useUnit = {
                    entname: '',//企业名称
                    uniscid: '',//统一社会信用代码
                    lgname: '',//法定代表人
                    opscope: '',//经营范围
                    estdate: '',//成立日期
                    apprdate: '',//核准日期
                    address: '',//单位详细地址
                    opfrom: '',//经营日期起
                    opto: '',//经营日期止
                    entel: '',//企业电话
                }
            }

        },
        computed: {

        },
        created: function() {
            this.useUnit = undefined === this.$route.query.useUnit ?  this.useUnit : this.$route.query.useUnit
            this.sealList = undefined === this.$route.query.sealList ?  this.sealList : this.$route.query.sealList
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
