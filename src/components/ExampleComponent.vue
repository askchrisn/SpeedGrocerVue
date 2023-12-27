<template>
  <div>
    <label>Count:</label>
    <label>{{ counterStore.count }}</label>
    <button @click="counterStore.increment()">Increment</button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Todo, Meta } from './models';
import { useCounterStore } from '../stores/example-store';

const counterStore = useCounterStore();

</script>
