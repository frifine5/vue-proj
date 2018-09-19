<template>
    <div class="main-bd">
        <the-header></the-header>
        <router-view></router-view>
    </div>
</template>

<script>
    import TheHeader from '@/components/TheHeader.vue'
    export default {
        name: 'synergy',
        data () {
            return {
            }
        },
        components: {
            TheHeader
        }
    }
</script>

<style>
    .main-bd{
        width: 100%;
        margin: 0 auto;
        height: calc(100% - 70px);
    }
</style>
