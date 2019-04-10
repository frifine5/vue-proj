import Vue from 'vue'
import Router from 'vue-router'

const Index = () => import('@/pages/Index')
const Login = () => import('@/pages/login/Login')
const Register = () => import('@/pages/login/Register')
const DeveloperCenter = () => import('@/pages/developer/DeveloperCenter')
const DocumentCenter = () => import('@/pages/developer/DocumentCenter')
const DocumentHome = () => import('@/pages/developer/docsHome')
const NewGuide = () => import('@/pages/developer/docs/newGuide')
const AccessDoc = () => import('@/pages/developer/docs/accessDoc')
const APIIntroduce = () => import('@/pages/developer/APIIntroduce')
const API1 = () => import('@/pages/developer/api/API1')
const API2 = () => import('@/pages/developer/api/API2')
const API3 = () => import('@/pages/developer/api/API3')
const sealQuery = () => import('@/pages/sealManagement/sealStatus/SealQuery')
const sealStatus = () => import('@/pages/sealManagement/sealStatus/SealStatus')
const changeQuery = () => import('@/pages/sealManagement/statusManage/ChangeQuery')
const changeLog = () => import('@/pages/sealManagement/statusManage/ChangeLog')
const statusChange = () => import('@/pages/sealManagement/statusManage/StatusChange')

const findPwd = () => import('@/pages/GetPwd')
const findPwd1 = () => import('@/pages/pwd/BackPwd')
const findPwd2 = () => import('@/pages/pwd/SendEmail')
const setPwd = () => import('@/pages/pwd/SetPwd')
const setPwdSuccess = () => import('@/pages/pwd/setSuccess')
const setPwdError = () => import('@/pages/pwd/setError')




/* 自助使用向导*/
const selfGuide = () => import('@/pages/guide/SelfGuide')

/* 二维码服务 */
const trasQrcode = () => import('@/pages/qrcode/TrasQrcode')
const makeQrcodePic = () => import('@/pages/qrcode/MakeQrcodePic')


/* 证书申请流程 页*/
const caApply = () => import('@/pages/ca/apy/CaApply')
const caApyUnit = () => import('@/pages/ca/apy/CaApyUnit')
const caApyView = () => import('@/pages/ca/apy/CaApyView')
const caApyUnitResult = () => import('@/pages/ca/apy/CaApyResult')
// const apyCaPreSub = () => import('@/pages/ca/apy/ApyPreSub')


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index,
            children: [

                {
                    path: '/guide',
                    name: 'sealGuide',
                    component: selfGuide
                },{
                    path: '/ca/apy',
                    name: 'caReq',
                    component: caApply,
                    children: [
                        {
                            path: '/ca/apy/caApyUnit',
                            name: 'caApyUnit',
                            component: caApyUnit
                        },
                        {
                            path: '/ca/apy/caApyView',
                            name: 'caApyView',
                            component: caApyView
                        },
                        {
                            path: '/ca/apy/caApyUnitResult',
                            name: 'caApyUnitResult',
                            component: caApyUnitResult
                        },

                    ]
                },



                {
                    path: '/qrCode/doTranslate',
                    name: 'trasQrcode',
                    component: trasQrcode
                },
                {
                    path: '/qrCode/doMakePic',
                    name: 'makeQrcodePic',
                    component: makeQrcodePic
                },


                {
                    path: '/seal/query',
                    name: 'sealQuery',
                    component: sealQuery
                },
                {
                    path: '/seal/query/status',
                    name: 'sealStatus',
                    component: sealStatus
                },
                {
                    path: '/change/query',
                    name: 'changeQuery',
                    component: changeQuery
                },
                {
                    path: '/change/query/log',
                    name: 'changeLog',
                    component: changeLog
                },
                {
                    path: '/change/status',
                    name: 'statusChange',
                    component: statusChange
                },
                {
                    path: '/login',
                    name: 'Login',
                    component: Login
                },
                {
                    path: '/register',
                    name: 'Register',
                    component: Register
                },
                {
                    path: '/developer',
                    name: 'DeveloperCenter',
                    component: DeveloperCenter
                },
                {
                    path: '/document',
                    name: 'DocumentCenter',
                    component: DocumentCenter
                },
                {
                    path: '/docs',
                    name: 'DocumentHome',
                    component: DocumentHome,
                    meta: {
                        breadcrumbName: '文档中心'
                    },
                    children: [

                        {
                            path: '/docs/newGuide',
                            name: 'NewGuide',
                            component: NewGuide,
                            meta: {
                                breadcrumbName: '新手指引'
                            }
                        },
                        {
                            path: '/docs/accessDoc',
                            name: 'AccessDoc',
                            component: AccessDoc,
                            meta: {
                                breadcrumbName: '接前文档'
                            }
                        }
                    ]
                },
                {
                    path: '/apis',
                    name: 'APIIntroduce',
                    component: APIIntroduce,
                    meta: {
                        breadcrumbName: 'API介绍'
                    },
                    children: [
                        {
                            path: '/apis/api1',
                            name: 'API1',
                            component: API1,
                            meta: {
                                breadcrumbName: '印章状态查询'
                            }
                        },
                        {
                            path: '/apis/api2',
                            name: 'API2',
                            component: API2,
                            meta: {
                                breadcrumbName: '签章认证查询'
                            }
                        },
                        {
                            path: '/apis/api3',
                            name: 'API3',
                            component: API3,
                            meta: {
                                breadcrumbName: '印章吊销下载文件'
                            }
                        }
                    ]
                }
            ]
        },
        {
            path: '/pwd',
            name: 'findPwd',
            component: findPwd,
            children: [
                {
                    path: '/pwd/findPwd-1',
                    name: 'findPwd1',
                    component: findPwd1
                },
                {
                    path: '/pwd/findPwd-2',
                    name: 'findPwd2',
                    component: findPwd2
                },
                {
                    path: '/pwd/setPwd',
                    name: 'setPwd',
                    component: setPwd
                },
                {
                    path: '/pwd/setSuccess',
                    name: 'setPwdSuccess',
                    component: setPwdSuccess
                },
                {
                    path: '/pwd/setError',
                    name: 'setPwdError',
                    component: setPwdError
                }
            ]
        }
    ]
})
