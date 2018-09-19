<template>
    <div id="api3" class="container">
        <vue-markdown :source="content"></vue-markdown>
    </div>
</template>

<script>
    import VueMarkdown from 'vue-markdown'
    import hljs from 'highlight.js'
    import 'highlight.js/styles/googlecode.css'
    export default {
        name: 'api3',
        data () {
            return {
                content: ''
            }
        },
        components: {
            VueMarkdown
        },
        created () {
            this.content = `# 三、印章吊销列表查询

接口路径：/router/rest/v1

请求方式：HTTP POST

请求头域：Content-Type application/json

请求参数(JSON格式)：

## 1、公共参数
|名称|类型|是否必须|描述|
|----|----|----|----|
|method|String|是|接口名称。DB.seal.deactive.list.query|
|appKey|String|是|给用户颁发的 appkey。|
|username|String|是|用户账户名。|
|sign|String|是|请求签名，使用md5，用于安全控制，详见文档中心-新手指引。|
|token|String|是|token 用于调用接口前授权检查。|
|timestamp|String|是|Unix时间戳，格式为yyyyMMddHHmmss。|
|format|String|否|响应格式。默认为json格式。 |
|version|String|是|版本 目前为1.0|
|type|String|否|请求类型，默认 sync。|



## 2、业务参数（JSON格式）

|ID|类型|是否必须|描述|
|----|----|----|----|----|
|queryStartTime|String|是|查询起始时间 格式yyyy-MM-dd HH:mm:ss|
|queryEndTime|String|是|查询截止时间 格式yyyy-MM-dd HH:mm:ss|
|pageSize|int|是|吊销列表每页数据量|
|pageNow|int|是|吊销列表当前页数|


## 3、返回数据（JSON格式）

|ID|名称|类型|描述|
|----|----|----|----|----|
| version | 发布版本 | String |可以为系统版本|
| invalidEffectTime | 生效日期 | String |本次查询生效时间，格式yyyy-MM-dd HH:mm:ss |
| nextUpdateTime | 下一次更新日期 | String |建议更新时间，一般为1个月，格式yyyy-MM-dd HH:mm:ss |
| signature | 签名值 | String |签名值 |
| signAlgorithm | 签名算法 | String |统一为SM9 |
| signHashAlgorithm | 签名摘要算法 | String |统一为SM3 |
| secretKey | 签名公钥 | String |sm9签名公钥 |
| userId | 用户标识 | String |sm9签名用户标识 |
| awardCompany | 颁发机构 | String |公司名称 |
| total | 总数 | int |分页需要 |
| size | 当前查询条数 | int |分页需要 |
| revocationList |吊销列表节点|list| | |
| sealCode |印章序列号|String| 印章唯一编码 |
| sealName |印章名称|String| |
| revocationTime |吊销时间|String|格式yyyy-MM-dd HH:mm:ss |


## 4、请求路径示例


\`\`\`
http://localhost:9000/router/rest/v1?method=DB.seal.deactive.list.query&version=1.0&appKey=100001&format=json&timestamp=20180713131153&token=1e7fa7fe-2947-4402-8c3b-2c6c86e8ff60&type=sync&username=cyw002&sign=7223384D078A393003CD32DA1172DDB6
\`\`\`




## 5、请求参数JSON示例

\`\`\`javascript
{
    "queryStartTime":"2018-05-05 10:00:00",
    "queryEndTime":"2018-05-10 10:00:00",
    "pageSize":10,
    "pageNow":1
}
\`\`\`

## 6、返回数据JSON示例

\`\`\`javascript
{
    "method": "DB.seal.deactive.list",
    "requestId": "9e100afd-3f7e-4f55-aaee-7a1f9bce71c8",
    "code": 0,
    "data": [
        {
            "version": "V1.0",
            "invalidEffectTime": "2018-05-29 17:04:36",
            "nextUpdateTime": "2018-06-29 17:04:36",
            "signature": "wdwqweqwew11dqqw=",
            "signAlgorithm": "SM9",
            "signHashAlgorithm":"SM3",
            "secretKey": "JKJDKAJDKAJKJAKAD",
            "userId":"JCKLSCJDCV=",
            "awardCompany": "国家电子政务平台",
            "revocationList": [
                {
                    "sealCode": "1234567890123456789",
                    "sealName": "测试章1",
                    "revocationTime": "2018-05-08 00:00:00"
                },
                {
                    "sealCode": "12345671012345678",
                    "sealName": "测试章2",
                    "revocationTime": "2018-05-08 00:00:00"
                },
                {
                    "sealCode": "123456713123456789",
                    "sealName": "测试章3",
                    "revocationTime": "2018-05-08 00:00:00"
                }
            ],
            "total": 10,
            "size": 3
        }
    ],
    "message": "调用[印章吊销列表获取]接口成功！"
}
\`\`\`  `
        },
        mounted () {
            let blocks = document.getElementById('api3').querySelectorAll('pre code')
            for (let i = 0; i < blocks.length; i++) {
                let block = blocks[i]
                hljs.highlightBlock(block)
                block.style.padding = '10px'
                block.style.backgroundColor = '#f8f8f9'
                block.style.borderRadius = '4px'
            }
            let tables = document.getElementById('api3').querySelectorAll('table')
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
                    for (let j = 0; j < rows[i].cells.length; j++) {
                        let td = rows[i].cells[j]
                        td.style.border = 'solid #dddddd'
                        td.style.padding = '0 10px 0 10px'
                        td.style.borderWidth = '0px 1px 1px 0px'
                    }
                }
            }
            /* blocks.forEach((block) => {
                hljs.highlightBlock(block)
                block.style.padding = '10px'
                block.style.backgroundColor = '#f8f8f9'
                block.style.borderRadius = '4px'
            }) */
            /* let tables = document.getElementById('api3').querySelectorAll('table')
            tables.forEach((table) => {
                table.setAttribute('border', '1')
                table.style.borderCollapse = 'collapse'
                table.style.borderColor = '#dddee1'
            }) */
        }
    }
</script>

<style scoped>
</style>
