<template>
  <div class="p-20px">
    <div>基本ref</div>

    <div>
      <div>obj1 : {{ JSON.stringify(obj) }} }}</div>

      <div class="mb20px"><span class="mr10px">原始obj: </span> <a-input v-model="obj.a"></a-input></div>
    </div>
    <div class="mb20px"><span class="mr10px">ref: </span> <a-input v-model="action"></a-input></div>

    <div class="mb20px"><span class="mr10px">ref2: </span> <a-input v-model="action2"></a-input></div>

    <div class="mb20px"><span class="mr10px">ref3: </span> <a-input v-model="a"></a-input></div>

    <div class="mb20px"><span class="mr10px">newObj: </span> <a-input v-model="obj.a"></a-input></div>
  </div>
</template>

<script setup>
import { ref, toRef, toRefs, reactive } from 'vue';

let obj = reactive({ a: 1, b: 2 });
// let obj = ref({ a: 1, b: 2 });
// let obj = { a: 1, b: 2 };

const action = ref(obj.a);

// const action2 = toRef(obj.a);

const action2 = toRef(obj, 'a');

const { a } = toRefs(obj);

const newObj = toRefs(obj);
</script>
