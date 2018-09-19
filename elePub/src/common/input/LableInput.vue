<template>
    <div class="inputground">
        <Input v-model="currentValue" :type="inputType" :placeholder="placeholder" :disabled="disabled" :maxlength="maxLength"
               @on-input-change="handleChange" @on-change="handleChange" @on-focus="handleFocus" @on-blur="handleBlur" @on-keyup="handleKeyup">
        <span slot="prepend" v-if="inputLabel">{{inputLabel}}</span>
        </Input>
    </div>
</template>

<script>
    export default {
        name: 'label-input',
        props: {
            inputType: {
                type: String,
                default: 'text'
            },
            inputLabel: {
                type: String,
                default: ''
            },
            inputValue: {
                type: [String, Number],
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            },
            placeholder: {
                type: String,
                default: ''
            },
            maxLength: {
                type: Number
            }
        },
        data () {
            return {
                currentValue: this.inputValue
            }
        },
        watch: {
            inputValue: function () {
                this.currentValue = this.inputValue
            }
        },
        methods: {
            handleChange: function (event) {
                this.$emit('change', event, this.currentValue)
            },
            handleFocus: function (event) {
                this.$emit('focus', event)
            },
            handleBlur: function (event) {
                this.$emit('blur', event)
            },
            handleKeyup: function (event) {
                let sUserAgent = navigator.userAgent
                // 判断是textarea、win8的ie
                if (this.inputType !== 'textarea') {
                    return
                }
                if (!!window.ActiveXObject || 'ActiveXObject' in window) {
                    this.currentValue = event.target.innerText
                    this.$emit('change', event, this.currentValue)
                }
            }
        }
    }
</script>

<style lang="scss">
    .ivu-input{
        height: 40px;
    }
</style>
