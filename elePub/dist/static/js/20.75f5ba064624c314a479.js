webpackJsonp([20],{bjDc:function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});s("/wAz");var i={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",[s("div",{staticClass:"maskBox",class:{hidden:t.maskShow}}),t._v(" "),s("div",{staticClass:"center-width"},[s("div",{staticClass:"seal-wrap"},[s("h2",[t._v("电子印章状态发布子系统")]),t._v(" "),s("div",{staticClass:"panel send-email"},[s("h3",[t._v("邮箱验证")]),t._v(" "),s("i",{staticClass:"font_family icon-youxiang"}),t._v(" "),s("div",{staticStyle:{color:"#1c2438","font-size":"14px"}},[t._v("设置新密码的链接已发送至"),s("span",{staticClass:"email"},[t._v(t._s(t.email))])]),t._v(" "),s("p",{staticStyle:{color:"#9EA7B4","margin-bottom":"20px"}},[t._v("请您在5分钟之内登录邮箱，点击邮箱内的链接设置新密码")]),t._v(" "),s("Button",{staticClass:"btn",attrs:{type:"primary"},on:{click:t.back}},[t._v("返回")]),t._v(" "),s("p",{staticClass:"bot"},[t._v("*目前仅支持通过邮箱找回密码，如邮箱不可用，请联系管理员")])],1)])])])},staticRenderFns:[]};var e=s("VU/8")({name:"SendEmail",data:function(){return{maskShow:!0,email:""}},mounted:function(){this.$route.query.email?this.email=this.$route.query.email:this.email="*******"},methods:{back:function(){this.$router.push({path:"/pwd/findPwd-1"})}}},i,!1,function(t){s("mVWT")},"data-v-1e4b3cd8",null);a.default=e.exports},mVWT:function(t,a){}});