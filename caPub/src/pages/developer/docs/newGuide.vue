<template>
    <div class="doc-wrap">
       <h4>新手指引</h4>
       <p>本系统提供注册和不注册两种方式调用接口，非注册用户只能调用印章状态查询接口，为提供更优质的服务建议注册成为用户。</p>
       <div>
           <section>
               <h5>1、用户注册</h5>
               <p>不注册调用接口可跳过此部分。登陆电子印章状态发布子系统进入首页，如有账号即可立即登录，没有账号可立即注册成为用户。</p>
               <div><img src="../../../assets/images/new-guide1.png" alt=""></div>
           </section>
           <section>
               <h5>2、后台运营注册用户审核</h5>
               <p>不注册调用接口可跳过此部分。电子印章状态发布子系统的注册用户需要运营后台进行审核，审核后用户方可进行登录。用户登录后可以查看appkey、appsecret以及用户盐值，用户可以使用该信息进行接入API操作。</p>
               <div><img src="../../../assets/images/new-guide2.png" alt=""></div>
           </section>
           <section>
               <h5>3、用户授权</h5>
               <p>不注册调用接口可跳过此部分。用户信息授权主要是为了获取访问用户数据的授权令牌 Access Token，便于用户处理自身业务逻辑的时候使用，例如：查询印章状态、查询印章吊销列表等。</p>
               <p>授权步骤：</p>
               <p>1）.申请为用户，获取到appkey和appsecret</p>
               <p>2）.通过http协议直接访问指定的授权服务器</p>
               <p>3）.授权采用密码加密的形式返回token值</p>
               <p>4）.用户通过获取到的token，接入电子印章状态发布系统进行API操作</p>
           </section>
           <section>
               <h5>4、签名值设置</h5>
               <p>为了防止 API 调用过程中被黑客恶意篡改，调用任何一个 API 都需要携带签名，服务端会根据请求参数，对签名进行验证，签名不合法的请求将会被拒绝。用户可以参照电子印章状态发布子系统公共参数sign签名说明进行签名设置</p>
               <p>1）.对所有API请求参数（公共参数，但除去sign参数和byte[]类型的参数），根据参数名称的ASCII码表的顺序排序。如：foo=1, bar=2, foo_bar=3, foobar=4排序后的顺序是bar=2, foo=1, foo_bar=3, foobar=4。</p>
               <p>2）.将排序好的参数名和参数值拼装在一起，根据上面的示例得到的结果为：bar2foo1foo_bar3foobar4。</p>
               <p>3）在上述拼接后的字符串后继续拼接请求API的业务参数body，如bar2foo1foo_bar3foobar4+body。</p>
               <p>4）.对上述拼接的字符串使用utf-8编码获取字节数组，使用MD5算法对字节数组进行签名。</p>
           </section>
       </div>
    </div>
</template>

<script>
    export default {
        name: 'newGuide'
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
    h5{
       font-size: 20px;
    }
    p{
        margin: 16px 0;

    }
    section div{
        text-align: center;
    }
</style>
