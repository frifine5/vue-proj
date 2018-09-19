<template>
    <div class="wrap wraper-box">
        <div class="maskBox" :class="{hidden:maskShow}" @click="maskShow=true"></div>
        <div class="center-width">
            <div class="seal-query-wrap">
                <h2>印章状态查询</h2>
                <Form :model="searchParams"  onsubmit="return false">
                    <FormItem>
                        <p>印章名称</p>
                        <MyInput :inputValue="searchParams.sealName" placeholder="请输入印章名称" @change="(e, value) => {searchParams.sealName=value}"></MyInput>
                    </FormItem>
                    <FormItem>
                        <p>盖章时间</p>
                        <DatePicker :value="searchParams.queryTime" :editable="dateEditable" type="datetime" format="yyyy-MM-dd HH:mm:ss" style="width: 500px" placeholder="请选择盖章时间" @on-change="(value) => {searchParams.queryTime=value}"></DatePicker>
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
        name: 'SealQuery',
        data () {
            return {
                searchParams: {
                    sealName: '',
                    queryTime: '',
                    cert: ''
                },
                sliderVerification: '',
                maskShow: true,
                dateEditable: false
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
                        let obj = {
                            sealName: _this.searchParams.sealName,
                            queryTime: _this.searchParams.queryTime,
                            cert: _this.searchParams.cert
                        }
                        sessionStorage.setItem('sealStatusQuery', JSON.stringify(obj))
                        _this.$router.push({path: '/seal/query/status'})
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
                } else if (!this.searchParams.queryTime) {
                    this.$Modal.warning({
                        title: '提示框',
                        content: '盖章时间不能为空',
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

<style scoped lang="scss">
    .inputground {
        width: 100%;
        margin: 0;
        height: 40px;
    }
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
       width: 100%;
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
  .wrap .inputground {
      width: 100%;
      margin: 0;
  }
</style>
