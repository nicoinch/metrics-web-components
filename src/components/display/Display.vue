<template>
    <div
        class="flex flex-col gap-2 p-4 bg-primary-200 dark:bg-primary-700 bg-opacity-50 dark:bg-opacity-50 rounded-2xl"
    >
        <span class="font-semibold text-lg px-2 text-primary-700 dark:text-primary-100" data-testid="display-label">
            {{ props.label }}
        </span>
        <span class="font-semibold text-6xl self-end text-primary-700 dark:text-white" data-testid="display-value">
            {{ props.value }}
        </span>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    /**
     * The value to display
     */
    value: number;
    /**
     * The display label
     */
    label?: string;
}>();
</script>
