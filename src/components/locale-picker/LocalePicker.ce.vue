<template>
    <div class="flex flex-col items-stretch">
        <div v-for="(translations, code) in languages" :key="code" class="flex-grow">
            <button
                v-if="code !== locale"
                :class="
                    'flex items-center gap-2 px-2 py-0.5 text-sm text-left w-fit bg-primary-content-bg hover:bg-primary-content-bg-hover text-primary-text hover:bg-primary-content-bg-hover hover:border-primary-focus focus-visible:border-primary-focus focus-visible:outline focus-visible:outline-1 focus-visible:outline-primary-focus focus:border-primary-focus focus:outline focus:outline-1 focus:outline-primary-focus' +
                    (code === locale ? ' opacity-50 pointer-events-none' : '')
                "
                data-testid="language-picker"
                @click="onLocaleChange(code)"
            >
                <span class="text-2xl">{{ translations.flag }}</span>
                <span
                    >{{ translations.switchTo }} <strong>{{ translations.label }}</strong></span
                >
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { i18n } from './../../i18n/i18n.ts';
import languages from './../../i18n/messages.json';

const { locale } = useI18n({
    inheritLocale: true,
    useScope: 'local',
});

const onLocaleChange = (code: string) => {
    i18n.global.locale.value = code;
    emit('onLocaleChange', code);
};

const emit = defineEmits<{ (e: 'onLocaleChange', value: string): void }>();
</script>

<style scoped>
@import '../../../style-for-wc.css';
</style>
