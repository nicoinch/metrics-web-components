<script lang="ts">
import { defineComponent, provide, watchEffect } from 'vue';
import { i18n } from '../i18n/i18n.ts';
import { I18nInjectionKey } from 'vue-i18n';

export default defineComponent({
    props: {
        locale: {
            type: String,
            default: 'en',
        },
    },
    setup(props) {
        provide(I18nInjectionKey, i18n);
        watchEffect(() => {
            i18n.global.locale.value = props.locale;
        });
        return {};
    },
});
</script>

<template>
    <slot />
</template>
