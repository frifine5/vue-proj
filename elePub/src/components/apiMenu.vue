<template>
    <div>
        <Menu class="es-menu" :theme="theme2"  @on-select='select' :style='menuStyle'
              :active-name='active'>
            <MenuItem v-for='item in list' :key='item.url' :name='item.url'><b></b>{{item.name}} </MenuItem>
        </Menu>
    </div>
</template>

<script>
    export default {
        name: 'api-menu',
        data () {
            return {
                theme2: 'light',
                active: '/apis/api1',
                menuStyle: {
                    width: '220px',
                    backgroundColor: '#F8F8F9'
                },
                list: [
                    {
                        name: '演示1',
                        url: '/apis/api1'
                    },
                    {
                        name: '演示2',
                        url: '/apis/api2'
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
                this.active = stingStrHash === '/apis' ? '/apis/api1' : stingStrHash
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
