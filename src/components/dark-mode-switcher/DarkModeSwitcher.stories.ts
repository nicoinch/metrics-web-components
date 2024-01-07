import type { Meta, StoryObj } from '@storybook/vue3';
import DarkModeSwitcher from './DarkModeSwitcher.ce.vue';
import { ref } from 'vue';
import { darkModeDecorator } from '../../../.storybook/dark-mode-decorator.ts';

const meta = {
    title: 'Components/DarkModeSwitcher',
    component: DarkModeSwitcher,
    render: (args) => ({
        components: { DarkModeSwitcher },
        setup() {
            const count = ref(3);
            return { args, count };
        },
        template: `<DarkModeSwitcher class="m-4" v-bind="args" />`,
    }),
    decorators: [darkModeDecorator],
} satisfies Meta<typeof DarkModeSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
