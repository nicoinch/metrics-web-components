import type { Meta, StoryObj } from '@storybook/vue3';
import LocalePicker from './LocalePicker.ce.vue';
import { ref } from 'vue';
import { darkModeDecorator } from '../../../.storybook/dark-mode-decorator.ts';

const meta = {
    title: 'Components/LocalePicker',
    render: (args) => ({
        components: { LocalePicker },
        setup() {
            const count = ref(3);
            return { args, count };
        },
        template: `<LocalePicker class="m-4 theme-muted" v-bind="args" />`,
    }),
    decorators: [darkModeDecorator],
} satisfies Meta<typeof LocalePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
