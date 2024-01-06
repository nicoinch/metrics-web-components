import type { Preview, StoryFn, StoryContext } from '@storybook/vue3';
import { setup } from '@storybook/vue3';
import '../src/style.css';
import { i18n } from '../src/i18n/i18n';

setup((app) => {
    app.use(i18n);
});

const localeSelectDecorator = (story: StoryFn, context: StoryContext) => {
    const { locale } = context.globals;
    i18n.global.locale.value = locale;
    return story(context.args, context);
};

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    globalTypes: {
        locale: {
            name: 'Locale',
            description: 'Internationalization locale',
            toolbar: {
                icon: 'globe',
                items: [
                    { value: 'en', title: 'English' },
                    { value: 'fr', title: 'Français' },
                ],
                showName: true,
            },
        },
    },
    decorators: [localeSelectDecorator],
};

export default preview;
