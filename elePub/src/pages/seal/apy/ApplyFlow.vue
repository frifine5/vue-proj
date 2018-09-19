<template>
    <div class="ver-steps">
        <Steps :current="stepCur" direction="vertical"  >
            <Step v-for="(item, index) in stepSwap" :to="item.path" :key="index" :title="item.sts" :content="item.info">
            </Step>
        </Steps>
    </div>

</template>

<script>

    export default {
        name: 'the-menu',
        data() {
            return {
                stepCur: 0,
                stepSwap: [{
                    sts: '进行中',
                    info: '填写单位信息',
                    url: '',
                }, {
                    sts: '待进行',
                    info: '填写印章信息，上传印章图片',
                    url: '',
                }, {
                    sts: '待进行',
                    info: '预览/确认信息',
                    url: '',
                }, {
                    sts: '待进行',
                    info: '处理结果',
                    url: '',
                }
                ],



            }
        },
        methods: {

            updateStep(index){
                let sl = this.stepSwap.length
                let newSwap = this.stepSwap
                if(index < sl && sl >= 0 ){
                    for (let i = 0; i < sl; i++) {
                        if( i< index){
                            newSwap[i].sts = '已完成'
                        }else if(i === index){
                            newSwap[i].sts = '进行中'
                        }else{
                            newSwap[i].sts = '待进行'
                        }
                    }
                }
                this.stepSwap = newSwap
            },


        },
        created: function(){
          let afThis = this
          this.$root.bus.$on('chgStep', function(index){
              afThis.stepCur = undefined === index? 0 : index
              afThis.updateStep(index)
          })
        },

        watch: {

        }
    }
</script>

<style scoped lang="scss">
    .ver-steps {
        margin-top: 100px;
    }

</style>
