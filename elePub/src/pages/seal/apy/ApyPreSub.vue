<template>
    <div>
        <h1 class="set-font-style1">预览信息</h1>
        <div>
            <table class="set-table1">
                <tr>
                    <td rowspan="5"   width="5%">
                        <span style="font-weight: 900; font-size: 18px; text-align: center">单位信息</span>
                    </td>
                    <td width="40%">
                        <span>单位名称:</span>{{useUnit.entname}}
                    </td>
                    <td width="50%">
                        <span>统一社会信用代码:</span>{{useUnit.uniscid}}
                    </td>
                </tr>
                <tr>
                    <td width="40%">
                        <span>法定代表人:</span>{{useUnit.lgname}}
                    </td>
                    <td width="50%">
                        <span>经营范围:</span>{{useUnit.opscope}}
                    </td>

                </tr>
                <tr>
                    <td width="90%" colspan="2">
                        <span>单位地址:</span>{{useUnit.address}}
                    </td>

                </tr>
                <tr>
                    <td width="45%">
                        <span>成立日期:</span>{{useUnit.estdate}}
                    </td>
                    <td width="45%">
                        <span>核准日期:</span>{{useUnit.apprdate}}
                    </td>

                </tr>
                <tr>
                    <td width="45%">
                        <span>单位电话:</span>{{useUnit.entel}}
                    </td>
                    <td width="45%">
                        <span>经营期限:</span>{{useUnit.opfrom}} -- {{useUnit.opto}}
                    </td>
                </tr>
                <tr>
                    <td  width="5%">
                        <span style="font-weight: 900; font-size: 18px; text-align: center">印章信息</span>
                    </td>
                    <td colspan="2" width="90%">
                        <Table  width="100%"
                                :border="true"
                                :showHeader="true"
                                :columns="sealColumn"
                                :data="sealList">
                        </Table>
                    </td>
                </tr>


            </table>
        </div>
        <div class="btn-tops">
            <MyButton type="second" v-on:click="b2pres">回退</MyButton>
            <MyButton type="second" v-on:click="commitSeals">提交</MyButton>
        </div>

    </div>
</template>
<script>
    export default {
        name: 'ApplyPreSub',
        props: {},
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
                sealColumn: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 60,
                    },
                    {
                        title: '印章名称',
                        key: 'sealName',
                        width: 200,
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.sealName)
                            ]);
                        }
                    },
                    {
                        title: '印章编号',
                        key: 'sealCode',
                        width: 220,
                    },
                    {
                        title: '类型',
                        key: 'sealType',
                        width: 100,
                    },
                    {
                        title: '年限',
                        key: 'age',
                        width: 100,
                    },
                ],
            }
        },
        methods: {
            b2pres() {
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
            commitSeals() {
                console.log('----提交信息----')
               /* let params = this.ModalParams
                params.applyNum = this.applyNum
                console.log('params::', params)
                this.http.post(this.ports.Sealapplication.addSealApply, params, res => {
                    if (res.code === 0) {
                        this.$router.push({path: '/PrintMake', query: {applyNum: params.applyNum}})
                    }
                })*/
            },
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
            }
        },
        created: function(){
            this.useUnit = undefined === this.$route.query.useUnit ?  this.useUnit : this.$route.query.useUnit
            this.sealList = undefined === this.$route.query.sealList ?  this.sealList : this.$route.query.sealList
        },
        computed: {},
        watch: {}
    }
</script>

<style scoped>
    .set-font-style1 {
        font-size: 14px;
        color: #1C2438;
        text-align: center;
    }


    .set-table1 {
        border: 2px solid #DDDEE1;
        width: 100%;
        margin: 10px auto;
    }

    .set-table1 td {
        padding: 5px 10px;
        border-right: 1px solid #dddee1;
        border-bottom: 1px solid #dddee1;
        font-size: 12px;
        color: #555522;
    }
    .set-table1 span {
        padding: 5px 0px;
        margin-right: 10px;
        font-size: 14px;
        color: #2b85e4;
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
