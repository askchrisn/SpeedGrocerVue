<template>
  <div>
    <label>Count:</label>
    <label>{{ counterStore.count }}</label>
    <q-btn color="primary" @click="counterStore.increment()">InlineFunction</q-btn>
    <q-btn push color="primary" @click="functionNameHere()">functionNameHere</q-btn>
    <q-btn color="primary" @click="anotherFunction()">anotherFunction</q-btn>
    <q-btn round color="brown-5" icon="directions" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useCounterStore } from '../stores/example-store';

const counterStore = useCounterStore();

const functionNameHere = () => {
  counterStore.increment();
}

function anotherFunction () {
  counterStore.increment();
}

</script>

<style scoped>
  div {
    margin: 3rem;
  }

</style>
