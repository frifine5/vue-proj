// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementDataset from 'element-dataset'
import promise from 'es6-promise'
import iView from 'iview';
import App from './App'
import router from './router'
import init from './utils/init'
import 'iview/dist/styles/iview.css'
import {
    MyIcon,
    MyButton,
    MyInput,
    MySelect,
    MyTable,
    MyModal,
    MyCheckbox,
    MyColorPicker
} from './common'
Vue.config.productionTip = false
import 'ie-placeholder'




/* eslint-disable no-new */
promise.polyfill()
ElementDataset()
Vue.use(MyInput)
Vue.use(MyIcon)
Vue.use(MyButton)
Vue.use(MySelect)
Vue.use(MyTable)
Vue.use(MyModal)
Vue.use(MyCheckbox)
Vue.use(MyColorPicker)
Vue.use(iView,{
    transfer: true,
    size: 'large'
})

new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>',
    data: {
        bus: new Vue()//数据传输总线
    },

})
init.initVue(Vue)
init.initComponents(Vue)
