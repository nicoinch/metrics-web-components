<template>
    <div class="flex">
        <button type="button" :class="buttonClasses" data-testid="control-pane-button" @click="onClick">
            <span class="text-md uppercase font-semibold">{{ t('reset') }}</span>
        </button>
    </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

const props = withDefaults(
    defineProps<{
        /**
         * Flag to force the control pane to take the full width
         */
        fullWidth?: boolean;
    }>(),
    { fullWidth: false },
);

const buttonClasses =
    (props.fullWidth ? 'flex-1 ' : '') +
    'text-primary-text flex flex-col items-center bg-primary-content-bg hover:bg-primary-content-bg-hover hover:border-primary-focus focus-visible:border-primary-focus focus-visible:outline focus-visible:outline-1 focus-visible:outline-primary-focus focus:border-primary-focus focus:outline focus:outline-1 focus:outline-primary-focus';

const emit = defineEmits<{ (e: 'onResetCounter'): void }>();

const onClick = () => {
    emit('onResetCounter');
};

const { t } = useI18n({
    inheritLocale: true,
    useScope: 'local',
});
</script>

<style scoped>
@import '../../../style-for-wc.css';
</style>
