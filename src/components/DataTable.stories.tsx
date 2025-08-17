import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "./DataTable";

type Person = {
    id: number;
    name: string;
    age: number;
};

const meta: Meta<typeof DataTable<Person>> = {
    title: "Components/DataTable",
    component: DataTable<Person>,  // ✅ tell Storybook it's DataTable<Person>
};
export default meta;

type Story = StoryObj<typeof DataTable<Person>>;

const sampleData: Person[] = [
    { id: 1, name: "Alice", age: 22 },
    { id: 2, name: "Bob", age: 25 },
    { id: 3, name: "Charlie", age: 28 },
];

const columns = [
    { key: "name", title: "Name", dataIndex: "name" as const, sortable: true },
    { key: "age", title: "Age", dataIndex: "age" as const, sortable: true },
];

export const Default: Story = {
    args: {
        data: sampleData,
        columns,
    },
};

export const WithSelection: Story = {
    args: {
        data: sampleData,
        columns,
        selectable: true,
    },
};

export const Loading: Story = {
    args: {
        data: [],
        columns,
        loading: true,
    },
};

export const Empty: Story = {
    args: {
        data: [],
        columns,
    },
};
