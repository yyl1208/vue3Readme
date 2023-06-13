<template>
  <div class="p20px bg-amber">
    父组件
    <div class="mb20px">msg1 ：{{ msg1 }}</div>

    <div class="mb20px">msg2 ：{{ msg2 }}</div>

    <a-input v-model="msg2"></a-input>

    <a-button class="m10px" @click="changeMsg1">修改msg2 为吃饭了</a-button>

    <child class="m30px"></child>
  </div>
</template>

<script setup>
import child from './child.vue';
import { provide, readonly, toRef } from 'vue';

const msg1 = 'msg1';

const msg1Ref = toRef(msg1);

// 注入 msg1
provide('msg1', msg1);

// 注入 ref msg2
const msg2 = ref('msg1');
provide('msg2', msg2);

const changeMsg2 = () => {
  msg2.value = 'asdasdasdasdas';
};

provide('msg2Fun', { msg2, changeMsg2 });

// 注入只读属性 msg3
const msg3 = ref('msg3');
provide('msg3', readonly(msg3));
</script>

<script>
// import mixin from './mixin/mixin.vue';
// export default {
//   mixins: [mixin],
// };
</script>
