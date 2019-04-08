<template>
    <div>
        <h1 class="set-font-style1">申请信息预览</h1>
        <div>
            <table class="set-table1">
                <tr>
                    <td width="30%">
                        <small>单位/机构名称:</small>{{caReq.entName}}
                    </td>
                    <td width="30%">
                        <small>统一社会信用代码:</small>{{caReq.uniSocCode}}
                    </td>
                    <td width="30%">
                        <small>有效期:</small>
                        <span v-if="caReq.validEnd" >至{{caReq.validEnd}}</span>
                        <span v-else>{{caReq.validAge}}年</span>
                    </td>
                </tr>
                <tr>
                    <td width="60%" colspan="2">
                        <small>省市县:</small>&nbsp;&nbsp;&nbsp;&nbsp;{{caReq.province}}-{{caReq.city}}-{{caReq.county}}
                    </td>
                    <td width="30%">
                        <small>联系电话:</small>{{caReq.telephone}}
                    </td>
                </tr>
                <tr>
                    <td   colspan="3">
                        <small>单位地址:</small>{{caReq.address}}
                    </td>
                </tr>

                <tr>
                    <td width="30%">
                        *<small>上传公钥文件(.dat)或p10文件(.csr或.p10)，如两项都上传，则以p10文件为准</small>
                    </td>
                    <td colspan="2">
                        <div class="uploadBox2">
                            <MyButton type="second" class="btn-file2">选择文件
                                <input type='file'  class="upfile" @change="fileChange"></MyButton>
                            <a v-if="files">{{files.name}}</a>
                        </div>
                        <br/>
                    </td>
                </tr>



            </table>
        </div>
        <div class="btn-tops">
            <MyButton type="second" v-on:click="b2pres">返回上一步</MyButton>
            <MyButton type="second" v-on:click="commitRequest">确认并提交</MyButton>
        </div>

    </div>
