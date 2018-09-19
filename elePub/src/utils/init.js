import http from './https'
import ports from './ports'
import errorCode from './errorcode'
import check from './check'
import {
    Menu,
    MenuItem,
    Submenu,
    Message,
    Input,
    Icon,
    Page,
    Table,
    Select,
    Option,
    Modal,
    Form,
    FormItem,
    Checkbox,
    CheckboxGroup,
    Tabs,
    TabPane,
    DatePicker,
    Col,
    Row,
    RadioGroup,
    Radio,
    Steps,
    Step,
    Breadcrumb,
    BreadcrumbItem,
} from 'iview'

function initComponents (Vue) {
    Vue.component('Icon', Icon)
    Vue.component('Page', Page)
    Vue.component('Input', Input)
    Vue.component('Menu', Menu)
    Vue.component('MenuItem', MenuItem)
    Vue.component('Submenu', Submenu)
    Vue.component('Message', Message)
    Vue.component('Select', Select)
    Vue.component('Option', Option)
    Vue.component('Modal', Modal)
    Vue.component('Form', Form)
    Vue.component('FormItem', FormItem)
    Vue.component('Checkbox', Checkbox)
    Vue.component('CheckboxGroup', CheckboxGroup)
    Vue.component('Tabs', Tabs)
    Vue.component('TabPane', TabPane)
    Vue.component('DatePicker', DatePicker)
    Vue.component('Col', Col)
    Vue.component('Row', Row)
    Vue.component('RadioGroup', RadioGroup)
    Vue.component('Radio', Radio)
    Vue.component('Steps', Steps)
    Vue.component('Step', Step)
    Vue.component('Breadcrumb', Breadcrumb)
    Vue.component('BreadcrumbItem', BreadcrumbItem)
    Vue.prototype.$Message = Message
    Vue.prototype.$Modal = Modal
}
const Reg = {
    userAccount: /^(?![0-9]+$)[a-zA-a0-9]{1,16}$/,
    password: /^(?![A-Za-z]+$)(?!\d+$)(?![\W_]+$)\S{1,16}$/,
    phone: /^[1][3,4,5,7,8][0-9]{9}$/,
    email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    creditCode: /[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}/
}
const ws = {
    socket: '',
    params: '',
    setWs: function (name) {
        return name
    },
    init: function (url) {
        window.WebSocket = window.WebSocket || window.MozWebSocket
        if (!window.WebSocket) { // 检测浏览器支持
            this.error('当前浏览器不支持websocket')
            return
        }
        if (!this.socket) {
            this.socket = this.setWs(new WebSocket(url))
        } else {
            if (this.socket.readyState !== 1) {
                this.socket = this.setWs('')
                this.socket = this.setWs(new WebSocket(url))
            } else {
                this.socket = this.setWs(new WebSocket(url))
            }
        }
        let _this = this
        _this.params = {}
        this.socket.onopen = function () {
            _this.open()
        }
        this.socket.onmessage = function (event) {
            if (JSON.parse(event.data).result !== 0) {
                _this.close(_this.socket)
                if (!(JSON.parse(event.data).result.toString() in errorCode.errorCode)) {
                    return
                }
                _this.errorCode(JSON.parse(event.data).result)
            } else {
                _this.message(JSON.parse(event.data), _this.params, _this.request)
            }
        }
        this.socket.onclose = function (e) {
            _this.close(_this.socket, e)
            _this.socket = null
        }
        this.socket.onerror = function (e) {
            _this.error()
        }
    },
    open: function () {
        console.log('open')
    },
    error: function () {
        console.log('error')
    },
    message: function (event, callback) {

    },
    close: function (websocket) {
        websocket.onclose()
    },
    errorCode: function (code) {

    },
    request: function (params) {

    }
}
export default {
    initVue (Vue) {
        Vue.prototype.http = http
        Vue.prototype.ports = ports
        Vue.prototype.reg = Reg
        Vue.prototype.$errCode = errorCode.getError
        Vue.prototype.$handlers = check.handlers
        Vue.prototype.$ws = ws
    },
    initComponents
}
