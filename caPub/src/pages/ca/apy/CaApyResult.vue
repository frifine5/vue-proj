<template>
    <div>
        <h1 class="set-font-style1">申请信息上传结果</h1>
        <div>
            <table class="set-table1 align_center">
                <tr>
                    <td width="80%">
                        {{apyResult.message}}<br/>
                        申请编号:{{apyResult.data}}

                    </td>
                </tr>

            </table>
        </div>
        <div class="btn-tops">
            <MyButton type="second" v-on:click="b2pres">返回申请页</MyButton>
        </div>

    </div>
</template>
<script>
    export default {
        name: 'caApyViewResult',
        props: {},
        data() {
            return {
                apyResult:{
                    code: '',
                    message: '',
                    data:{},
                }

            }
        },
        methods: {
            b2pres() {
                // add logic
                // chg step
                this.$root.bus.$emit('chgStep', 0)
                // router push
                this.$router.push({
                    name: 'caApyUnit',

                })
            },




        },
        created: function(){
            this.apyResult = undefined === this.$route.query.apyResult ?  this.apyResult : this.$route.query.apyResult
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
        width: 80%;
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
