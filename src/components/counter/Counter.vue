<template>
    <div class="flex flex-col gap-2 text-primary-900 dark:text-white">
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
                <span class="text-2xl">-</span>
                <span v-if="props.showStep" class="text-xs">by {{ props.step }}</span>
            </button>
            <span
                v-if="props.hideValue === false"
                class="bg-primary-200 dark:bg-primary-700 bg-opacity-50 dark:bg-opacity-50 font-semibold text-xl min-w-16 px-2 flex items-center justify-center"
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
                <span class="text-2xl">+</span>
                <span v-if="props.showStep" class="text-xs">by {{ props.step }}</span>
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
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
    }>(),
    { step: 1, min: 0, max: 1000000, hideValue: false, showStep: false },
);

const buttonClasses =
    'flex flex-col items-center bg-primary-200 dark:bg-primary-700 bg-opacity-50 dark:bg-opacity-50 hover:bg-opacity-100';

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
</script>
