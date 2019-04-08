<template>
    <div class="selectground">
        <span class="select-name" v-if="inputLabel">{{inputLabel}}</span>
        <div class="select-input">
            <Select class="ivu-select" v-model="currentValue" :label-in-value="labelInValue" :disabled="disabledX"
                    :placeholder="placeholder" @on-change="handleChange">
                <Option v-for="(item,index) in dataList" :value="item.value" :key="index">{{item.label}}</Option>
            </Select>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'label-select',
        props: {
            inputLabel: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            },
            inputValue: {
                type: [String, Number],
                default: ''
            },
            placeholder: {
                type: String,
                default: ''
            },
            dataList: {
                type: Array,
                default: () => {
                    return []
                }
            },
            labelInValue: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                currentValue: this.inputValue,
                disabledX: this.disabled
            }
        },
        watch: {
            dataList: {
                handler: function (data) {
                    this.disabledX = data.length === 0
                },
                immediate: true
            }
        },
        methods: {
            handleChange: function (event) {
                this.$emit('change', event, this.currentValue)
            }
        }
    }
</script>

<style lang="scss">

</style>
