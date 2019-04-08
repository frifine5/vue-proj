<template>
    <div class="checkboxgroup">
        <CheckBoxGroup :model.sync="currentChecked">
            <CheckBox v-for="(item, index) in checkboxList" :value="item.label" :key="index" :disabled="disabled">
                <div><slot></slot></div>
            </CheckBox>
        </CheckBoxGroup>
    </div>
</template>

<script>
    export default {
        name: 'LabelCheckBox',
        data () {
            return {
                currentChecked: this.checkboxValue
            }
        },
        props: {
            checkboxList: {
                type: Array,
                default: () => {
                    return []
                }
            },
            checkboxValue: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            checkboxValue: () => {
                this.currentChecked = this.checkboxValue
            }
        }
    }
</script>

<style scoped>

</style>
