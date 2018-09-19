<template>
    <div id="api2">
        <vue-markdown :source="content"></vue-markdown>
    </div>
</template>

<script>
    import VueMarkdown from 'vue-markdown'
    import hljs from 'highlight.js'
    import 'highlight.js/styles/googlecode.css'
    export default {
        name: 'api2',
        data () {
            return {
                content: ''
            }
        },
        components: {
            VueMarkdown
        },
        created () {
            this.content = `# 二、印章状态查询

## 注册用户调用方式

接口路径：/router/rest/v1

请求方式：HTTP POST

请求头域：Content-Type application/json

请求参数(JSON格式)：

## 1、公共参数
|名称|类型|是否必须|描述|
|----|----|----|----|
|method|String|是|接口名称。DB.seal.status.query|
|appKey|String|是|给用户颁发的 appkey。|
|username|String|是|用户账户名。|
|sign|String|是|请求签名，使用md5，用于安全控制，详见文档中心-新手指引。|
|token|String|是|token 用于调用接口前授权检查。|
|timestamp|String|是|时间戳，格式为yyyyMMddHHmmss。|
|format|String|否|响应格式。默认为json格式。 |
|version|String|是|版本 目前为1.0|
|type|String|否|请求类型，默认 sync。|



## 2、业务参数（JSON格式）

|ID|类型|是否必须|描述|
|----|----|----|----|----|
|sealName|String|是|印章名称|
|queryTime|String|是|查询时间，格式yyyy-MM-dd HH:mm:ss|




## 3、返回数据（JSON格式）

|ID|名称|类型|描述|
|----|----|----|----|----|
| sealName | 印章名称 |String|印章名称|
| queryTime | 查询时间 |String|查询时间 格式yyyy-MM-dd HH:mm:ss |
| sealStatus | 指定查询时间的印章状态 |String|有效：0， 无效：1 |


## 4、请求路径示例


\`\`\`
http://localhost:9000/router/rest/v1?method=DB.seal.status.query&version=1.0&appKey=100001&format=json&timestamp=20180713131137&token=1e7fa7fe-2947-4402-8c3b-2c6c86e8ff60&type=sync&username=cyw002&sign=009183D68B94E93C644F764A8E783CCC
\`\`\`



## 5、请求业务参数示例
\`\`\`javascript
{
    "sealName":"测试章",
    "queryTime":"2020-05-05 00:00:00"
}
\`\`\`


## 6、返回参数示例

\`\`\`javascript
{
    "method": "DB.seal.status.query",
    "requestId": "9e100afd-3f7e-4f55-aaee-7a1f9bce71c8",
    "code": 0,
    "data": [
        {
            "sealName": "测试章",
            "queryTime": "2020-05-05 00:00:00",
            "sealStatus": "1"
        }
    ],
    "message": "调用[印章状态查询接口]成功！"
}
\`\`\`


## 非注册用户调用方式

接口路径：/router/rest/v1

请求方式：HTTP POST

请求头域：Content-Type application/json

请求参数(JSON格式)：

## 1、公共参数
|名称|类型|是否必须|描述|
|----|----|----|----|
|method|String|是|接口名称。DB.seal.status.query|
|sign|String|是|请求签名，使用md5，用于安全控制，详见文档中心-新手指引。|
|timestamp|String|是|时间戳，格式为yyyyMMddHHmmss。|
|format|String|否|响应格式。默认为json格式 |
|version|String|是|版本 目前为1.0|
|type|String|否|请求类型，默认 sync|



## 2、业务参数（JSON格式）

|ID|类型|是否必须|描述|
|----|----|----|----|----|
|sealName|String|是|印章名称|
|queryTime|String|是|查询时间，格式yyyy-MM-dd HH:mm:ss|




## 3、返回数据（JSON格式）

|ID|名称|类型|描述|
|----|----|----|----|----|
| sealName | 印章名称 |String|印章名称|
| queryTime | 当前查询时间 |String|查询时间 格式yyyy-MM-dd HH:mm:ss |
| sealStatus | 指定查询时间的印章状态 |String|有效：0， 无效：1 |


## 4、请求路径示例


\`\`\`
http://localhost:9000/router/rest/v1?method=DB.seal.status.query&version=1.0&format=json&timestamp=20180713131135&type=sync&sign=56B034FEA689497EF085C5016258FD4B
\`\`\`


## 5、请求业务参数示例
\`\`\`javascript
{
    "sealName":"测试章",
    "queryTime":"2020-05-05 00:00:00"
}
\`\`\`


## 6、返回参数示例

\`\`\`javascript
{
    "method": "DB.seal.status.query",
    "requestId": "9e100afd-3f7e-4f55-aaee-7a1f9bce71c8",
    "code": 0,
    "data": [
        {
            "sealName": "测试章",
            "queryTime": "2020-05-05 00:00:00",
            "sealStatus": "1"
        }
    ],
    "message": "调用[印章状态查询接口]成功！"
}
\`\`\`
`
        },
        mounted () {
            let blocks = document.getElementById('api2').querySelectorAll('pre code')
            /* blocks.forEach((block) => {
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
            let tables = document.getElementById('api2').querySelectorAll('table')
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
</style>
