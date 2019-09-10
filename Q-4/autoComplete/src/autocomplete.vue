<template>
<div class="auto-complete">
    <!-- 因为单独实现一个 autocomplete，固此处使用 input 代替 el-input -->
    <div>
        <input
            ref="input"
            v-model="input"
            :placeholder="tips.input"
            @icon-click="clearInput"/>
            <!-- 假设图标宽为 24 px -->
            <i v-show="input.length" class="icon-clear" style="margin-left: -24px;"></i>
    <div>
    <!-- 建议框 -->
    <suggestion
        style="margin-top: 4px;"
        ref="suggestion"
        :keys="input"
        @comfirmOne="comfirm"
        :suggestions="suggestions">
    </suggestion>
</div>
</template>
<script>
import Suggestion from './autocomplete-suggestion'
export default {
    name: 'AutoComplete',
    components: {
        Suggestion
    },
    props: {
        // AutoComplete 组件暴露的接口
        getData: {
            type: Function,
            // 默认一条，自身的数组
            default: (val) => [val]
        }
    },
    data() {
        return {
            // 最关键的字段，输入框输入
            input: '',
            // 提示用语集合，便于统一处理
            tips: {
                input: '请输入'
            },
            // 下拉框的内容
            suggestions: [],
        }
    },
    methods: {
        // 消除输入
        clearInput() {
            this.input = ''
        },
        // 根据参数给出建议的
        async getSuggestionData(val) {
            // 可以多种方式获取。如 LocalStorage, 服务器远程调用
            this.suggestions = await getData(val)
        },
        comfirm(val) {
            // 防止选中后，input 变化再导致请求数据
            if(this.input === val) {
                this.justConfirm = true
            }
            this.input = val;
        }
    },
    mounted() {
        // 定宽
        this.$refs.suggestion.parentWidth = this.$refs.input.$el.querySelector('input').clientWidth
    },
    watch: {
        'input' (val) {
            // 来源于 Confirm 的变化，不获取数据
            if (this.justConfirm) {
                this.justConfirm = false;
                return
            }
            if (!val.length) {
                this.suggestions = []
            } else {
                this.getSuggestionData(val)
            }
        }
    }
}
</script>
