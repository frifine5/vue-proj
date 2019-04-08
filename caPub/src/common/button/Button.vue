<template>
    <Button :disabled="disabled" :size="size" class="bw-btn" :loading="loading" :class='[addClass,addMargin]' :btnInput="btnInput"
            @click="handleClick">
        <Icon :type='icon' :interval='interval'></Icon>
        <span><slot></slot></span>
    </Button>
</template>

<script>
    import Icon from '../icon/icon'

    export default {
        name: 'my-button',
        props: ['type', 'icon', 'disabled', 'interval', 'margin', 'loading', 'size', 'btnInput'],
        data () {
            return {
                show: true

            }
        },
        components: {
            Icon
        },
        computed: {
            addClass: function () {
                return {
                    'bw-btn-first': this.type === 'first',
                    'bw-btn-second': this.type === 'second',
                    'bw-btn-third': this.type === 'third',
                    'error': this.type === 'error',
                    'small error': this.type === 's-error',
                    'bw-btn-first small': this.type === 's-first',
                    'bw-btn-second small': this.type === 's-second',
                    'bw-btn-third small': this.type === 's-third',
                    'small error-table': this.type === 'error-table'
                }
            },
            addMargin: function () {
                return {
                    'margin': this.margin === 'margin'
                }
            }
        },
        methods: {
            handleClick (event) {
                this.$emit('click', event)
            }
        }
    }
</script>

<style lang="scss">

    .bw-btn {
        display: inline-block;
        font-weight: 400;
        text-align: center;
        vertical-align: middle;
        touch-action: manipulation;
        cursor: pointer;
        white-space: nowrap;
        line-height: 1.5;
        user-select: none;
        padding: 0px 16px;
        height: 30px;
        font-size: 12px;
        border-radius: 4px;
        outline: none;
        transition: color .2s linear, background-color .2s linear, border .2s linear;
        margin: 10px 10px 5px 0;
    }

    .bw-btn span {
        font-size: 12px;
    }

    .bw-btn {
        background: #0079cc;
        color: #fff;
        border: 1px solid #0079cc;
    }

    .bw-btn:visited {
        background: #0079cc;
        color: #fff;
        border: 1px solid #0079cc;
    }

    .bw-btn:hover {
        background: #52b7fc;
        border: 1px solid #52b7fc;
    }

    .bw-btn:active {
        background: #00558f;
        border: 1px solid #00558f;
    }

    .bw-btn:disabled {
        background: #e8e8e8;
        border: 1px solid #e8e8e8;
        cursor: not-allowed
    }

    .bw-btn-first {
        background: #0079cc;
        color: #fff;
        border: 1px solid #0079cc;
    }

    .bw-btn-first:visited {
        background: #0079cc;
        color: #fff;
        border: 1px solid #0079cc;
    }

    .bw-btn-first:hover {
        background: #52b7fc;
        border: 1px solid #52b7fc;
    }

    .bw-btn-first:active {
        background: #00558f;
        border: 1px solid #00558f;
    }

    .bw-btn-first:disabled {
        background: #e8e8e8;
        border: 1px solid #e8e8e8;
        cursor: not-allowed
    }

    .bw-btn-second {
        background: #fff;
        color: #0079cc;
        border: 1px solid #0079cc;
    }

    .bw-btn-second:visited {
        background: #fff;
        color: #0079cc;
        border: 1px solid #0079cc;
    }

    .bw-btn-second:hover {
        background: #fff;
        color: #52b7fc;
        border: 1px solid #52b7fc;
    }

    .bw-btn-second:active {
        background: #fff;
        color: #00558f;
        border: 1px solid #00558f;
    }

    .bw-btn-second:disabled {
        background: #fff;
        color: #ccc;
        border: 1px solid #e8e8e8;
        cursor: not-allowed
    }

    .bw-btn-third {
        background: #fff;
        color: #495060;
        border: 1px solid #dddee1;
    }

    .bw-btn-third:visited {
        background: #fff;
        color: #495060;
        border: 1px solid #dddee1;
    }

    .bw-btn-third:hover {
        background: #fff;
        color: #52b7fc;
        border: 1px solid #52b7fc;
    }

    .bw-btn-third:active {
        background: #fff;
        color: #1c2438;
        border: 1px solid #9ea7b4;
    }

    .bw-btn-third:disabled {
        background: #fff;
        color: #ccc;
        border: 1px solid #e8e8e8;
        cursor: not-allowed
    }

    .error-table {
        background: #ff5722;
        color: #fff;
        border: 1px solid #ff5722;
    }

    .error-table:visited {
        background: #ff5722;
        color: #fff;
        border: 1px solid #ff5722;
    }

    .error-table:hover {
        background: #dd5722;
        color: #fff;
        border: 1px solid #dd5722;
    }

    .error-table:active {
        background: #dd5722;
        color: #fff;
        border: 1px solid #dd5722;
    }

    .small {
        height: 22px;
        padding: 0 6px;
    }

    .margin {
        margin-right: 10px;
    }

    .error {
        background: $error;
        border: 1px solid $error;
        &:hover {
            background: $error;
            border: 1px solid $error;
        }
        &:focus {
            background: $error;
            border: 1px solid $error !important;
        }
    }

    .icon {
        display: inline-block;
        font-family: Ionicons;
        speak: none;
        font-style: normal;
        font-weight: 400;
        font-variant: normal;
        text-transform: none;
        text-rendering: auto;
        line-height: 1;
        -webkit-font-smoothing: antialiased;
        cursor: pointer;
    }

    .iconfont {
        font-size: 14px;
    }

</style>
