<template>
    <div>
        <Menu class="es-menu" :theme='theme2' :open-names='opened' accordion @on-select='select' :style='menuStyle'
              :active-name='active'>
            <Submenu v-for='items in list' :key='items.url' :name='items.url'>
                <template slot='title'>
                    <MyIcon :type="items.icon"></MyIcon>
                    {{items.name}}
                </template>
                <MenuItem v-for='item in items.children' :key='item.url' :name='item.url'><b></b>{{item.name}} </MenuItem>
            </Submenu>
        </Menu>
    </div>
</template>

<script>
    export default {
        name: 'Menu',
        props: {
            menuList: {
                type: Array,
                default: () => {
                    return []
                }
            },
            menuStyle: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        }
    }
</script>

<style scoped>

</style>
