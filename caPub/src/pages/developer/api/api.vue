<template>
  <div id="api">
    <vue-markdown  :source="content"></vue-markdown>
  </div>
</template>

<script>
    import VueMarkdown from 'vue-markdown'
    import hljs from 'highlight.js'
    import 'highlight.js/styles/googlecode.css'
    export default {
        name: 'api',
        data () {
            return {
                content: ''
            }
        },
        components: {
            VueMarkdown
        },
        created () {
            this.content = `
    开发者获取授权
    印章状态查询
    印章吊销列表查询
`
        },
        mounted () {
            let blocks = document.getElementById('api').querySelectorAll('pre code')
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
            let tables = document.getElementById('api').querySelectorAll('table')
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
