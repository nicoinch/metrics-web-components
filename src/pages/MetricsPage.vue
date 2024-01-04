<script setup lang="ts">
import { ref } from 'vue';
import Counter from '../components/counter/Counter.vue';

const count = ref(3);
</script>

<template>
    <div class="font-semibold text-lg">Counter: {{ count }}</div>
    <Counter v-model="count" label="Counter" />
</template>
