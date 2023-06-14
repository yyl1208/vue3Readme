<template>
  <div></div>

  <div>
    <div>obj2 : {{ JSON.stringify(obj2) }} }}</div>

    <div class="mb20px"><span class="mr10px">原始obj2: </span> <a-input v-model="obj2.a"></a-input></div>
  </div>

  <div class="mt20px">
    <span v-if="visible"
      >展示文字:
      <a-input v-model="text"></a-input>
    </span>
    <div class="mt10px">
      <a-button @click="changeShowFun">控制展示文字</a-button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted } from 'vue';

const props = defineProps(['changeType']);
const emits = defineEmits(['']);

// ref 绑定
const visible = ref(true);

const text = ref('');

const obj = ref({});

const array = ref([]);

const obj2 = reactive({ a: 1, b: 2 });

const changeShowFun = () => {
  // 修改 ref 加上 .value
  visible.value = !visible.value;

  if (visible.value) obj2.a = 2;
  else {
    obj2 = { a: 1111, b: 1111 };
    // obj2 = Object.assign(obj2, { a: 1111, b: 1111 });
  }
};
</script>
