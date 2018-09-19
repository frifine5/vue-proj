<template>
    <div>
        <h1 class="set-font-style1">印章信息</h1>
        <div class="add-form left">
            <MyButton @click="addSeal">新增印章</MyButton>
        </div>
        <div class="" >
            <Table
                width="100%"
                :border="true"
                :showHeader="true"
                :columns="sealColumn"
                :data="sealList"
            ></Table>
        </div>
        <div class="btn-tops">
            <MyButton type="second" v-on:click="b2uint">回退</MyButton>
            <MyButton type="second" v-on:click="j2pres">下一步</MyButton>
        </div>
        <seal-item :ModalMsg="ModalMsg" @ModalClose="ModalMsg.isShow=false"
                   @ModalChange="ModalChange"></seal-item>
    </div>
</template>
<script>
    import SealItem from './SealItem'
    export default {
        name: 'ApySeals',
        components: {SealItem},
        component: {
            SealItem
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
                ModalMsg: {
                    type: Object,
                    default() {
                        return {
                            isShow: false,
                            status: 'add',
                            sealName: '',
                            sealCode: '',
                            sealType: '',
                            age: ''
                        }
                    }
                },
                sealColumn: [
                    {
                        title: '印章名称',
                        key: 'sealName',
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
                        key: 'sealCode'
                    },
                    {
                        title: '类型',
                        key: 'sealType'
                    },
                    {
                        title: '年限',
                        key: 'age'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [

                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '图片'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                sealList: [],

            }


        },
        methods: {
            b2uint() {
                // add logic

                // chg step
                this.$root.bus.$emit('chgStep', 0)
                // router push
                this.$router.push({
                    name: 'apyUnit',
                    query: {
                        useUnit: this.useUnit,
                        sealList: this.sealList,
                    }
                })
            },
            j2pres() {
                // add logic

                // chg step
                this.$root.bus.$emit('chgStep', 2)
                // router push
                this.$router.push({
                    name: 'apyPreSub',
                    query: {
                        useUnit: this.useUnit,
                        sealList: this.sealList,
                    }
                })
            },

            // 显示记录信息
            show(index) {
                this.$Modal.info({
                    title: 'Seal Image',
                    content: (undefined=== this.sealList[index].pic || "" === this.sealList[index].pic)? '未传图片' : this.sealList[index].pic
                })
            },

            // 删除
            remove(index) {
                this.sealList.splice(index, 1);
            },

            addSeal () {
                console.log('before add: ModalMsg=' + JSON.stringify(this.ModalMsg))
                this.ModalMsgRchange('add')
                console.log('after show model add: ModalMsg=' + JSON.stringify(this.ModalMsg))
            },

            ModalChange (data) {
                console.log('data:' + JSON.stringify(data))
                if (data.status === 'add') {
                    let target = this.sealList
                    target.push(data)
                    this.sealList = target
                } else {
                    this.$set(this.sealList, data.index, data)
                }
                this.ModalMsg.isShow = false
                // 发送请求刷新页面
            },
            ModalMsgRchange (status) {
                this.ModalMsg = {
                    isShow: true,
                    status: status, // 状态标志
                    sealName: '',
                    sealCode: '',
                    sealType: '',
                    age: '',
                }
            },

        },
        computed: {

        },
        created: function(){
            this.useUnit = undefined === this.$route.query.useUnit ?  this.useUnit : this.$route.query.useUnit
            this.sealList = undefined === this.$route.query.sealList ?  this.sealList : this.$route.query.sealList
        },

        watch: {},
    }
</script>

<style scoped>
    .set-font-style1 {
        font-size: 14px;
        color: #1C2438;
        text-align: center;
    }



    .set-font-style2 span {
        margin-right: 10px;
    }


    .set-table1 td {
        padding: 5px 10px;
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
