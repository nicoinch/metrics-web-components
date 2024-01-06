<template>
    <div class="flex flex-col gap-2 text-primary-text">
        <div class="flex flex-row items-stretch gap-0.5">
            <button
                type="button"
                :class="
                    buttonClasses + ' rounded-r-none' + (count <= props.min ? ' opacity-50 pointer-events-none' : '')
                "
                :disabled="count <= props.min"
                data-testid="counter-decrease-button"
                @click="onDecrement"
            >
                <span class="text-2xl">{{ t('minus') }}</span>
                <span v-if="props.showStep" class="text-xs">{{ t('step') }} {{ props.step }}</span>
            </button>
            <span
                v-if="props.hideValue === false"
                :class="
                    (props.fullWidth ? 'flex-[2_1_0%]' : '') +
                    ' bg-primary-content-bg font-semibold text-xl min-w-16 px-2 flex items-center justify-center'
                "
                data-testid="counter-value"
            >
                {{ count }}
            </span>
            <button
                :class="
                    buttonClasses + ' rounded-l-none' + (count >= props.max ? ' opacity-50 pointer-events-none' : '')
                "
                type="button"
                :disabled="count >= props.max"
                data-testid="counter-increase-button"
                @click="onIncrement"
            >
                <span class="text-2xl">{{ t('plus') }}</span>
                <span v-if="props.showStep" class="text-xs">{{ t('step') }} {{ props.step }}</span>
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

const count = defineModel<number>({ default: 0, required: true });
const props = withDefaults(
    defineProps<{
        /**
         * The counter min value
         */
        min?: number;
        /**
         * The counter max value
         */
        max?: number;
        /**
         * The counter step
         */
        step?: number;
        /**
         * Flag to show or hide the counter value
         */
        hideValue?: boolean;
        /**
         * Flag to show or hide the counter value
         */
        showStep?: boolean;
        /**
         * Flag to force the counter to take the full width
         */
        fullWidth?: boolean;
    }>(),
    { step: 1, min: 0, max: 1000000, hideValue: false, showStep: false, fullWidth: false },
);

const buttonClasses =
    (props.fullWidth ? 'flex-1 ' : '') +
    'flex flex-col items-center bg-primary-content-bg hover:bg-primary-content-bg-hover hover:border-primary-focus focus-visible:border-primary-focus focus-visible:outline focus-visible:outline-1 focus-visible:outline-primary-focus focus:border-primary-focus focus:outline focus:outline-1 focus:outline-primary-focus';

const onIncrement = () => {
    const newValue = count.value + props.step;
    if (newValue <= props.max) {
        count.value = newValue;
    }
};

const onDecrement = () => {
    const newValue = count.value - props.step;
    if (newValue >= props.min) {
        count.value = newValue;
    }
};

const { t } = useI18n({
    inheritLocale: true,
    useScope: 'local',
});
</script>

<style scoped>
@import '../../assets/css/style.css';
</style>
