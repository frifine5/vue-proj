<template>
    <div id="app" class="myapp">
        <router-view/>
    </div>
</template>

<script>
    import TheHeader from '@/components/TheHeader.vue'

    export default {
        name: 'App',
        components: {
            TheHeader
        },
        mounted () {
            if (!!window.ActiveXObject || 'ActiveXObject' in window) {
                window.addEventListener('hashchange', () => {
                    let currentPath = window.location.hash.slice(1)
                    if (this.$route.path !== currentPath) {
                        this.$router.push(currentPath)
                    }
                }, false)
            }
        }
    }
</script>

<style lang="scss">
    body.modal{
        background: transparent !important;
    }
    .Trigger_slider{
        z-index: 900;
    }
    .myapp{
        min-height: 100%;
        position: relative;
        height: 100%;
    }
    .center-width{
        width: 1000px;
        height: 100%;
        margin: 0 auto;
    }
</style>
