import type { Meta, StoryObj } from "@storybook/react";
import { InputField } from "./InputField";

const meta: Meta<typeof InputField> = {
    title: "Components/InputField",
    component: InputField,
};
export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {
    args: {
        label: "Username",
        placeholder: "Enter username",
        variant: "outlined",
        size: "md",
        value: "",
        disabled: false,
        invalid: false
    },
};

export const Error: Story = {
    args: {
        label: "Email",
        placeholder: "Enter email",
        invalid: false,
        errorMessage: "",
        disabled: true
    },
};

export const Disabled: Story = {
    args: {
        label: "Disabled Field",
        placeholder: "Can't type here",
        disabled: true,
    },
};
