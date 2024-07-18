---
aside: false
---

 
tagViews.vue

```vue
<template>
  <el-scrollbar>
    <VueDraggableNext
      :list="state.routeList"
      animation="300"
      class="tagBG"
      scroll
      :sort="true"
    >
      <el-tag
        size="large"
        class="tag"
        v-for="(item, index) in state.routeList"
        :key="item.path"
        :closable="true"
        :type="item.path == state.activeRoutePath ? 'primary' : 'info'"
        @click="routerGO(item)"
        @close="handleClose(index)"
      >
        {{ item.title }}
      </el-tag>
    </VueDraggableNext>
  </el-scrollbar>
</template>
<script setup>
// VueDraggableNext为了拖拽动画
import { VueDraggableNext } from "vue-draggable-next";

const props = defineProps({
  modelValue: {
    type: Array,
    default() {
      return [];
    },
  },
});
const emits = defineEmits(["update:modelValue"]);

const router = useRouter();
const route = useRoute();

const state = reactive({
  routeList: [],
  activeRoutePath: route.path,
  cathList: [],
});

const init = () => {
  // 本地做的缓存
  if (localStorage.getItem("saveRouteList")) {
    state.routeList = JSON.parse(localStorage.getItem("saveRouteList"));
    state.cathList = state.routeList.map((element) => element.name);
  } else {
    state.routeList.push({
      path: route.path,
      name: route.name,
      title: route.meta.title,
    });

    state.cathList.push(route.name);
  }
  emits("update:modelValue", state.cathList);
};
init();

router.afterEach((to, from) => {
  state.activeRoutePath = to.path;
  // 有些页面不需要缓存
  if (!["/login"].includes(to.path)) {
    state.routeList.push({
      path: to.path,
      name: to.name,
      title: to.meta.title,
    });
    state.routeList = removeDuplicates(state.routeList);
    state.cathList = state.routeList.map((element) => element.name);
    localStorage.setItem("saveRouteList", JSON.stringify(state.routeList));
    emits("update:modelValue", state.cathList);
  }
});

// 使用 Map 来实现去重
function removeDuplicates(routeList) {
  const map = new Map();

  routeList.forEach((route) => {
    if (!map.has(route.path)) {
      map.set(route.path, route);
    }
  });

  return Array.from(map.values());
}

const routerGO = (item) => {
  router.push(item.path);
};
const handleClose = (index) => {
  let item = state.routeList[index];

  if (item.path == state.activeRoutePath) {
    if (state.routeList.length == 1) {
      router.push("/");
    } else {
      router.push(state.routeList.at(index == 0 ? index + 1 : index - 1).path);
    }
  }

  state.routeList.splice(index, 1);
  state.cathList = state.routeList.map((element) => element.name);
  emits("update:modelValue", state.cathList);
};

const getIndex = (name) => {
  return state.routeList.findIndex((item) => item.name == name);
};

defineExpose({ handleClose, getIndex });
</script>
<style scoped lang="scss">
.tagBG {
  display: flex;
  width: 100%;
}
.tag {
  margin-right: 5px;
  position: relative;
  cursor: pointer;
  &:hover {
    color: black;
  }
}
</style>
```

layout.vue

```vue
<template>
  <el-main>
    <div class="tag-view-bg">
      <el-icon
        @click="state.isCollapse = !state.isCollapse"
        :size="26"
        
        class="cp"
      >
        <Fold v-show="!state.isCollapse" />
        <Expand v-show="state.isCollapse" />
      </el-icon>
      <tagViews ref="tagViewsRef" v-model="state.keepAliveIncludeList" />
    </div>
    <el-divider />

    <div
      v-loading="loadingNumber"
     
    >
      <router-view v-slot="{ Component, route }">
        <keep-alive :include="[...state.keepAliveIncludeList]">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </router-view>
    </div>
  </el-main>
</template>
```
