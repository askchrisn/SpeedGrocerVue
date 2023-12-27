<template>
  <div>
    <label>Count:</label>
    <label>{{ counter.count }}</label>
    <button @click="counter.increment()">Increment</button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Todo, Meta } from './models';
import { useCounterStore } from '../stores/example-store';
import useStore from 'pinia';

const counter = useCounterStore();

</script>
