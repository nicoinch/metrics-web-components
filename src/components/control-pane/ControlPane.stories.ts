import type { Meta, StoryObj } from '@storybook/vue3';
import { action } from '@storybook/addon-actions';
import ControlPane from './ControlPane.ce.vue';
import { ref } from 'vue';
import { darkModeDecorator } from '../../../.storybook/dark-mode-decorator.ts';

const meta = {
    title: 'Components/ControlPane',
    component: ControlPane,
    render: (args) => ({
        components: { ControlPane },
        setup() {
            const count = ref(3);
            return { args, count, onResetCounter: action('onResetCounter') };
        },
        template: `<ControlPane class="m-4" v-bind="args" @on-reset-counter="onResetCounter" />`,
    }),
    decorators: [darkModeDecorator],
} satisfies Meta<typeof ControlPane>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const FullWidth: Story = {
    args: {
        fullWidth: true,
    },
};
