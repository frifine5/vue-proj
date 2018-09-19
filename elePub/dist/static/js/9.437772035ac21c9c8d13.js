webpackJsonp([9],{YiX3:function(n,e){},cyG1:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=t("Xoog"),r=t.n(i),a=t("V8mf"),s=t.n(a),o=(t("FBSW"),{name:"api3",data:function(){return{content:""}},components:{VueMarkdown:r.a},created:function(){this.content='# 三、印章吊销列表查询\n\n接口路径：/router/rest/v1\n\n请求方式：HTTP POST\n\n请求头域：Content-Type application/json\n\n请求参数(JSON格式)：\n\n## 1、公共参数\n|名称|类型|是否必须|描述|\n|----|----|----|----|\n|method|String|是|接口名称。DB.seal.deactive.list.query|\n|appKey|String|是|给用户颁发的 appkey。|\n|username|String|是|用户账户名。|\n|sign|String|是|请求签名，使用md5，用于安全控制，详见文档中心-新手指引。|\n|token|String|是|token 用于调用接口前授权检查。|\n|timestamp|String|是|Unix时间戳，格式为yyyyMMddHHmmss。|\n|format|String|否|响应格式。默认为json格式。 |\n|version|String|是|版本 目前为1.0|\n|type|String|否|请求类型，默认 sync。|\n\n\n\n## 2、业务参数（JSON格式）\n\n|ID|类型|是否必须|描述|\n|----|----|----|----|----|\n|queryStartTime|String|是|查询起始时间 格式yyyy-MM-dd HH:mm:ss|\n|queryEndTime|String|是|查询截止时间 格式yyyy-MM-dd HH:mm:ss|\n|pageSize|int|是|吊销列表每页数据量|\n|pageNow|int|是|吊销列表当前页数|\n\n\n## 3、返回数据（JSON格式）\n\n|ID|名称|类型|描述|\n|----|----|----|----|----|\n| version | 发布版本 | String |可以为系统版本|\n| invalidEffectTime | 生效日期 | String |本次查询生效时间，格式yyyy-MM-dd HH:mm:ss |\n| nextUpdateTime | 下一次更新日期 | String |建议更新时间，一般为1个月，格式yyyy-MM-dd HH:mm:ss |\n| signature | 签名值 | String |签名值 |\n| signAlgorithm | 签名算法 | String |统一为SM9 |\n| signHashAlgorithm | 签名摘要算法 | String |统一为SM3 |\n| secretKey | 签名公钥 | String |sm9签名公钥 |\n| userId | 用户标识 | String |sm9签名用户标识 |\n| awardCompany | 颁发机构 | String |公司名称 |\n| total | 总数 | int |分页需要 |\n| size | 当前查询条数 | int |分页需要 |\n| revocationList |吊销列表节点|list| | |\n| sealCode |印章序列号|String| 印章唯一编码 |\n| sealName |印章名称|String| |\n| revocationTime |吊销时间|String|格式yyyy-MM-dd HH:mm:ss |\n\n\n## 4、请求路径示例\n\n\n```\nhttp://localhost:9000/router/rest/v1?method=DB.seal.deactive.list.query&version=1.0&appKey=100001&format=json&timestamp=20180713131153&token=1e7fa7fe-2947-4402-8c3b-2c6c86e8ff60&type=sync&username=cyw002&sign=7223384D078A393003CD32DA1172DDB6\n```\n\n\n\n\n## 5、请求参数JSON示例\n\n```javascript\n{\n    "queryStartTime":"2018-05-05 10:00:00",\n    "queryEndTime":"2018-05-10 10:00:00",\n    "pageSize":10,\n    "pageNow":1\n}\n```\n\n## 6、返回数据JSON示例\n\n```javascript\n{\n    "method": "DB.seal.deactive.list",\n    "requestId": "9e100afd-3f7e-4f55-aaee-7a1f9bce71c8",\n    "code": 0,\n    "data": [\n        {\n            "version": "V1.0",\n            "invalidEffectTime": "2018-05-29 17:04:36",\n            "nextUpdateTime": "2018-06-29 17:04:36",\n            "signature": "wdwqweqwew11dqqw=",\n            "signAlgorithm": "SM9",\n            "signHashAlgorithm":"SM3",\n            "secretKey": "JKJDKAJDKAJKJAKAD",\n            "userId":"JCKLSCJDCV=",\n            "awardCompany": "国家电子政务平台",\n            "revocationList": [\n                {\n                    "sealCode": "1234567890123456789",\n                    "sealName": "测试章1",\n                    "revocationTime": "2018-05-08 00:00:00"\n                },\n                {\n                    "sealCode": "12345671012345678",\n                    "sealName": "测试章2",\n                    "revocationTime": "2018-05-08 00:00:00"\n                },\n                {\n                    "sealCode": "123456713123456789",\n                    "sealName": "测试章3",\n                    "revocationTime": "2018-05-08 00:00:00"\n                }\n            ],\n            "total": 10,\n            "size": 3\n        }\n    ],\n    "message": "调用[印章吊销列表获取]接口成功！"\n}\n```  '},mounted:function(){for(var n=document.getElementById("api3").querySelectorAll("pre code"),e=0;e<n.length;e++){var t=n[e];s.a.highlightBlock(t),t.style.padding="10px",t.style.backgroundColor="#f8f8f9",t.style.borderRadius="4px"}for(var i=document.getElementById("api3").querySelectorAll("table"),r=0;r<i.length;r++){var a=i[r];a.style.borderCollapse="collapse",a.style.width="100%",a.style.textAlign="left",a.style.border="solid #dddddd",a.style.borderWidth="1px 0px 0px 1px";for(var o=a.rows,d=0;d<o.length;d++)for(var l=0;l<o[d].cells.length;l++){var y=o[d].cells[l];y.style.border="solid #dddddd",y.style.padding="0 10px 0 10px",y.style.borderWidth="0px 1px 1px 0px"}}}}),d={render:function(){var n=this.$createElement,e=this._self._c||n;return e("div",{staticClass:"container",attrs:{id:"api3"}},[e("vue-markdown",{attrs:{source:this.content}})],1)},staticRenderFns:[]};var l=t("VU/8")(o,d,!1,function(n){t("YiX3")},"data-v-7cf76eaf",null);e.default=l.exports}});