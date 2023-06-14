<template>
  <div class="p20px">
    <div class="mb10px">父： {{ pText }}</div>
    <div>
      <child class="mt30px" v-model:text="pText" />
    </div>
  </div>
</template>

<script setup>
import child from './child.vue';

const pText = ref('原始文字');



</script>
