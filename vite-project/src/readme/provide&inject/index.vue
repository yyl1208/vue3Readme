<template>
  <div class="p20px">
    <div class="mb20px">mixin中的文字 ：{{ msg }}</div>



    <div class="mb20px">mixin中的文字 ：{{ msg }}</div>

  </div>
</template>

<script setup></script>

<script>
import mixin from './mixin/mixin.vue';
export default {
  mixins: [mixin],
};
</script>
