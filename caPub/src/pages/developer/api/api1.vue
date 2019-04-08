<template>
  <div id="api1">
    <vue-markdown  :source="content"></vue-markdown>
  </div>
</template>

<script>
    import VueMarkdown from 'vue-markdown'
    import hljs from 'highlight.js'
    import 'highlight.js/styles/googlecode.css'
    export default {
        name: 'api1',
        data () {
            return {
                content: ''
            }
        },
        components: {
            VueMarkdown
        },
        created () {
            this.content = `# 一、获取token


接口路径：/router/rest/v1

请求方式：HTTP POST

请求头域：Content-Type application/json

请求参数(JSON格式)：

## 1、参数


|名称|类型|是否必须|描述|
|----|----|----|----|
|method|String|是|接口名称。DB.oauth.token|
|username|String|是|用户账户名。|
|password|String|是|用户密码。用户密码+用户盐值拼接后先使用md5加密，再使用sha加密|
|client_id|String|是|用户注册并通过审核后返回的appkey。|
|client_secret|String|是|用户注册并通过审核后返回的appsecret。|
|grant_type|String|是|授权模式，固定为password。|
|version|String|是|版本 目前为1.0|
|timestamp|String|是|时间戳，格式为yyyyMMddHHmmss|


## 2、请求路径示例



\`\`\`
http://localhost:9000/router/rest/v1?method=DB.oauth.token&username=cyw002&password=cf0a582bb784217ececd5da8de877a2c58322a23&client_id=100001&client_secret=a3f73dcd4c5d49398c165e3f6d310827&grant_type=password&version=1.0&timestamp=20180713131136
\`\`\`




## 3、返回示例


\`\`\`
{
    "method": "DB.oauth.token",
    "requestId": "9e100afd-3f7e-4f55-aaee-7a1f9bce71c8",
    "code": 0,
    "data": [
       {
        "access_token":"dfb7a692-7e98-48bb-97da-6d3ccc97fd97",
        "token_type":"bearer",
        "expires_in":28799,
        "scope":"server"

       }
    ],
    "message": "调用接口成功"
}
\`\`\`
`
        },
        mounted () {
            let blocks = document.getElementById('api1').querySelectorAll('pre code')
            /* $.each(blocks, (block) => {
                hljs.highlightBlock(block)
                block.style.padding = '10px'
                block.style.backgroundColor = '#f8f8f9'
                block.style.borderRadius = '4px'
            }) */
            for (let i = 0; i < blocks.length; i++) {
                let block = blocks[i]
                hljs.highlightBlock(block)
                block.style.padding = '10px'
                block.style.backgroundColor = '#f8f8f9'
                block.style.borderRadius = '4px'
            }
            let tables = document.getElementById('api1').querySelectorAll('table')
            for (let i = 0; i < tables.length; i++) {
                let table = tables[i]
                // table.setAttribute('border', '1')
                table.style.borderCollapse = 'collapse'
                table.style.width = '100%'
                table.style.textAlign = 'left'
                table.style.border = 'solid #dddddd'
                table.style.borderWidth = '1px 0px 0px 1px'
                let rows = table.rows
                for (let i = 0; i < rows.length; i++) {
                    for (let j = 0; j < rows[i].cells.length; j++) {    // 遍历该行的 td
                        let td = rows[i].cells[j]
                        td.style.border = 'solid #dddddd'
                        td.style.padding = '0 10px 0 10px'
                        td.style.borderWidth = '0px 1px 1px 0px'
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .table{
        width: 100%;
    }
    td{border:solid #add9c0; border-width:0px 1px 1px 0px;}
    table{border:solid #add9c0; border-width:1px 0px 0px 1px;}
</style>
