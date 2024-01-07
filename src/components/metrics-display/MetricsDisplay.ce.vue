<template>
    <div class="flex flex-col gap-2 p-4 bg-primary-content-bg rounded-2xl">
        <span class="font-semibold text-lg self-start px-2 text-primary-text" data-testid="display-label">
            {{ props.labelKey ? t(props.labelKey) : props.labelKey }}
        </span>
        <span class="font-semibold text-6xl self-center text-primary-text dark:text-white" data-testid="display-value">
            {{ props.value }}
        </span>
    </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n({
    inheritLocale: true,
    useScope: 'local',
});

const props = defineProps<{
    /**
     * The value to display
     */
    value: number;
    /**
     * The display label I18N key
     */
    labelKey?: string;
}>();
</script>

<style scoped>
@import '../../../style-for-wc.css';
</style>
