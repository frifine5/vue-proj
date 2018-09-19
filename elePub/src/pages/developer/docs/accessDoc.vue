<template>
    <div class="doc-wrap">
        <h4>接前说明</h4>
        <p>平台提供的所有接口只适用于电子印章状态发布子系统，提供注册和不注册两种方式调用接口，非注册用户只能调用印章状态查询接口，为提供更优质的服务建议注册成为用户。注册成为用户必须具有企业资质文件才可以申请入驻开发平台，电子印章状态发布子系统采用标准的oauth2.0 进行授权，授权成功后，返回token，在token的有效期之内都可以进行数据的访问，为更好的满足用户的接入体验，电子印章状态发布子系统运营人员会提供给用户联调账号，帮助用户快速的使用平台提供的API。
        </p>
        <div>
            <img src="../../../assets/images/access.png" alt="">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'accessDoc',
        data () {
            return {
                content: ''
            }
        }
    }
</script>

<style scoped>
    h4{
        font-size: 30px;
        margin: 40px 0 20px;
    }
    .doc-wrap{
        margin: 0 0 60px 16px;
        font-size: 14px;
        color: #1c2438;
    }
    p{
        margin: 16px 0;

    }
    section div{
        text-align: center;
    }
</style>
