<template>
    <div>
      <div v-if="prompt">
        <div class="cursor-pointer">
          <q-dialog v-model="prompt" persistent>
            <q-card style="min-width: 350px">
              <q-card-section>
                <div class="text-h6">{{props.title}}</div>
              </q-card-section>
  
              <q-card-section class="q-pt-none">
                <q-input dense v-model="inputValue" autofocus @keyup.enter="prompt = false" />
              </q-card-section>
  
              <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Cancel" v-close-popup />
                <q-btn flat label="Add" v-close-popup @click="fireEvents" />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
      </div>
  
        <q-btn :label=props.label color="primary" @click="prompt = true" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, defineEmits } from 'vue';

  const props = defineProps({
    modelValue: {
        type: String,
        required: false,
        default: ''
    },
    title: {
        type: String,
        required: false,
        default: ''
    },
    label: {
        type: String,
        required: false,
        default: ''
    },
});

let inputValue = ref(props.modelValue);
let prompt = ref(false);

const emit = defineEmits(['update:modelValue', 'onAdded']);

function fireEvents() {
    emit('update:modelValue', inputValue.value);
    emit('onAdded');
    inputValue.value = '';
}

</script>
  
  <style scoped>
  </style>
  