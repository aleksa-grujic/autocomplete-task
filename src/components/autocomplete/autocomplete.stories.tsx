import type {Meta, StoryObj} from '@storybook/react';
import {Autocomplete} from "./index.tsx";

const meta = {
    title: 'Components/Autocomplete',
    component: Autocomplete,
    decorators: [
        (Story) => (
            <div style={{height: '300px'}}>
                <Story/>
            </div>
        )

    ],
    tags: ['autodocs'],
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
    args: {
        debounceTime: 300,
        placeholder: 'Type here to search the products...',
    },
};

export const CustomStyling: Story = {
    args: {
        debounceTime: 300,
        placeholder: 'Type here to search the products...',
        containerClassName: '',
        inputClassName: 'custom-wrapper',
        suggestionListClassName: 'custom-suggestion-list',
        suggestionItemClassName: 'suggestion-item',
        activeSuggestionClassName: 'active',
        errorClassName: 'error',
    },
};

export const CustomInvalidBaseUrl: Story = {
    args: {
        debounceTime: 300,
        placeholder: 'Type here to search the products...',
        baseUrl: () => `test`,
    },
};