<template>
    <div class="revoke-apply">
        <div class="page">
            <div class="a4-page">
                <h2>印章吊销登记申请书</h2>
                <div class="main-wrap">
                    <div class="table-wrap">
                        <table border="0" cellspacing="0" cellpadding="0">
                            <tr class="tr-1">
                                <td><div><span class="middle">单位名称</span></div></td>
                                <td>
                                    <div style="width: 100%;height:100%;" @click="openTextarea(1)"><span class="middle">{{formParams.companyName}}</span></div>
                                </td>
                                <td><div><span class="middle">统一社会信用代码</span></div></td>
                                <td>
                                    <div style="width: 100%;height:100%;" @click="openTextarea(2)"><span class="middle">{{formParams.creditNo}}</span></div>
                                </td>
                            </tr>
                            <tr class="tr-2">
                                <td colspan="1"><div>吊销范围</div></td>
                                <td colspan="9">
                                    <div>
                                        <RadioGroup vertical v-model="formParams.deactiveType">
                                            <Radio label="0"><div class="check-box-panel"><Icon type="checkmark-round" v-if="formParams.deactiveType === '0'"></Icon></div>全部印章</Radio>
                                            <Radio label="1"><div class="check-box-panel"><Icon type="checkmark-round" v-if="formParams.deactiveType === '1'"></Icon></div>单个印章</Radio>
                                        </RadioGroup>
                                        <div style="margin-left: 20px;">
                                            <p class="input-check-box" @click="openTextarea(3)" ><span>请输入印章名称:</span><span class="inputing" :class="{'underline': formParams.sealName}">{{formParams.sealName}}</span></p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr class="tr-3">
                                <td colspan="1"><div>吊销原因</div></td>
                                <td colspan="9">
                                    <div>
                                        <RadioGroup vertical v-model="formParams.deactiveReasonType">
                                            <Radio label="5"><div class="check-box-panel"><Icon type="checkmark-round" v-if="formParams.deactiveReasonType === '5'"></Icon></div>虚假注册</Radio>
                                            <Radio label="6"><div class="check-box-panel"><Icon type="checkmark-round" v-if="formParams.deactiveReasonType === '6'"></Icon></div>超范围经营</Radio>
                                            <Radio label="7"><div class="check-box-panel"><Icon type="checkmark-round" v-if="formParams.deactiveReasonType === '7'"></Icon></div>无故不开业或者停业</Radio>
                                            <Radio label="8"><div class="check-box-panel"><Icon type="checkmark-round" v-if="formParams.deactiveReasonType === '8'"></Icon></div>单位逾期不参加年检手续</Radio>
                                            <Radio label="9"><div class="check-box-panel"><Icon type="checkmark-round" v-if="formParams.deactiveReasonType === '9'"></Icon></div>其他的情况：</Radio>
                                        </RadioGroup>
                                        <p style="margin-left: 20px;" class="input-check-box" @click="openTextarea(4)"><span class="inputing" :class="{'underline': formParams.deactiveReason}">{{formParams.deactiveReason}}</span></p>
                                    </div>
                                </td>
                            </tr>
                            <tr class="tr-4">
                                <td colspan="1" rowspan="4"><div>吊销来源</div></td>
                                <td colspan="9" rowspan="4">
                                    <div class="check-box">
                                        <p class="input-check-box" style="font-size: 14px;">
                                            <span>本</span>
                                            <span
                                                class="inputing"
                                                :class="{'underline': formParams.deactiveCompanyName}"
                                                @click="openTextarea(5)">
                                        {{formParams.deactiveCompanyName}}
                                    </span>
                                            <span>单位申请吊销</span>
                                            <span class="inputing" :class="{'underline': formParams.companyName}">
                                        {{formParams.companyName}}
                                    </span>
                                            <span>单位，提交材料真实有效。</span>
                                        </p>
                                        <div class="clearfix seal-address">
                                            <span style="float:right;margin-right: 40px;">执法部门盖章</span>
                                        </div>
                                        <div class="clearfix sel-time">
                                            <button @click="timeVisible = true">
                                                <span v-if="time">{{time}}</span>
                                                <span v-else>&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;月&nbsp;&nbsp;日&nbsp;&nbsp;时&nbsp;&nbsp;分&nbsp;&nbsp;秒</span>
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
            </div>
        </div>
        </div>
        <div style="margin-bottom: 80px;">
            <button class="submit-btn" @click="submit">提交</button>
        </div>
        <MyModal
            className="a4-page-modal"
            title="选择日期"
            :show="timeVisible"
            :width="360"
            @okClick="selectTime"
            @cancelClick="timeVisible = false"
            @changeStatus="timeVisible = false"
        >
            <div>
                <DatePicker :value="formParams.deactiveEffectTime" format="yyyy-MM-dd HH:mm:ss" :editable="dateEditable" type="datetime" placeholder="选择时间" style="width: 300px" @on-change="(value) => {formParams.deactiveEffectTime=value}"></DatePicker>
            </div>
        </MyModal>
        <MyModal
            className="a4-page-modal"
            :title="inputTitle"
            :show="textareaVisible"
            :width="360"
            @okClick="inputTextarea"
            @cancelClick="closeTextarea"
            @changeStatus="closeTextarea"
        >
            <div>
                <MyInput inputType="textarea" :maxLength="maxLength" :inputValue="inputValue" @change="(e, value) => changeInput(value)"></MyInput>
            </div>
        </MyModal>
        <!--成功失败弹层-->
        <div>
            <MyModal
                title="提示"
                :show="isVisible"
                :width="360"
                :havecancel="havecancel"
                @changeStatus="isVisible = false"
                @okClick="isVisible = false"
            >
                <div>{{message}}</div>
            </MyModal>
        </div>
        <MyModal
        title="操作"
        :show="modalShow"
        :width="360"
        @okClick="goSeal"
        @cancelClick="modalShow = false"
        @changeStatus="modalShow = false">
            <div>点击确认，进行盖章</div>
        </MyModal>
    </div>
