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
    <div class="flex-1 p-4 flex flex-col gap-6">
        <div class="flex gap-3 w-full justify-end flex-col md:flex-row">
            <div class="flex gap-3 w-full justify-end order-first md:order-last">
                <LocalePicker class="max-w-fit self-end theme-muted" />
                <DarkModeSwitcher class="max-w-fit self-end theme-muted" />
            </div>
            <div class="flex gap-3 w-full justify-start text-4xl whitespace-nowrap text-default-text">
                <strong>Metrics</strong> - Vue
            </div>
        </div>
        <div class="flex gap-4 flex-col sm:flex-row">
            <div class="flex flex-col gap-3 w-full border border-primary-focus rounded-xl p-4">
                <DisplayMetrics label-key="counter" :value="count1" />
                <MetricsCounter v-model="count1" :max="6" hide-value full-width />
                <ControlPane full-width @on-reset-counter="count1 = 0" />
            </div>
            <div class="flex flex-col gap-3 w-full border border-primary-focus rounded-xl p-4 theme-1">
                <DisplayMetrics label-key="counter" :value="count2" />
                <MetricsCounter v-model="count2" :max="6" hide-value full-width />
                <ControlPane full-width @on-reset-counter="count2 = 0" />
            </div>
            <div class="flex flex-col gap-3 w-full border border-primary-focus rounded-xl p-4 theme-2">
                <DisplayMetrics label-key="counter" :value="count3" />
                <MetricsCounter v-model="count3" :max="6" hide-value full-width />
                <ControlPane full-width @on-reset-counter="count3 = 0" />
            </div>
        </div>
    </div>
</template>
