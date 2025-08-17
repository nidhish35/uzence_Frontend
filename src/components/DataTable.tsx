import React, { useState } from "react";

export interface Column<T> {
    key: string;
    title: string;
    dataIndex: keyof T;
    sortable?: boolean;
}

export interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    loading?: boolean;
    selectable?: boolean;
    onRowSelect?: (selectedRows: T[]) => void;
}

export function DataTable<T>({
    data,
    columns,
    loading,
    selectable,
    onRowSelect,
}: DataTableProps<T>) {
    const [selectedRows, setSelectedRows] = useState<T[]>([]);
    const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: "asc" | "desc" } | null>(null);

    const handleSort = (key: keyof T) => {
        let direction: "asc" | "desc" = "asc";
        if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const sortedData = React.useMemo(() => {
        if (!sortConfig) return data;
        return [...data].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
            if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        });
    }, [data, sortConfig]);

    const toggleRowSelection = (row: T) => {
        let newSelection: T[];
        if (selectedRows.includes(row)) {
            newSelection = selectedRows.filter(r => r !== row);
        } else {
            newSelection = [...selectedRows, row];
        }
        setSelectedRows(newSelection);
        onRowSelect?.(newSelection);
    };

    if (loading) return <p className="text-center">Loading...</p>;
    if (!data.length) return <p className="text-center">No data available</p>;

    return (
        <table className="min-w-full border border-gray-300">
            <thead>
                <tr className="bg-gray-100">
                    {selectable && <th className="p-2">Select</th>}
                    {columns.map(col => (
                        <th
                            key={col.key}
                            className="p-2 border-b cursor-pointer"
                            onClick={() => col.sortable && handleSort(col.dataIndex)}
                        >
                            {col.title}
                            {col.sortable && (sortConfig?.key === col.dataIndex ? (sortConfig.direction === "asc" ? " 🔼" : " 🔽") : " ↕")}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {sortedData.map((row, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                        {selectable && (
                            <td className="p-2 text-center">
                                <input
                                    type="checkbox"
                                    checked={selectedRows.includes(row)}
                                    onChange={() => toggleRowSelection(row)}
                                />
                            </td>
                        )}
                        {columns.map(col => (
                            <td key={col.key} className="p-2 border-b">
                                {String(row[col.dataIndex])}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
