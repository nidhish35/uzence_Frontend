import React, { useState } from "react";
import { InputField } from "./components/InputField";
import { DataTable } from "./components/DataTable";

interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}

const initialData: User[] = [
  { id: 1, name: "Alice", age: 22, email: "alice@example.com" },
  { id: 2, name: "Bob", age: 25, email: "bob@example.com" },
  { id: 3, name: "Charlie", age: 28, email: "charlie@example.com" },
];

const columns = [
  { key: "name", title: "Name", dataIndex: "name" as keyof User, sortable: true },
  { key: "age", title: "Age", dataIndex: "age" as keyof User, sortable: true },
  { key: "email", title: "Email", dataIndex: "email" as keyof User },
];

function App() {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState<User[]>(initialData);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const isValidEmail = (val: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !age || !isValidEmail(email)) {
      alert("Please fill in all fields correctly.");
      return;
    }

    const newUser: User = {
      id: users.length + 1,
      name: username,
      age: parseInt(age, 10),
      email,
    };

    setUsers([...users, newUser]);
    setUsername("");
    setAge("");
    setEmail("");
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Frontend Assignment Demo</h1>

      {/* Form to Add User */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 border p-4 rounded-md shadow-md"
      >
        <h2 className="text-xl font-semibold">Add New User</h2>

        <InputField
          label="Username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          variant="outlined"
        />

        <InputField
          label="Age"
          placeholder="Enter your age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          variant="outlined"
        />

        <InputField
          label="Email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          invalid={email.length > 0 && !isValidEmail(email)}
          errorMessage="Invalid email format"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      {/* DataTable */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">DataTable Component</h2>
        <DataTable<User>
          data={users}
          columns={columns}
          selectable
          onRowSelect={(rows) => setSelectedUsers(rows)}
        />
        {selectedUsers.length > 0 && (
          <p className="text-sm text-gray-600">
            Selected Users: {selectedUsers.map((u) => u.name).join(", ")}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
