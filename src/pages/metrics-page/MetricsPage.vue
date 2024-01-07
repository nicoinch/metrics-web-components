<script setup lang="ts">
import { ref } from 'vue';
import DisplayMetrics from '../../components/metrics-display/MetricsDisplay.ce.vue';
import MetricsCounter from '../../components/metrics-counter/MetricsCounter.ce.vue';
import ControlPane from '../../components/control-pane/ControlPane.ce.vue';
import LocalePicker from '../../components/locale-picker/LocalePicker.ce.vue';
import DarkModeSwitcher from '../../components/dark-mode-switcher/DarkModeSwitcher.ce.vue';

const count1 = ref(3);
const count2 = ref(0);
const count3 = ref(1);
</script>

<template>
    <div class="flex gap-3 w-full justify-end p-4">
        <LocalePicker class="max-w-fit self-end" />
        <DarkModeSwitcher class="max-w-fit self-end" />
    </div>
    <div class="flex gap-4 flex-col sm:flex-row">
        <div class="flex flex-col gap-3 w-full border border-primary-focus rounded-xl p-4">
            <DisplayMetrics label-key="counter" :value="count1" />
            <MetricsCounter v-model="count1" hide-value full-width />
            <ControlPane full-width @on-reset-counter="count1 = 0" />
        </div>
        <div class="flex flex-col gap-3 w-full border border-primary-focus rounded-xl p-4 theme-1">
            <DisplayMetrics label-key="counter" :value="count2" />
            <MetricsCounter v-model="count2" hide-value full-width />
            <ControlPane full-width @on-reset-counter="count2 = 0" />
        </div>
        <div class="flex flex-col gap-3 w-full border border-primary-focus rounded-xl p-4 theme-2">
            <DisplayMetrics label-key="counter" :value="count3" />
            <MetricsCounter v-model="count3" hide-value full-width />
            <ControlPane full-width @on-reset-counter="count3 = 0" />
        </div>
    </div>
</template>
