---
aside: false
---

# searchLine

```vue
<template>
    <div class="bg">
        <div class="box" :class="state.expanded ? 'is-open' : ''" ref="changElement">
            <el-form ref="formRef" :inline="props.FormConfig.inline || false" :model="props.modelValue" :label-width="props.FormConfig.labelWidth || '140'" class="SearchLineformBox">
                <template v-for="item in props.FormConfig.FormList">
                    <p class="title" v-if="item.title && state.expanded">{{ item.title }}</p>
                    <el-form-item :label="item.label" :style="{ width: item.width ? item.width : '' }" v-if="!item.title" :prop="item.value">
                        <template v-if="item.type == 'slot'">
                            <slot :name="item.slot"></slot>
                        </template>
                        <template v-if="item.type == 'input'">
                            <el-input v-model="props.modelValue[item.value]" :placeholder="item.placeholder || ''" :clearable="item.clearable || false" />
                        </template>
                        <template v-if="item.type == 'datePicker'">
                            <datePicker :key="state.key" :clearable="item.clearable || false" v-model:startTime="props.modelValue[item.startTimeValue]" v-model:endTime="props.modelValue[item.endTimeValue]" :disabled-date="item['disabled-date']" />
                        </template>
                        <template v-if="item.type == 'timePicker'">
                            <timePicker :key="state.key" :clearable="item.clearable || false" v-model:startTime="props.modelValue[item.startTimeValue]" v-model:endTime="props.modelValue[item.endTimeValue]" :isRange="item.isRange" :format="item.format" :disabled-date="item['disabled-date']" />
                        </template>

                        <template v-if="item.type == 'select'">
                            <el-select v-model="props.modelValue[item.value]" @change="(v) => (item.onChange ? item.onChange(v) : '')" :collapse-tags="item.multiple" :clearable="item.clearable || false" :filterable="item.filterable || false" :multiple="item.multiple || false" :placeholder="item.placeholder || ''" :size="item.size || ''" :disabled="item.disabled">
                                <el-option v-for="option in item.options" :key="option[item.optionValue]" :label="option[item.optionLabel]" :value="option[item.optionValue]" />
                            </el-select>
                        </template>

                        <template v-if="item.type == 'NumberRange'">
                            <NumberRange v-model:start="props.modelValue[item.startValue]" v-model:end="props.modelValue[item.endValue]" :isInt="true">
                                <template #preUnit>{{ item.preUnit }}</template>
                                <template #nextUnit>{{ item.nextUnit }}</template>
                            </NumberRange>
                        </template> 
                        <template v-if="item.type == 'priceRange'">
                            <PriceRange v-model:start="props.modelValue[item.startValue]" v-model:end="props.modelValue[item.endValue]" />
                        </template>
                        <template v-if="item.type == 'checkbox'">
                            <el-checkbox v-model="props.modelValue[item.value]" :label="item.showLabel"></el-checkbox>
                        </template>
                    </el-form-item>
                </template>
            </el-form>

            <div class="btnBox">
                <el-button type="primary" :disabled="props.searchDisabled" @click="emits('searchClick')">查询</el-button>
                <el-button @click="reset">重置</el-button>
            </div>
        </div>

        <div v-if="state.showExpandButton" style="width: 100%; text-align: center;  background: var(--el-bg-color); padding-bottom: 10px">
            <el-link type="primary" @click="showAndHidden">
                <el-icon style="margin-right: 5px"><CaretTop v-if="state.expanded" /><CaretBottom v-if="!state.expanded" /></el-icon>
                {{ state.expanded ? "收起" : "展开" }}
            </el-link>
        </div>
    </div>
</template>
<script setup>
    import { CaretBottom, CaretTop } from "@element-plus/icons-vue"; 
    import datePicker from "@/components/Form/datePicker.vue";
    import timePicker from "@/components/Form/timePicker.vue"; 
    import NumberRange from "@/components/Form/NumberRange.vue";
    import PriceRange from "@/components/Form/PriceRange.vue"; 
    import { nextTick } from "vue";
    const emits = defineEmits(["searchClick"]);
    const props = defineProps({
        modelValue: {
            type: Object,
            default() {
                return {};
            },
        },
        FormConfig: {
            type: Object,
            default() {
                return {
                    inline: false,
                };
            },
        },
        searchDisabled: {
            type: Boolean,
            default: false,
        },
    });

    const changElement = ref(null);
    const formRef = ref(null);

    const state = reactive({
        expanded: true,
        showExpandButton: false,
        allHeight: 0,
        key: "1",
    });

    const showAndHidden = () => {
        const con = changElement.value;

        if (state.expanded) {
            con.style.height = 40 + "px";
            state.expanded = false;
        } else {
            state.expanded = true;

            con.style.height = state.allHeight;
        }
    };
    const reset = () => {
        formRef.value.resetFields();

        props.FormConfig.FormList.forEach((element) => {
            if (element.type == "timePicker" || element.type == "datePicker") {
                props.modelValue[element.startTimeValue] = "";
                props.modelValue[element.endTimeValue] = "";
                state.key = state.key + 1;
            }
        });
    };
    document.addEventListener("keyup", (e) => {
        if (e.key == "Enter") {
            emits("searchClick");
        }
    });

    onMounted(() => {
        // 计算高度
        const con = changElement.value;
        state.allHeight = con.offsetHeight + "px";
        if (con.offsetHeight > 70) {
            state.showExpandButton = true;
            con.style.height = 40 + "px";
            con.style.overflow = "hidden";

            nextTick(() => {
                state.expanded = false;
            });
        }
    });
</script>
<style lang="scss" scoped>
    .bg {
        // padding: 10px 10px;
        box-sizing: border-box;
    }
    .box {
        display: flex;
        transition: height ease 0.3s;
        overflow-y: hidden;
        background: var(--el-bg-color);
        padding-top: 10px;

        .btnBox {
            margin-left: 10px;
            margin-right: 10px;
        }
    }
    .is-open {
        height: auto;
    }
    .SearchLineformBox {
        box-sizing: border-box;
        flex: 1;
        .title {
            line-height: 20px;
            color: #333333;
            // font-weight: 400;
            font-size: 14px;
            margin-bottom: 10px;
            padding-left: 20px;
            font-weight: bold;
        }
        .el-form-item {
            width: 33%;
            margin: 0 0 10px 0;
        }
    }
</style>

```

datePicker.vue
```vue

<template>
    <el-date-picker v-model="state.timeArry" :clearable="props.clearable || false" type="daterange" range-separator="-" start-placeholder="请选择开始时间" end-placeholder="请选择结束时间" @change="changeTime" />
</template>

<script setup>
    import dayjs from "dayjs";
    const props = defineProps(["startTime", "endTime", "clearable"]);
    const emits = defineEmits(["update:startTime", "update:endTime"]);

    const state = reactive({
        timeArry: [props.startTime, props.endTime],
    });


    watch(
        () => props.startTime,
        (newValue, oldValue) => {
            state.timeArry = [props.startTime, props.endTime];

            changeTime(state.timeArry)

        }
    );

    const changeTime = (v) => {
        if (v&&v[0]) {
            emits("update:startTime", dayjs(v[0]).format("YYYY-MM-DD 00:00:00"));
            emits("update:endTime", dayjs(v[1]).format("YYYY-MM-DD 23:59:59"));
        } else {
            emits("update:startTime", "");
            emits("update:endTime", "");
        }
    };

    changeTime(state.timeArry)

</script>

```