</template>
<script>
    export default {
        name: 'caApyView',
        props: {},
        data() {
            return {
                caReq: {
                    entName: '',        // 企业/机构名称
                    uniSocCode: '',        // 统一社会信用代码
                    province: '',       // 省
                    city: '',           // 市
                    county: '',         // 县
                    address: '',        // 详细地址
                    telephone: '',      // 联系电话
                    validEnd: '',       // 有效期止
                    validAge: '',       // 有效期（年）
                    pkFile: '',         // 公钥文件
                    p10File: '',        // 公钥p10文件
                },
                fileType: 0,            //0 - .dat = pk | 1 - .csr/.p10 = p10
                files: {}               // pk | p10

            }
        },
        methods: {
            b2pres() {
                // add logic

                // chg step
                this.$root.bus.$emit('chgStep', 0)
                // router push
                this.$router.push({
                    name: 'caApyUnit',
                    query: {
                        caReq: this.caReq,

                    }
                })
            },
            commitRequest() {
                console.log('----提交信息----')
                // check
                if(null === this.caReq){
                    this.$Modal.warning({
                        title: '提示框',
                        content: '申请单为空',
                        closable: true
                    })
                    return
                }else if(null === this.files ){
                    this.$Modal.warning({
                        title: '提示框',
                        content: '申请文件为空',
                        closable: true
                    })
                    return
                }else{
                    // do submit
                    let fd = new FormData()
                    var file = this.files
                    let fileType = this.fileType
                    let req = JSON.stringify(this.caReq)
                    console.log(file)
                    console.log(req)
                    console.log(fileType)
                    fd.append("file", file);
                    fd.append("params", req);

                    this.http.uploadFileFormData(this.ports.ca.apy, fd, res => {
                        console.log(res)

                        if (res.errorCode === 0) {
                            this.uploadReset()

                            let fileName = '单证书.cer'
                            const blobData = res.data
                            if ('msSaveOrOpenBlob' in navigator) {
                                // Microsoft Edge and Microsoft Internet Explorer 10-11
                                window.navigator.msSaveOrOpenBlob(blobData, fileName)
                            } else {
                                const elink = document.createElement('a')
                                elink.download = fileName
                                elink.style.display = 'none'
                                const blob = new Blob([blobData])
                                elink.href = URL.createObjectURL(blob)
                                document.body.appendChild(elink)
                                elink.click()
                                document.body.removeChild(elink)
                            }
                        } else {
                            this.$Modal.warning({
                                title: '提示框',
                                content: res.message,
                                closable: true
                            })
                        }
                    })



                }

            },
            getNowFormatDate() {
                var date = new Date()
                var seperator1 = '-'
                var month = date.getMonth() + 1
                var strDate = date.getDate()
                if (month >= 1 && month <= 9) {
                    month = '0' + month
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = '0' + strDate
                }
                var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                return currentdate
            },
            uploadReset () {
                let isIE10 = false
                if (window.navigator.userAgent.indexOf('MSIE') >= 1) { // 判断ie10以及以下
                    isIE10 = true
                } else {
                    isIE10 = false
                }
                let uploadInput = document.getElementsByClassName('upfile')
                if (isIE10) {
                    let form = document.createElement('form')
                    let beforInput = uploadInput.nextSibling
                    let parentInput = uploadInput.parentNode
                    form.appendChild(uploadInput)
                    form.reset()
                    parentInput.insertBefore(uploadInput, beforInput)
                } else {
                    uploadInput.value = ''
                }
            },

            fileChange (evt) {
                console.log(evt)
                var target = evt.target
                let isIE = false
                if (window.addEventListener) {
                    isIE = false
                } else if (window.attachEvent) {
                    isIE = true
                }
                var fileSize = 0
                if (isIE && !target.files) {
                    var filePath = target.value
                    var fileSystem = new ActiveXObject('Scripting.FileSystemObject')
                    var file = fileSystem.GetFile(filePath)
                    fileSize = file.Size
                } else {
                    fileSize = target.files[0].size
                }
                var size = fileSize / 1024
                if (size > 10240) {
                    alert('上传文件最大为10M，请重新上传。')
                    this.uploadReset()
                    return
                }
                var name = target.value
                var fileType = name.substring(name.lastIndexOf('.') + 1).toLowerCase()
                console.log("选择的文件名后缀："+fileType)
                if(fileType === '.dat'){
                    this.fileType = 0
                }else{
                    this.fileType = 1
                }

                this.files = target.files[0]

            },


        },
        created: function(){
            this.caReq = undefined === this.$route.query.caReq ?  this.caReq : this.$route.query.caReq
        },
        computed: {},
        watch: {}
    }
</script>

<style scoped>
    .set-font-style1 {
        font-size: 14px;
        color: #1C2438;
        text-align: center;
    }


    .set-table1 {
        border: 2px solid #DDDEE1;
        width: 100%;
        margin: 10px auto;
    }

    .set-table1 td {
        padding: 5px 10px;
        border-right: 1px solid #dddee1;
        border-bottom: 1px solid #dddee1;
        font-size: 12px;
        color: #555522;
    }
    .set-table1 span {
        padding: 5px 0px;
        margin-right: 10px;
        font-size: 14px;
        color: #2b85e4;
    }

    .btn-tops {
        width: 100%;
        margin: 0 auto;
        text-align: right;
    }

    .table-bottom td {
        border-bottom: none;
    }
    .uploadBox2 {
        width: 100%;
        height: 31px;
        /*position: absolute;*/
        right: 19px;
        top: -3px;
        display: inline-block;
        /*overflow: hidden;*/
        z-index: 1000;
        background: none;
    }
    .bw-btn-second {
        background-color: none;
        color: #0079cc;
        /*border: none;*/
    }
    .uploadBox2 .upfile {
        width: 60px;
        height: 30px;
        /*position: absolute;*/
        top: 0;
        left: 0;
        opacity: 0;
        font-size: 12px;
        z-index: 1001;
    }

</style>
