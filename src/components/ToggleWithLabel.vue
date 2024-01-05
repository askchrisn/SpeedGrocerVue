<template>
    <div>
        <label>{{ label }}</label>
        <q-toggle v-model="inputValue" />
    </div>
</template>
  
<script setup lang="ts">
import { watch } from 'vue';
import { defineProps, defineEmits, ref } from 'vue';

const props = defineProps({
    modelValue: Boolean,
    label: String,
    onToggle: {
        type: Function,
        default: undefined
    }
});

let inputValue = ref(props.modelValue);

const emit = defineEmits(['update:modelValue', 'ontoggled']);

watch(() => inputValue.value, () => {
    emit('update:modelValue', inputValue.value);
    emit('ontoggled');
});

</script>