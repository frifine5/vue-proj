export default {
    manage: {
        register: '/manage/company/register', // 注册接口
        login: '/manage/company/login', // 登录
        logout: '/manage/company/loginOut' // // 退出
    },
    seal: {
        sealStatus: {
            sealQuery: '/seal/seal/pages/status/query', // 印章状态查询
            sealsQuery: '/seal/seal/seals/query', // 根据公司社会信用号查询印章信息
            sealNameQuery: '/seal/seal/query', // 根据印章名称查询印章信息
        },
        sealChange: {
            historyQuery: '/seal/seal/history/query' // 印章变更历史状态查询
        },
        deative: {
            deativeToImg: '/seal/seal/createPdf'
        },
        q: {
            list: '/seal/qList', // 查列表
            detail: '/seal/qDetail', // 查详情
        }
    },
    ca:{
        apy: '/app/certApply',          // 申请信息上传记录到库
        imdSCert: '/app/reqCertByBpk',  // 申请信息上传并立即获得单证书
    },
    pwd: {
        sendEmail: '/manage/user/sendEmail',
        resetPwd: '/manage/user/passwordReset'
    }
}
