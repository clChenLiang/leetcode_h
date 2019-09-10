<template>
    <div v-if="suggestions.length" class="auto-complete-drop" :style="{width: parentWidth}">
        <div class="suggestion-item"
            v-for="item in suggestions"
            :key="item"
            @click="confirmOne(item)">
            {{suggestion[item]}}
        </div>
    </div>
    <!-- 无数据时，另一种形式 -->
    <div v-else class="default-no-data">无数据</div>
</template>
<script>
export default {
    name: 'AutoCompleteSuggestion',
    props: {
        // 建议列表
        suggestions: {
            type: Array,
            default: () => []
        },
        // 搜索的输入值，用来控制显隐
        keys: {
            type: String,
            default: () => ''
        }
    },
    data(){
        return {
            // 宽度与 input 保持一致
            parentWidth: "100px",
            // 控制自己的显示开关
            showSelf: false,
            curSelect: ''
        }
    },
    watch: {
        'keys' (val) {
            this.showSelf = !!val
        }
    },
    methods: {
        // 选中
        confirmOne(val) {
            // 变更向上传递
            this.$emit('confirmOne', this.suggestions[val])
            this.showSelf = false
        }
    }
}
</script>
