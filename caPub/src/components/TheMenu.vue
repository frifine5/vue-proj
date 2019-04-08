<template>
    <div class="menu-wrap">
        <ul class="nav">
            <li v-for="(items, index) in list" :key="index" class="items-nav" :class="{act: index === nowIndex}" @click="tabToggle('click', index)" @mouseover="tabToggle('mouse', index)"  @mouseleave="dropShow(index)">
                <ul v-if="items.children" class="drop-nav" :class="{hidden: index === 1?showDrop1:index === 2?showDrop2: index ===3 ? showDrop3 :true}" @mouseleave="dropShow(index)">
                    <li v-for="(item, i) in items.children" :key="i"  class="item-nav">
                        <!--<a :href="item.url">{{item.name}}</a>-->
                        <router-link :to="item.url">{{item.name}}</router-link>
                    </li>
                </ul>
                <router-link v-if="!items.children" :to="items.url">{{items.name}}</router-link>
                 <a href="javascript:;" v-else @click="(event) => event.preventDefault() ">{{items.name}}</a>
               <!-- <a :href="items.url">{{items.name}}</a>-->
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'the-menu',
        data () {
            return {
                list: [
                    {
                        name: '使用向导',
                        url: '/guide'
                    },
                    {
                        name: '证书申请服务',
                        url: '/caReq',
                        children: [
                            {name: '证书申请', url: '/ca/apy/caApyUnit'},
                            {name: '证书制作', url: '/ca/list'},
                        ]
                    },
                    {
                        name: '证书查询服务',
                        url: '/caQue',
                        children: [
                            {name: '证书查询/下载', url: '/ca/que'},
                            {name: '吊销列表下载', url: '/crl/list'},
                        ]
                    },
                    {
                        name: '二维码自助服务',
                        url: '/qrCode',
                        children: [
                            {name: '扫描识别信息', url: '/qrCode/doTranslate'},
                            {name: '生成二维码图', url: '/qrCode/doMakePic'}
                        ]
                    },
                ],
                // opened: ['导引'],
                nowIndex: 0,
                mouseIndex: '',
                showDrop1: true,
                showDrop2: true,
                showDrop3: true,
                showDrop4: true
            }
        },
        methods: {
            /*  select (name) {
                this.$router.push({path: name})
            }, */
            tabToggle (e, index) {
                if (e === 'click') {
                    this.nowIndex = index
                } else {
                    this.mouseIndex = index
                }
                if (index === 1) {
                    this.showDrop1 = false
                    this.showDrop2 = true
                    this.showDrop3 = true
                    this.showDrop4 = true
                } else if (index === 2) {
                    this.showDrop1 = true
                    this.showDrop2 = false
                    this.showDrop3 = true
                    this.showDrop4 = true
                } else if (index === 3){
                    this.showDrop1 = true
                    this.showDrop2 = true
                    this.showDrop3 = false
                    this.showDrop4 = true
                }else{
                    this.showDrop1 = true
                    this.showDrop2 = true
                    this.showDrop3 = true
                    this.showDrop4 = false
                }
            },
            dropShow (index) {
                if (index === 1) {
                    this.showDrop1 = true
                } else if (index === 2) {
                    this.showDrop2 = true
                } else if (index === 3) {
                    this.showDrop3 = true
                } else if (index === 4) {
                    this.showDrop4 = true
                }
            }
        },
        mounted () {
            let hash = location.hash
            let stingStrHash = hash.substring(1)
            let u1 = stingStrHash.split("/")
            switch (u1[1]) {
                case 'guide': this.nowIndex = 0
                break
                case 'caReq': this.nowIndex = 1
                break
                case 'caQue': this.nowIndex = 2
                break
                case 'qrCode': this.nowIndex = 3
                break
            }
        }
    }
</script>

<style scoped lang="scss">
    .menu-wrap{
    }
    .items-nav{
        float: left;
        position: relative;
    }
    .items-nav:nth-child(3){
       /* float: right;*/
    }
    .items-nav > a{
        font-size: 14px;
        color: #FFFFFF;
        padding: 0 16px ;
        display: inline-block;
        line-height: 66px;
        cursor: pointer;
    }
    .items-nav > a:hover{
        border-bottom: 4px solid #52b7fc;
    }
    .items-nav.act > a{
        border-bottom: 4px solid #52b7fc;
    }
    .drop-nav{
        width: 100%;
        position: absolute;
        left: 0;
        top: 70px;
        background: #FFFFFF;
        box-shadow: 0 4px 16px 0 rgba(0,0,0,0.10);
        z-index: 5;
    }
    .item-nav > a{
        display: inline-block;
        font-size: 12px;
        color: #405060;
        width: 100%;
        cursor: pointer;
    }
    .item-nav{
        padding: 12px 0 12px 8px;
    }
    .item-nav:hover > a{
        border-right: 1px solid #004098;
        color: #004098;
    }
    .hidden{
        display: none;
    }
    .items-nav > a:hover .drop-nav{
        transform: translate3d(0 , 0, 0);
    }
</style>
