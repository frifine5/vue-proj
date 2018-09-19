<template>
    <MyModal :title="title" :show="formDate.isShow" :width="360" @cancelClick="cancelClick" @okClick="okClick"
             @changeStatus="formDate.isShow=false">
        <Form label-position="right" :label-width="100" inline class="clearfix">
            <FormItem label="印章名称" :required="true">
                <MyInput :inputValue="formDate.sealName" @change="(e, value) => {formDate.sealName=value}"
                         style="width:200px;margin-bottom:0px"></MyInput>
            </FormItem>
            <FormItem label="印章类型" :required="true">
                <MySelect :lableStatus="false" style="width:200px" :dataList="sealTypeArray" placeholder="请选择"
                          :inputValue="formDate.sealType" @change="(e, value) => {formDate.sealType=value}"></MySelect>
            </FormItem>
            <FormItem label="印章编码" :required="true">
                <MyInput :inputValue="formDate.sealCode" @change="(e, value) => {formDate.sealCode=value}"
                         style="width:200px;margin-bottom:0px"></MyInput>
            </FormItem>
            <FormItem label="有效期">
                <MySelect :lableStatus="false" style="width:200px" :dataList="sealAgeArray" placeholder="请选择"
                          :inputValue="formDate.age" @change="(e, value) => {formDate.age=value}"></MySelect>
            </FormItem>
        </Form>
    </MyModal>
</template>
<script>


    export default {
        name: 'SealItem',
        mixins: '',
        data() {
            return {
                inputType: 'text',
                title: '新增印章',
                formDate: {
                    isShow: false,
                    status: 'add',
                    sealName: '',
                    sealCode: '',
                    sealType: '',
                    age: ''
                },
                sealTypeArray: [
                    {
                        value: '1',
                        label: "公章",
                    },
                    {
                        value: '2',
                        label: "个人章",
                    },

                ],
                sealAgeArray: [
                    {
                        value: '1',
                        label: "1年",
                    },
                    {
                        value: '2',
                        label: "2年",
                    },{
                        value: '3',
                        label: "3年",
                    },
                    {
                        value: '5',
                        label: "5年",
                    },
                    {
                        value: '10',
                        label: "10年",
                    },
                ]
            }
        },
        props: {
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

        },
        computed: {},
        watch: {
            ModalMsg: function(){
                this.ModalMsg.status === 'add' ? this.title = '新增印章' : this.title = '编辑印章'
                this.formDate = this.ModalMsg
            }
        },
        methods: {
            cancelClick() {
                this.$emit('ModalClose')
            },
            okClick() {
                // 根据状态判断 modalStatus=add为添加接口  modalStatus=update为更新接口
                if (this.formDate.status === 'add') {
                    if (this.checked()) {
                        this.$emit('ModalChange', this.formDate)
                        // this.$store.state.ApplicationStore.SealTableMsg.push(this.formDate)
                    }
                } else {
                    if (this.checked()) {
                        // this.$set(this.$store.state.ApplicationStore.SealTableMsg, this.formDate.index, this.formDate)
                        this.$emit('ModalChange', this.formDate)
                    }
                }

            },
            checked() {
                let params = {
                    ...this.formDate
                }
                if (params.sealType === '' || params.sealName === '' || params.sealCode === '' || params.age === '') {
                    if (params.sealName === '') {
                        this.$Message.info('印章名称不能为空')
                        return false
                    }
                    if (params.sealType === '') {
                        this.$Message.info('印章类型不能为空')
                        return false
                    }
                    if (params.sealCode === '') {
                        this.$Message.info('印章编码不能为空')
                        return false
                    }
                    if (params.age === '') {
                        this.$Message.info('有效期限不能为空')
                        return false
                    }
                    return false
                } else {
                    /* if (params.ageLimit != '') {
                         if (!/(^[1-9]\d*$)/.test(params.ageLimit)) {
                             this.$Message.info('使用年限必须为正整数')
                             return false
                         }
                     }
                     if (params.ageLimit.length > 2) {
                         this.$Message.info('使用年限不能超过2位数')
                         return false
                     }*/
                    return true
                }
            },
            dataRange(value) {
                this.formDate.age = value
            },


        }
    }
</script>

<style scoped>
    .bw-page {
        margin-top: 20px;
        float: right;
    }

</style>
