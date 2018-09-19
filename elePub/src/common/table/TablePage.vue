<template>
    <div>
        <!-- 表格 -->
        <Table
            ref="BWTable"
            border
            :stripe="stripe"
            :highlight-row="highlightRow"
            :loading="loading"
            :columns="columns"
            :data="data"
            @on-current-change="onCurrentChange"
            @on-select="onSelect"
            @on-select-cancel="onSelectCancel"
            @on-select-all="onSelectAll"
            @on-selection-change="onSelectionChange"
            @on-sort-change="onSortChange"
            @on-filter-change="onFilterChange"
            @on-row-click="onRowClick"
            @on-row-dblclick="onRowDbClick"
        >
        </Table>
        <!-- 分页 -->
        <Page
            class-name="bw-page"
            :current.sync="pagination.start"
            :total="total"
            :page-size="pagination.size"
            :show-total="showTotal"
            :page-size-opts="pageSizeOpts"
            :show-elevator="showElevator"
            show-sizer
            transfer
            @on-change="onChanged"
            @on-page-size-change="onPageSizeChanged"
        >
        </Page>
    </div>
</template>

<script>
    export default {
        name: 'TablePagination',
        data () {
            return {
                loading: false
            }
        },
        props: {
            pagination: {
                type: Object,
                default () {
                    return {
                        start: 1,
                        size: 10
                    }
                }
            },
            columns: {
                type: Array,
                // required: true,
                default () {
                    return []
                }
            },
            data: {
                type: Array,
                // required: true,
                default () {
                    return []
                }
            },
            // // 是否显示纵向边框
            // border: {
            //   type: Boolean,
            //   default: true,
            // },
            // // 是否显示间隔斑马纹
            stripe: {
                type: Boolean,
                default: true
            },
            // 是否支持高亮选中的行，即单选
            highlightRow: {
                type: Boolean,
                default: false
            },

            // 每页条数切换的配置
            pageSizeOpts: {
                type: Array,
                default () {
                    return [10, 20, 30, 40]
                }
            },
            total: {
                type: Number,
                default: 0
            },
            showTotal: {
                type: Boolean,
                default: true
            },
            showElevator: {
                type: Boolean,
                default: true
            }
        },
        computed: {
        },
        watch: {
            data: {
                handler () {
                    this.loading = false
                },
                deep: true
            }
        },
        methods: {
            // 开启 highlight-row 后有效，当表格的当前行发生变化的时候会触发
            // currentRow：当前高亮行的数据  oldCurrentRow：上一次高亮的数据
            onCurrentChange (currentRow, oldCurrentRow) {
                this.$emit('bw-current-change', currentRow, oldCurrentRow)
            },
            // 在多选模式下有效，选中某一项时触发
            // selection：已选项数据  row：刚选择的项数据
            onSelect (selection, row) {
                this.$emit('bw-select', selection, row)
            },
            // 在多选模式下有效，取消选中某一项时触发
            // selection：已选项数据  row：取消选择的项数据
            onSelectCancel (selection, row) {
                this.$emit('bw-select-cancel', selection, row)
            },
            // 在多选模式下有效，点击全选时触发
            // selection：已选项数据
            onSelectAll (selection) {
                this.$emit('bw-select-all', selection)
            },
            // 在多选模式下有效，只要选中项发生变化时就会触发
            // selection：已选项数据
            onSelectionChange (selection) {
                this.$emit('bw-selection-change', selection)
            },
            // 排序时有效，当点击排序时触发
            // column：当前列数据  key：排序依据的指标  order：排序的顺序，值为 asc 或 desc
            onSortChange (column, key, order) {
                this.$emit('bw-sort-change', column, key, order)
            },
            // 筛选时有效，筛选条件发生变化时触发
            // column：当前列数据
            onFilterChange (column) {
                this.$emit('bw-filter-change', column)
            },
            // 单击某一行时触发
            // row：当前行的数据  index：当前行的序号
            onRowClick (row, index) {
                this.$emit('bw-row-click', row, index)
            },
            // 双击某一行时触发
            // row：当前行的数据  index：当前行的序号
            onRowDbClick (row, index) {
                this.$emit('bw-row-db-click', row, index)
            },

            // 页码改变的回调，返回改变后的页码
            // pages 页码
            onChanged (page) {
                this.pagination.start = page
                this.$emit('myQuery', this.pagination)
            },
            // 切换每页条数时的回调，返回切换后的每页条数
            // pages-size
            onPageSizeChanged (pageSize) {
                this.pagination.size = pageSize
                this.$emit('myQuery', this.pagination)
            }
        }
    }
</script>

<style scoped>
    .bw-page {
        margin-top: 20px;
        float: right;
    }
</style>
