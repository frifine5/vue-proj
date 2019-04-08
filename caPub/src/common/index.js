import IconComponent from './icon/icon'
import ButtonComponent from './button/Button'
import InputComponent from './input/LableInput'
import SelectComponent from './select/LableSelect'
import TableComponent from './table/TablePage'
import ModalComponent from './modal/Modal'
import CheckboxComponent from './checkbox/LabelCheckBox'
import ColorPickerComponent from './color/colorPicker'

const MyIcon = {
    install: (Vue) => {
        Vue.component('MyIcon', IconComponent)
    }
}

const MyButton = {
    install: function (Vue) {
        Vue.component('MyButton', ButtonComponent)
    }
}

const MyInput = {
    install: function (Vue) {
        Vue.component('MyInput', InputComponent)
    }
}

const MySelect = {
    install: function (Vue) {
        Vue.component('MySelect', SelectComponent)
    }
}

const MyTable = {
    install: function (Vue) {
        Vue.component('MyTable', TableComponent)
    }
}

const MyModal = {
    install: function (Vue) {
        Vue.component('MyModal', ModalComponent)
    }
}

const MyCheckbox = {
    install: function (Vue) {
        Vue.component('MyCheckbox', CheckboxComponent)
    }
}

const MyColorPicker = {
    install: function (Vue) {
        Vue.component('MyColorPicker', ColorPickerComponent)
    }
}


export {MyIcon, MyButton, MyInput, MySelect, MyTable, MyModal, MyCheckbox, MyColorPicker}
