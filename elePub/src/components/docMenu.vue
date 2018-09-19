<template>
    <div>
        <h3>文档中心</h3>
        <Menu class="es-menu" :theme="theme2"  @on-select='select' :style='menuStyle'
              :active-name='active'>
            <MenuItem v-for='item in list' :key='item.url' :name='item.url'><b></b>{{item.name}} </MenuItem>
        </Menu>
    </div>
</template>

<script>
    export default {
        name: 'docMenu',
        data () {
            return {
                theme2: 'light',
                active: '/docs/newGuide',
                menuStyle: {
                    width: '220px',
                    backgroundColor: 'transparent'
                },
                list: [
                    {
                        name: '新手指引',
                        url: '/docs/newGuide'
                    },
                    {
                        name: '接前文档',
                        url: '/docs/accessDoc'
                    }
                ]
            }
        },
        mounted () {
            this.getActive()
        },
        methods: {
            select (name) {
                this.$router.push({path: name})
            },
            getActive () {
                let hash = location.hash
                let stingStrHash = hash.substring(1)
                this.active = stingStrHash === '/docs' ? '/docs/newGuide' : stingStrHash
            }
        },
        watch: {
            $route () {
                this.getActive()
            }
        }
    }
</script>

<style scoped lang="scss">
    h3{
        margin: 40px 0 60px;
        font-size: 30px;
        color: #1c2438;
    }
    .ivu-menu{
        border-right: none;
    }
    .ivu-menu-item {
        color: $auxiliary;
        padding-left: 30px !important;
    }
    .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu){
        color: #004098;
        border-right: none;
        background-color: transparent;
    }
    .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) b{
        background: #004098;
    }
    .ivu-menu-light.ivu-menu-vertical .ivu-menu-submenu-title{
        padding: 14px 30px !important;
    }
    .ivu-menu-item b{
        display: inline-block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        margin-right:18px;
        vertical-align: middle;
        background-color: #9ea7b4;
    }
    .ivu-menu-vertical.ivu-menu-light:after{
        display: none;
    }
</style>
