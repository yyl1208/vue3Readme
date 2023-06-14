<template>
  <div class="p20px bg-cyan">
    {{ '孩子' }}
    <div>msg1:{{ msg1 }}</div>

    <div>msg2:{{ msg2 }}</div>

    <grand-child class="m30px"></grand-child>
  </div>
</template>

<script setup>
import { inject } from 'vue';
import grandChild from './grandChild.vue';

const msg1 = inject('msg1');

const msg2 = inject('msg2');
</script>