</template>
<script>
    import html2canvas from 'html2canvas'
    export default {
        name: 'StatusChange',
        data () {
            return {
                maxLength: 50,
                modalShow: false,
                dateEditable: false,
                formParams: {
                    companyName: '',
                    creditNo: '',
                    deactiveType: '',
                    sealName: '',
                    deactiveReasonType: '',
                    deactiveReason: '',
                    deactiveCompanyName: '',
                    deactiveEffectTime: '',
                    deactiveImage: ''
                },
                range: {
                    singleSeal: false,
                    allSeal: false
                },
                reason: {
                    falseReg: false,
                    superRangeOper: false,
                    noReasonStop: false,
                    overdueUnit: false,
                    otherCase: false
                },
                timeVisible: false,
                time: '',
                textareaVisible: false,
                companyName: '',
                inputTitle: '',
                inputValue: '',
                inputType: '',
                isVisible: false,
                havecancel: false,
                message: '',
                ukeyResult: {
                    userId: '', // 用户标识
                    pubKey: '', // 签名主公钥
                    signature: '' // 签名值
                },
                getResult: {
                    deactiveRequestId: '',
                    deactivePdfUrl: ''
                },
                hintWord: '',
                restartShow: true
            }
        },
        mounted () {
        },
        methods: {
            changeInput (value) {
                this.inputValue = value;
            },
            selectTime () {
                this.timeVisible = false
                if (!this.formParams.deactiveEffectTime) {
                    return
                }
                let y = this.formParams.deactiveEffectTime.substring(0, 4) + '年'
                let M = this.formParams.deactiveEffectTime.substring(5, 7) + '月'
                let d = this.formParams.deactiveEffectTime.substring(8, 10) + '日'
                let h = this.formParams.deactiveEffectTime.substring(11, 13) + '时'
                let m = this.formParams.deactiveEffectTime.substring(14, 16) + '分'
                let s = this.formParams.deactiveEffectTime.substring(17, 19) + '秒'
                this.time = y + M + d + h + m + s
            },
            inputTextarea () {
                if (this.inputValue.length > this.maxLength) {
                    this.$Modal.warning({
                        title: '提示',
                        content: '输入字数超过限制，最大不超过' + this.maxLength
                    })
                    return
                }
                if (this.inputType === 1) { // 单位名称
                    this.formParams.companyName = this.inputValue
                } else if (this.inputType === 2) {
                    this.formParams.creditNo = this.inputValue
                } else if (this.inputType === 3) {
                    this.formParams.sealName = this.inputValue
                } else if (this.inputType === 4) {
                    this.formParams.deactiveReason = this.inputValue
                } else if (this.inputType === 5) {
                    this.formParams.deactiveCompanyName = this.inputValue
                }
                this.textareaVisible = false
            },
            openTextarea (value) {
                this.inputType = value
                if (value === 1) { // 单位名称
                    this.inputTitle = '请输入单位名称'
                    this.maxLength = 50
                    this.inputValue = this.formParams.companyName
                } else if (value === 2) {
                    this.inputTitle = '请输入统一社会信用代码'
                    this.maxLength = 50
                    this.inputValue = this.formParams.creditNo
                } else if (value === 3) {
                    if (this.formParams.deactiveType !== '1') {
                        return
                    }
                    this.inputTitle = '请输入印章名称'
                    this.maxLength = 50
                    this.inputValue = this.formParams.sealName
                } else if (value === 4) {
                    if (this.formParams.deactiveReasonType !== '9') {
                        return
                    }
                    this.inputTitle = '请输入详细的其他情况'
                    this.maxLength = 150
                    this.inputValue = this.formParams.deactiveReason
                } else if (value === 5) {
                    this.inputTitle = '请输入当前单位'
                    this.maxLength = 50
                    this.inputValue = this.formParams.deactiveCompanyName
                }
                this.textareaVisible = true
            },
            closeTextarea () {
                this.textareaVisible = false
                this.inputValue = ''
            },
            /* submit1 () {
                let _that = this
                if (!this.formParams.companyName) {
                    this.$Modal.warning({
                        title: '提示',
                        content: '请输入单位名称'
                    })
                    return
                } else if (!this.formParams.creditNo) {
                    this.$Modal.warning({
                        title: '提示',
                        content: '请输入统一社会信用代码'
                    })
                    return
                } else if (!this.reg.creditCode.test(this.formParams.creditNo)) {
                    this.$Modal.warning({
                        title: '提示',
                        content: '统一信用代码格式不正确'
                    })
                    return
                } else if (this.formParams.deactiveType !== '0' && this.formParams.deactiveType !== '1') {
                    this.$Modal.warning({
                        title: '提示',
                        content: '请选择吊销范围'
                    })
                    return
                } else if (this.formParams.deactiveType === '1' && !this.formParams.sealName) {
                    this.$Modal.warning({
                        title: '提示',
                        content: '请输入被吊销的印章名称'
                    })
                    return
                } else if (!this.formParams.deactiveReasonType && this.formParams.deactiveReasonType !== '0') {
                    this.$Modal.warning({
                        title: '提示',
                        content: '请选择吊销原因'
                    })
                    return
                } else if (this.formParams.deactiveReasonType === '4' && !this.formParams.deactiveReason) {
                    this.$Modal.warning({
                        title: '提示',
                        content: '请输入吊销的具体原因'
                    })
                    return
                } else if (!this.formParams.deactiveCompanyName) {
                    this.$Modal.warning({
                        title: '提示',
                        content: '请输入申请吊销的单位名称'
                    })
                    return
                } else if (!this.formParams.deactiveEffectTime) {
                    this.$Modal.warning({
                        title: '提示',
                        content: '请输入申请吊销的时间'
                    })
                    return
                }
                html2canvas($('.pages')[0]).then(function (canvas) {
                    let dataURL = canvas.toDataURL('image/png')
                    let arr = dataURL.split(','),
                        mime = arr[0].match(/:(.*?);/)[1],
                        bstr = atob(arr[1]),
                        n = bstr.length,
                        u8arr = new Uint8Array(n)
                    while (n--) {
                        u8arr[n] = bstr.charCodeAt(n)
                    }
                    _that.formParams.deactiveImage =  new Blob([u8arr], {
                        type: mime
                    })
                })
                let websocket = null
                let globalData = {}
                // 判断当前浏览器是否支持WebSocket
                if ('WebSocket' in window) {
                    websocket = new WebSocket('ws://127.0.0.1:10522')
                    // websocket = new WebSocket("ws://192.168.7.147:10522");
                    websocket.onerror = function () {
                       // _that.isVisible = true
                      //  _that.message = '请注册USBKey控件'
                       return
                    }
                    websocket.onopen = function () {
                        // alert("WebSocket连接成功");
                        // 1、获取KEY设备列表
                        // Fun.handlers.getDevChange(websocket)
                        let r1 = $.extend(globalData, Fun.handlers['SM9GetDevChange'](websocket))
                        websocket.onmessage = function (event) {
                            var devliststr = JSON.parse(event.data).devList
                            // 判断是否插入Ukey
                            function isnotallzero (str) {
                                return !/^0+$/ig.test(str)
                            }
                            if (!isnotallzero(devliststr)) {
                                _that.isVisible = true
                                _that.message = '请插入USBKey'
                                return
                            }
                            var port = devliststr.indexOf('1') + 1
                            if (JSON.parse(event.data).result === 0) {
                                // 2、连接KEY
                                let result = $.extend(globalData, Fun.handlers['SM9Connect'](websocket, port))
                                websocket.onmessage = function (event1) {
                                    // 4、验Pin
                                    if (JSON.parse(event1.data).result === 0) {
                                        let result1 = $.extend(globalData, Fun.handlers['SM9VerifyPIN'](websocket, port))
                                        websocket.onmessage = function (event3) {
                                            if (JSON.parse(event3.data).result !== 0) {
                                                _that.isVisible = true
                                                _that.message = _that.$errCode(JSON.parse(event3.data).result)
                                                if (JSON.parse(event3.data).result === 2148007957) {
                                                    websocket.close()
                                                }
                                                return
                                            }
                                            let results2 = $.extend(globalData, Fun.handlers['SM9ExportUserID'](websocket, port))
                                            websocket.onmessage = function (event4) {
                                                if (JSON.parse(event4.data).result !== 0) {
                                                    _that.isVisible = true
                                                    _that.message = _that.$errCode(JSON.parse(event4.data).result)
                                                    return
                                                }
                                                _that.ukeyResult.userId = JSON.parse(event4.data).userId
                                                // //获取设备签名
                                                let r5 = $.extend(globalData, Fun.handlers['SM9ExportPublicKey'](websocket, port, 1))
                                                websocket.onmessage = function (event9) {
                                                    if (JSON.parse(event9.data).result !== 0) {
                                                        _that.isVisible = true
                                                        _that.message = _that.$errCode(JSON.parse(event9.data).result)
                                                        return
                                                    }
                                                    _that.ukeyResult.pubKey = JSON.parse(event9.data).publicKey
                                                    let plain = _that.paramsSortToString(_that.formParams) // 参数排序进行ukey签名
                                                    console.log(plain);
                                                    let r4 = $.extend(globalData, Fun.handlers['SM9PairSignData'](websocket, port, plain))
                                                    websocket.onmessage = function (event8) {
                                                        if (JSON.parse(event8.data).result !== 0) {
                                                            _that.isVisible = true
                                                            _that.message = _that.$errCode(JSON.parse(event8.data).result)
                                                            return
                                                        }
                                                        _that.ukeyResult.signature = JSON.parse(event8.data).signedData // 拿到签名值
                                                        console.log(_that.ukeyResult.signature);
                                                        let fd = new FormData()
                                                        fd.append('deactiveCompanyName', _that.formParams.deactiveCompanyName)
                                                        fd.append('companyName', _that.formParams.companyName)
                                                        fd.append('creditNo', _that.formParams.creditNo)
                                                        fd.append('deactiveType', _that.formParams.deactiveType)
                                                        fd.append('sealName', _that.formParams.sealName)
                                                        fd.append('deactiveReasonType', _that.formParams.deactiveReasonType)
                                                        fd.append('deactiveReason', _that.formParams.deactiveReason)
                                                        fd.append('deactiveEffectTime', _that.formParams.deactiveEffectTime)
                                                        fd.append('signature', _that.ukeyResult.signature)
                                                        fd.append('pubKey', _that.ukeyResult.pubKey)
                                                        fd.append('userId', _that.ukeyResult.userId)
                                                        fd.append('deactiveImage', _that.formParams.deactiveImage)
                                                        _that.http.uploadFileFormData(_that.ports.seal.deative.deativeToImg, fd, res => {
                                                            websocket.close()
                                                            if (res.success) {
                                                                _that.getResult.deactivePdfUrl = BASE_URL + res.data.results[0].deactivePdfUrl
                                                                _that.getResult.deactiveRequestId = res.data.results[0].deactiveRequestId
                                                                _that.modalShow = true
                                                            } else {
                                                                _that.$Modal.error({
                                                                    title: '提示',
                                                                    content: res.message
                                                                })
                                                            }
                                                        })
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    alert('当前浏览器不支持websocket')
                }
            }, */
            submit () {
                let _that = this
                if (!this.formParams.companyName) {
                    this.$Modal.warning({
                        title: '提示',
                        content: '请输入单位名称'
                    })
                    return
                } else if (!this.formParams.creditNo) {
                    this.$Modal.warning({
                        title: '提示',
                        content: '请输入统一社会信用代码'
                    })
                    return
                } else if (!this.reg.creditCode.test(this.formParams.creditNo)) {
                    this.$Modal.warning({
                        title: '提示',
                        content: '统一信用代码格式不正确'
                    })
                    return
                } else if (this.formParams.deactiveType !== '0' && this.formParams.deactiveType !== '1') {
                    this.$Modal.warning({
                        title: '提示',
                        content: '请选择吊销范围'
                    })
                    return
                } else if (this.formParams.deactiveType === '1' && !this.formParams.sealName) {
                    this.$Modal.warning({
                        title: '提示',
                        content: '请输入被吊销的印章名称'
                    })
                    return
                } else if (!this.formParams.deactiveReasonType && this.formParams.deactiveReasonType !== '0') {
                    this.$Modal.warning({
                        title: '提示',
                        content: '请选择吊销原因'
                    })
                    return
                } else if (this.formParams.deactiveReasonType === '4' && !this.formParams.deactiveReason) {
                    this.$Modal.warning({
                        title: '提示',
                        content: '请输入吊销的具体原因'
                    })
                    return
                } else if (!this.formParams.deactiveCompanyName) {
                    this.$Modal.warning({
                        title: '提示',
                        content: '请输入申请吊销的单位名称'
                    })
                    return
                } else if (!this.formParams.deactiveEffectTime) {
                    this.$Modal.warning({
                        title: '提示',
                        content: '请输入申请吊销的时间'
                    })
                    return
                }
                html2canvas($('.pages')[0]).then(function (canvas) {
                    let dataURL = canvas.toDataURL('image/png')
                    let arr = dataURL.split(','),
                        mime = arr[0].match(/:(.*?);/)[1],
                        bstr = atob(arr[1]),
                        n = bstr.length,
                        u8arr = new Uint8Array(n)
                    while (n--) {
                        u8arr[n] = bstr.charCodeAt(n)
                    }
                    _that.formParams.deactiveImage =  new Blob([u8arr], {
                        type: mime
                    })
                })
                let globalData = {}
                this.$ws.init('ws://127.0.0.1:10522')
                let websocket = this.$ws.socket
                this.$ws.open = () => {
                    $.extend(globalData, this.$handlers['SM9GetDevChange'](websocket))
                }
                this.$ws.errorCode = (code) => {
                    if (code === 2148007957) {
                        _that.restartShow = false
                        _that.$ws.close(websocket)
                        return
                    }
                    _that.isVisible = true
                    _that.message = _that.$errCode(code)
                    return
                }
                this.$ws.close = (websocket, e) => {
                    _that.restartShow = false
                    websocket.close()
                }
                this.$ws.error = () => {
                    console.log('error');
                    _that.$nextTick(() => {
                        if (!_that.restartShow) {
                            return
                        }
                        _that.isVisible = true
                        _that.message = '请重启websocket服务'
                    })
                    console.log('error2');
                }
                this.$ws.message = (data, wsParam, request) => {
                    if (data.function === 'SM9GetDevChange') {
                        var devliststr = data.devList
                        // 判断是否插入Ukey
                        /* function isnotallzero (str) {
                            return !/^0+$/ig.test(str)
                        } */
                        if (/^0+$/ig.test(devliststr)) {
                            _that.isVisible = true
                            _that.message = '请插入USBKey'
                            return
                        }
                        wsParam.port = devliststr.indexOf('1') + 1
                        $.extend(globalData, this.$handlers['SM9Connect'](websocket, wsParam.port))
                    }
                    if (data.function === 'SM9Connect') {
                        $.extend(globalData, this.$handlers['SM9VerifyPIN'](websocket, wsParam.port))
                    }
                    if (data.function === 'SM9VerifyPIN') {
                        $.extend(globalData, this.$handlers['SM9ExportUserID'](websocket, wsParam.port))
                    }
                    if (data.function === 'SM9ExportUserID') {
                        wsParam.userId = data.userId
                        $.extend(globalData, this.$handlers['SM9ExportPublicKey'](websocket, wsParam.port, 1))
                    }
                    if (data.function === 'SM9ExportPublicKey') {
                        wsParam.pubKey = data.publicKey
                        wsParam.plain = _that.paramsSortToString(_that.formParams) // 参数排序进行ukey签名
                        $.extend(globalData, this.$handlers['SM9PairSignData'](websocket, wsParam.port, wsParam.plain))
                    }
                    if (data.function === 'SM9PairSignData') {
                        wsParam.signature = data.signedData
                        request(wsParam)
                    }
                }
                this.$ws.request = (wsParam) => {
                    _that.ukeyResult.userId = wsParam.userId
                    _that.ukeyResult.pubKey = wsParam.pubKey
                    _that.ukeyResult.signature = wsParam.signature // 拿到签名值
                    let fd = new FormData()
                    fd.append('deactiveCompanyName', _that.formParams.deactiveCompanyName)
                    fd.append('companyName', _that.formParams.companyName)
                    fd.append('creditNo', _that.formParams.creditNo)
                    fd.append('deactiveType', _that.formParams.deactiveType)
                    fd.append('sealName', _that.formParams.sealName)
                    fd.append('deactiveReasonType', _that.formParams.deactiveReasonType)
                    fd.append('deactiveReason', _that.formParams.deactiveReason)
                    fd.append('deactiveEffectTime', _that.formParams.deactiveEffectTime)
                    fd.append('signature', _that.ukeyResult.signature)
                    fd.append('pubKey', _that.ukeyResult.pubKey)
                    fd.append('userId', _that.ukeyResult.userId)
                    fd.append('deactiveImage', _that.formParams.deactiveImage)
                    _that.http.uploadFileFormData(_that.ports.seal.deative.deativeToImg, fd, res => {
                        _that.$ws.close(websocket)
                        if (res.success) {
                            _that.getResult.deactivePdfUrl = BASE_URL + res.data.results[0].deactivePdfUrl
                            _that.getResult.deactiveRequestId = res.data.results[0].deactiveRequestId
                            _that.modalShow = true
                        } else {
                            _that.$Modal.error({
                                title: '提示',
                                content: res.message
                            })
                        }
                    })
                }
            },
            paramsSortToString (obj) {
                let params = {
                    ...obj
                }
                delete params.deactiveImage
                let newkey = Object.keys(params).sort()
                let newObj = {} // 排序之后的对象
                let newString = '' // 排序之后的字符串
                for (let i = 0; i < newkey.length; i++) {
                    newObj[newkey[i]] = params[newkey[i]]
                }
                for (let key in newObj) {
                    newString += key + ':' + newObj[key] + ','
                }
                return newString.substring(0, newString.length - 1)
            },
            goSeal () {
                this.modalShow = false
                setTimeout(() => {
                    let obj = encodeURIComponent(this.getResult.deactivePdfUrl)
                    let url = 'http://10.100.1.35/webpdf-websocket/web/viewer.html?file=' + obj + '&&status=websocket&&deactiveId=' + this.getResult.deactiveRequestId
                    window.open(url, '_blank')
                }, 500)
            }
        }
    }
