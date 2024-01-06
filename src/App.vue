<script setup lang="ts">
import MetricsPage from './pages/metrics-page/MetricsPage.vue';
import { ref } from 'vue';

const locale = ref<string>('en');
</script>

<template>
    <div class="flex flex-col gap-4">
        <MetricsPage class="w-screen" />
        <m-i18n-host .locale="locale">
            <h1 class="text-default-text">Web component</h1>
            <m-display />
            <m-counter />
        </m-i18n-host>
    </div>
</template>
