<template>
    <div class="wraper-box">
        <div class="maskBox" :class="{hidden:maskShow}" @click="maskShow=true"></div>
        <div class="center-width">
            <div class="seal-query-wrap">
                <h2>电子印章变更记录查询</h2>
                <Form :model="searchParams"  onsubmit="return false">
                    <FormItem>
                        <p>印章名称</p>
                        <MyInput :inputValue="searchParams.sealName" placeholder="请输入印章名称" @change="(e, value) => {searchParams.sealName=value}"></MyInput>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" class="btn" @click="query">查询</Button>
                    </FormItem>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ChangeQuery',
        data () {
            return {
                searchParams: {
                    sealName: '',
                    cert: ''
                },
                sliderVerification: '',
                maskShow: true
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
                        sessionStorage.setItem('sealLogQuery', JSON.stringify({sealName: _this.searchParams.sealName, cert: _this.searchParams.cert}))
                        _this.$router.push({path: '/change/query/log'})
                    }
                })
            },
            query (evt) {
                if (!this.searchParams.sealName.trim()) {
                    this.$Modal.warning({
                        title: '提示框',
                        content: '印章名称不能为空',
                        closable: true
                    })
                    return
                }
                this.maskShow = false
                this.sliderVerification = this.sliderVerify()
                this.sliderVerification.showLayer()
                evt.stopPropagation()
            }
        }
    }
</script>

<style scoped>
    .seal-query-wrap{
        width: 500px;
        margin: 80px auto 0;
    }
    h2 {
        font-size: 32px;
        color: #1C2438;
        text-align: center;
        margin-bottom: 40px;
    }
    .btn{
        width: 100%;
        height: 40px;
        color: #FFFFFF;
        background: #004098;
        font-size: 20px;
        text-align: center;
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
    }
    .ivu-form-item-content > p{
        font-size: 14px;
        color: #495060;
        line-height: 20px;
        margin-bottom: 8px;
    }
    .ivu-form-item{
        margin-bottom: 40px;
    }
    .ivu-icon{
        line-height: 40px;
        right: 10px;
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
    .ivu-modal-body{
        padding: 12px;
    }
</style>
