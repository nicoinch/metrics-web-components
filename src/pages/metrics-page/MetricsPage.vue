<script setup lang="ts">
import { ref } from 'vue';
import Display from '../../components/metrics-display/MetricsDisplay.ce.vue';
import Counter from '../../components/metrics-counter/MetricsCounter.ce.vue';

const count = ref(3);
</script>

<template>
    <div class="p-4 flex flex-col gap-3 w-full max-w-screen-sm">
        <Display label-key="counter" :value="count" />
        <Counter v-model="count" label="Counter" hide-value full-width />
    </div>
</template>
