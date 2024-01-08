import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/vue3';
import { userEvent, within } from '@storybook/testing-library';
import MetricsCounter from './MetricsCounter.ce.vue';
import { ref } from 'vue';
import { darkModeDecorator } from '../../../.storybook/dark-mode-decorator.ts';

const meta = {
    title: 'Components/MetricsCounter',
    render: (args) => ({
        components: { MetricsCounter },
        setup() {
            const count = ref(3);
            return { args, count };
        },
        template: '<MetricsCounter class="m-4" v-bind="args" v-model="count" />',
    }),
    decorators: [darkModeDecorator],
} satisfies Meta<typeof MetricsCounter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        max: 10,
        modelValue: 3,
    },
};

export const FullWidth: Story = {
    args: {
        max: 10,
        modelValue: 3,
        fullWidth: true,
    },
};

export const BigNumber: Story = {
    args: {
        modelValue: 300000,
    },
    render: (args) => ({
        components: { MetricsCounter },
        setup() {
            const count = ref(300000);
            return { args, count };
        },
        template: '<MetricsCounter class="m-4" v-bind="args" v-model="count" />',
    }),
};

export const HideValue: Story = {
    args: {
        modelValue: 3,
        hideValue: true,
    },
    render: (args) => ({
        components: { MetricsCounter },
        setup() {
            const count = ref(3);
            return { args, count };
        },
        template: '<MetricsCounter class="m-4" v-bind="args" v-model="count" />',
    }),
};

export const ShowStep: Story = {
    args: {
        modelValue: 3,
        showStep: true,
    },
    render: (args) => ({
        components: { MetricsCounter },
        setup() {
            const count = ref(3);
            return { args, count };
        },
        template: '<MetricsCounter class="m-4" v-bind="args" v-model="count" />',
    }),
};

export const Test: Story = {
    args: {
        min: 2,
        max: 7,
        step: 2,
        modelValue: 3,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getAllByTestId('counter-value')[0].textContent).toEqual('3');
        await expect(canvas.getAllByTestId('counter-value')[0].classList).not.toContain('pointer-events-none');

        await userEvent.click(canvas.getAllByTestId('counter-increase-button')[0]);
        await expect(canvas.getAllByTestId('counter-value')[0].textContent).toEqual('5');

        await userEvent.click(canvas.getAllByTestId('counter-decrease-button')[0]);
        await expect(canvas.getAllByTestId('counter-value')[0].textContent).toEqual('3');

        await userEvent.click(canvas.getAllByTestId('counter-increase-button')[0]);
        await userEvent.click(canvas.getAllByTestId('counter-increase-button')[0]);
        await expect(canvas.getAllByTestId('counter-value')[0].textContent).toEqual('7');
        await expect(canvas.getAllByTestId('counter-increase-button')[0].classList).toContain('pointer-events-none');
    },
};
