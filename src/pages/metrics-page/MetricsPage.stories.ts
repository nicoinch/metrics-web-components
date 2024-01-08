import type { Meta, StoryObj } from '@storybook/vue3';
import MetricsPage from './MetricsPage.vue';
import { darkModeDecorator } from '../../../.storybook/dark-mode-decorator.ts';

const meta = {
    title: 'Pages/MetricsPage',
    render: () => ({
        components: { MetricsPage },
        template: '<MetricsPage class="p-4" />',
    }),
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [darkModeDecorator],
} satisfies Meta<typeof MetricsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
