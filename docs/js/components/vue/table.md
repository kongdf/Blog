---
aside: false
editLink: true
---
# el-table二次封装
```vue
<template>
    <el-table id="ElTable" :data="props.tableList" style="width: 100%" border :size="props.size" :height="props.height || state.calcHeight || 'auto'" :row-class-name="props.rowClassName">
        <template v-for="colConfig in props.columns">
            <slot v-if="colConfig.slot" :name="colConfig.slot"></slot>
            <el-table-column v-else :show-overflow-tooltip="colConfig['show-overflow-tooltip']" :sortable="colConfig.sort" :align="colConfig.align" v-bind="colConfig">
                <template #header>
                    <YzlTableCell v-if="colConfig.headerRenderer" :renderer="(h) => colConfig.headerRenderer(h)"></YzlTableCell>
                    <span v-else-if="colConfig.headerFormatter" v-html="colConfig.headerFormatter()"></span>
                    <span v-else-if="colConfig.isMoney">{{ colConfig.label.indexOf("元") > -1 ? colConfig.label : colConfig.label + "(元)" }}</span>
                    <span v-else>{{ colConfig.label }}</span>
                </template>
                <template v-slot="scope">
                    <template v-if="colConfig.formatter">
                        <span v-html="colConfig.formatter(scope.row[colConfig.prop], scope.row, colConfig.prop, scope)"></span>
                    </template>

                    <template v-else-if="colConfig.link">
                        <el-link v-if="scope.row[colConfig.prop]" type="primary" @click="linkTo(colConfig.link, scope.row[colConfig.linkBy])">{{ scope.row[colConfig.prop] }}</el-link>
                        <span v-else>-</span>
                    </template>
                    <YzlTableCell v-else-if="colConfig.renderer" :renderer="(h) => colConfig.renderer(h, scope)"></YzlTableCell>
                    <template v-else-if="colConfig.rowSlot">
                        <div>
                            <slot :scope="scope"></slot>
                        </div>
                    </template>
                    <template v-else-if="colConfig.isMoney">
                        <span>￥{{ colConfig.isBranch ? ((scope.row[colConfig.prop] || 0) / 100).toFixed(2) : (scope.row[colConfig.prop] * 1 || 0).toFixed(2) }}</span>
                    </template>

                    <template v-else-if="colConfig.rowspan">
                        <span v-if="!scope.row[colConfig.prop]">-</span>

                        <span v-else-if="scope.row[colConfig.prop] instanceof Array ? scope.row[colConfig.prop].length == 0 : scope.row[colConfig.prop].split(',').length == 0">-</span>
                        <template v-else v-for="(item, index) in scope.row[colConfig.prop] instanceof Array ? scope.row[colConfig.prop] : scope.row[colConfig.prop].split(',')" :key="index">
                            <p>{{ colConfig.rowspanMoney ? colConfig.rowspanMoney : "" }}{{ colConfig.field ? item[colConfig.field] : item }}</p>
                        </template>
                    </template>
                    <template v-else>{{ scope.row[colConfig.prop] === undefined || scope.row[colConfig.prop] === null || scope.row[colConfig.prop] === "" ? "-" : scope.row[colConfig.prop] }} </template>
                </template>
            </el-table-column>
        </template>
    </el-table>
</template>
<script setup>
    import { nextTick, onMounted } from "vue";
    import YzlTableCell from "./YzlTableCell.vue";

    const router = useRouter();

    const props = defineProps({
        tableList: {
            type: Array,
            default() {
                return [];
            },
        },
        columns: {
            type: Array,
            default() {
                return [];
            },
        },
        size: {
            type: String,
            default: "",
        },
        width: {
            type: String,
            default: "",
        },
        height: {
            type: String,
            default: "",
        },
        rowClassName: {
            type: Function,
            default: null,
        },
    });
    const state = reactive({
        calcHeight: "",
        tempObj: {},
    });

    const linkTo = (type, link) => {
        console.log(type, link);
        if (type == "CustomerDetail") {
            router.push({
                name: "CustomerDetail",
                state: {
                    memberCard: link,
                },
            });
        }
    };

    const getHeight = () => {
        nextTick(() => {
            let windowHeight = window.innerHeight;

            let offtop = document.getElementById("ElTable").getBoundingClientRect().top;

            state.calcHeight = windowHeight - offtop - 70;
        });
    };
    getHeight();
</script>


```

YzlTableCell.vue
为了render函数
```vue

<script type="text/jsx" >
    import { defineComponent } from "vue";

    export default defineComponent({
        name: "YzlTableCell",
        props: {
            renderer: { type: Function, required: true },
        },
        render(h) {
            const me = this;
            return me.renderer(h);
        },
    });
</script>

```