/*
* 分页和表格公共mixin
* @author gaoguoqing
*
*/
export default {
    data () {
        return {
            total: 0, // 数据总条数
            pagination: {
                start: 1, // 每页条数
                size: 10   // 页面容量
            }
        }
    },
    methods: {
        /**
         * 排序
         * @param column 排序开关
         * @return
         **/
        commonQuery (url, pagination) {
            if (this.commonChecked()) {
                let params = {
                    ...this.searchParams
                }
                params.start = pagination.start || 1
                params.size = pagination.size || 10
                return new Promise((resolve, reject) => {
                    this.http.post(url, params, res => {
                        if (res.success) {
                            // this.$Message.info('导出成功')
                            this.total = res.data.total // 改变全局值
                            this.pagination.size = params.size
                            this.pagination.start = params.start
                            resolve(res.data.results)
                        } else {
                            reject(res.message)
                        }
                    })
                }
                )
            }
        },
        commonChecked () {
            let searchParams = {
                ...this.searchParams
            }
            /* for (let key in searchParams) {
                if (searchParams[key] === '') {
                    let msgs = `${key} 不能为空`
                    this.$Message.error(msgs)
                    return false
                }
            } */
            return true
        }

    }
}
