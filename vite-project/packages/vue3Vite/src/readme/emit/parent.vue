<template>
  <div class="w-1000px h-1000px bg-red">
    <a-input v-model="text"> </a-input>
    <child ref="childRef" :text="text" @changeA="changeA"> </child>
    <div class="mt20px">
      <a-button @click="changeByRef">调用Ref</a-button>
    </div>
  </div>

  <demo-block>
    <template v-slot:source>
      <!-- <p> -->
      <div class="w-1000px h-1000px bg-red">
        <a-input v-model="text"> </a-input>
        <child ref="childRef" :text="text" @changeA="changeA"> </child>
        <div class="mt20px">
          <a-button @click="changeByRef">调用Ref</a-button>
        </div>
      </div>
      <!-- </p> -->
    </template>
    <template v-slot:highlight>
      <pre><pre-code class="xml">{{ demoCodes }}</pre-code></pre>
    </template>
  </demo-block>
</template>

<script setup>
import { ref, watch } from 'vue';
import child from './child.vue';
// 双向绑定 text
const text = ref('父文字');

// 获取ref
const childRef = ref();

const atext = '123123';

// watch 写法
watch(
  text,
  //   () => text,
  (val) => {
    console.log('触发父watch', val);
  },
  { deep: true, immediate: true },
);

// 字组件传参数
const changeA = (value) => {
  text.value = value;
  console.log('value', value, text.value);
};

// 调用字组件的ref
const changeByRef = () => {
  console.log('ref=======', childRef, childRef.value);
  childRef.value.changeByRef();
};

const demoCodes = ` <div class="w-1000px h-1000px bg-red">
        <a-input v-model="text"> </a-input>
        <child ref="childRef" :text="text" @changeA="changeA"> </child>
        <div class="mt20px">
          <a-button @click="changeByRef">调用Ref</a-button>
        </div>
</div>

<script setup>
import { ref } from 'vue';
import child from './child.vue';
// 双向绑定 text
const text = ref('父文字');

// 获取ref
const childRef = ref();

const atext = '123123';

// watch 写法
watch(
  text,
  //   () => text,
  (val) => {
    console.log('触发父watch', val);
  },
  { deep: true, immediate: true },
);

// 字组件传参数
const changeA = (value) => {
  text.value = value;
  console.log('value', value, text.value);
};

// 调用字组件的ref
const changeByRef = () => {
  console.log('ref=======', childRef, childRef.value);
  childRef.value.changeByRef();
};

<\/script>

`;
</script>
