<template>
  <div class="test">
    <!-- <div>
      <label>Displaying a stores property:</label>
      <label>{{ exampleStore.count }}</label>
    </div> -->
    <q-btn color="primary" @click="exampleStore.increment()">InlineFunction</q-btn>
    <q-btn push color="primary" @click="functionNameHere()">Calling store function from a defined function</q-btn>
    <q-btn color="primary" @click="anotherFunction()">Calling store function from a defined function alternative syntax</q-btn>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useExampleStore } from '../stores/exampleStore';

const exampleStore = useExampleStore();

// Inline function
const functionNameHere = () => {
  exampleStore.increment();
}

// Another way to write a function
function anotherFunction () {
  exampleStore.increment();
}

</script>

<style scoped>
  div {
    margin: 3rem;
  }

  .test {
    display: flex;
    flex-direction: column;
  }
  .q-btn {
    margin: 1rem;
  }
</style>
