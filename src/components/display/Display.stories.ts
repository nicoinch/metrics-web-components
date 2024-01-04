import type { Meta, StoryObj } from '@storybook/vue3';
import Display from './Display.vue';
import { ref } from 'vue';
import { darkModeDecorator } from '../../../.storybook/dark-mode-decorator.ts';

const meta = {
    title: 'Components/Display',
    component: Display,
    render: (args) => ({
        components: { Display },
        setup() {
            const count = ref(3);
            return { args, count };
        },
        template: '<Display class="m-4" v-bind="args" v-model="count" />',
    }),
    decorators: [darkModeDecorator],
} satisfies Meta<typeof Display>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        value: 3,
        label: 'Count',
    },
};