</script>

<style scoped>
    /*body {
        margin: 0;
        padding: 0;
        background-color: #FAFAFA;
        font: 14pt "Tahoma";
    }*/
    * {
        box-sizing: border-box;
        -moz-box-sizing: border-box;
    }
    .page {
       /* width: 21cm;*/
        width: 794px;
        /*min-height: 29.7cm;*/
        min-height: 1123px;
       /* padding: 2cm;*/
        padding: 50px;
        margin: 1cm auto;
       /* border: 1px #D3D3D3 solid;*/
        border-radius: 5px;
        background: white;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
        position: relative;
        color: #000;
    }
    .subpage {
        padding: 1cm;
        border: 5px red solid;
        height: 256mm;
        outline: 2cm #FFEAEA solid;
    }

    @page {
        size: A4;
        margin: 0;
    }
    @media print {
        .page {
            margin: 0;
            border: initial;
            border-radius: initial;
            width: initial;
            min-height: initial;
            box-shadow: initial;
            background: initial;
            page-break-after: always;
        }
    }
   .revoke-apply{
       text-align: center;
   }
   h2{
       font-size: 30px;
      /* position: absolute;
       left: 0;
       top: 0;*/
       text-align: center;
       width: 100%;
       line-height: 60px;
   }
    .main-wrap,
    .table-wrap {
        width: 100%;
        /*height: 25.7cm;*/
        height: 962px;
    }
   table{
       /*border-collapse: collapse;*/
       /*border-collapse: collapse;*/
       border: 1px solid #000;
       width: 100%;
       height: 100%;
       font-size: 14px;
       table-layout: fixed;
       -webkit-box-sizing: border-box;
       -moz-box-sizing: border-box;
       box-sizing: border-box;
   }
   td {
       border-right: 1px solid #000;
       border-bottom: 1px solid #000;
   }
   .tr-1 td:nth-child(4) ,
   .tr-2 td:nth-child(2) ,
   .tr-3 td:nth-child(2) ,
   .tr-4 td:nth-child(2) {
       border-right: none;
   }
    .tr-4 td{
       border-bottom: none;
    }
   td > div{
       width: 100%;
       height: 100%;
   }
    /*.tr-1{
        height: 10%;
    }
    .tr-2{
        height: 20%;
    }
    .tr-3{
        height: 30%;
    }
    .tr-4{
        height: 40%;
    }*/
    .middle{
        line-height: 20px;
        display: inline-block;
        vertical-align: middle;
    }
    tr td:nth-child(1){
        width: 120px;
    }
    .tr-1 td:nth-child(2),
    .tr-1 td:nth-child(4){
        width: 208px;
        word-wrap: break-word;
        word-break: break-word;
    }
    .tr-1 td:nth-child(1),
    .tr-1 td:nth-child(3){
        width: 139px;
    }
    .tr-1 td{
        height: 140px;
        line-height: 100px;
    }
    .tr-2 td{
        height: 140px;
    }
    .tr-3 td{
        height: 300px;
    }
    .tr-4 td{
        height: 378px;
    }
    .tr-1 td:nth-child(1){
        line-height: 100px;
    }
    .tr-2 td:nth-child(1){
        line-height: 100px;
    }
    .tr-3 td:nth-child(1){
        line-height: 260px;
    }
    .tr-4 td:nth-child(1){
        line-height: 338px;
    }
   .tr-1 td:nth-child(1) > div,
   .tr-1 td:nth-child(3) > div,
   .tr-2 td > div,
   .tr-3 td > div,
   .tr-4 td > div{
      padding: 20px;
   }
    .tr-2 td:nth-child(2) > div,
    .tr-3 td:nth-child(2) > div {
        text-align: left;
        padding-left: 30px;
    }
    .tr-1 td:nth-child(2) > div,
    .tr-1 td:nth-child(4) > div{
        height: 180px;
        padding: 20px;
    }
    .inputground textarea.ivu-input {
        width: 100%;
        height: 100%;
    }
    .check-box{
        text-align: left;
        padding-left: 20px;
    }
    .input-check-box{
        min-width: 150px;
        min-height: 20px;
    }
    .input-check-box .inputing {
        height: 20px;
        vertical-align: bottom;
        display: inline-block;
        min-width: 100px;
        border-bottom: 1px solid #9ea7b4;
        -ms-word-wrap: break-word;
        word-wrap: break-word;
        -ms-word-break: break-all;
        word-break: break-all;
    }
    .input-check-box .inputing.underline{
        display: inline;
        border-bottom: none;
        border-bottom: 1px solid #9ea7b4;
        padding-bottom: 3px;
    }
    .tr-4 .input-check-box{
        display: inline-block;
    }
    .ivu-checkbox-wrapper{
        font-size: 14px;
    }
    .seal-address{
        margin-top: 100px;
    }
    .sel-time{
        margin-top: 80px;
    }
    .ivu-radio-wrapper{
        font-size: 14px;
    }
    .check-box-panel{
        display: inline-block;
        width: 14px;
        height: 14px;
        border: 1px solid #9ea7b4;
        vertical-align: middle;
        position: relative;
    }
    .check-box-panel i{
        position: absolute;
        left: 0;
        top: 0;
    }
    .ivu-radio-wrapper-checked .check-box-panel{
        border: 1px solid #2d8cf0;
    }
    .ivu-radio-wrapper-checked .check-box-panel i{
        color: #2d8cf0;
    }
    .sel-time button{
        background-color: transparent;
        float: right;
        margin-right: 40px;
    }
    .submit-btn{
        background-color: #004098;
        padding: 10px 50px;
        color: #FFFFFF;
        font-size: 22px;
        margin-top: 30px;
    }
    .gray{
        color: #dddee1;
    }
    .gray .inputing{
        border-bottom: 1px solid #dddee1;
    }
</style>
