<template>
    <div>
        <Modal
            ref="BWModal"
            v-model="currentStatus"
            :title="title"
            :loading="loading"
            :width="width"
            :class-name="className"
            @on-visible-change="changeStatus"
        >
            <div><slot></slot></div>
            <div slot="footer">
                <MyButton  type="third"  @click="cancel">取消</MyButton>
                <MyButton  type="large"   @click="ensure">确定</MyButton>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: 'modal',
        props: {
            show: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: ''
            },
            loading: {
                type: Boolean,
                default: false
            },
            width: {
                type: Number,
                default: 360
            },
            className: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                currentStatus: false
            }
        },
        watch: {
            show: {
                handler: function (data) {
                    this.currentStatus = data
                },
                immediate: true
            }
        },
        methods: {
            ensure (params) {
                this.$emit('okClick', params)
            },
            cancel (params) {
                this.$emit('cancelClick')
            },
            changeStatus (params) {
                if (!params) {
                    this.$emit('changeStatus')
                }
            }
        }
    }
</script>

<style>

</style>
