import type { Meta, StoryObj } from '@storybook/vue3';
import MetricsDisplay from './MetricsDisplay.ce.vue';
import { ref } from 'vue';
import { darkModeDecorator } from '../../../.storybook/dark-mode-decorator.ts';

const meta = {
    title: 'Components/MetricsDisplay',
    render: (args) => ({
        components: { MetricsDisplay },
        setup() {
            const count = ref(3);
            return { args, count };
        },
        template: '<MetricsDisplay class="m-4" v-bind="args" v-model="count" />',
    }),
    decorators: [darkModeDecorator],
} satisfies Meta<typeof MetricsDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        value: 3,
        labelKey: 'counter',
    },
};
