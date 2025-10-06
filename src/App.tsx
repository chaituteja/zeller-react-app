import React, { useEffect, useMemo, useState } from "react";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import { ListZellerCustomers } from "./graphql/queries";
import { Customer } from "./types";

import RadioButton from "./Components/RadioButton";
import Card from "./Components/Card";

import "./App.css";

Amplify.configure({
  API: {
    GraphQL: {
      endpoint:
        "https://prrwjjssnvhpbcdwbcwx3nm3zm.appsync-api.ap-southeast-2.amazonaws.com/graphql",
      region: "ap-southeast-2",
      defaultAuthMode: "apiKey",
      apiKey: process.env.REACT_APP_API_KEY,
    },
  },
});

function App() {
  const client = useMemo(() => generateClient(), []);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [role, setRole] = useState<string>("admin");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  function handleClick(e: React.ChangeEvent<HTMLInputElement>) {
    setRole(e.target.value);
  }

  useEffect(() => {
    async function fetchCustomers() {
      try {
        setLoading(true);
        const response: any = await client.graphql({
          query: ListZellerCustomers,
        });
        const allCustomers = response.data.listZellerCustomers.items ?? [];
        setCustomers(allCustomers);
      } catch (err: any) {
        setError(err?.errors?.[0]?.message || "Failed to fetch customers");
      } finally {
        setLoading(false);
      }
    }
    fetchCustomers();
  }, [client]);

  const filteredCustomers = useMemo(
    () =>
      customers.filter(
        (customer) => customer.role?.toLowerCase() === role.toLowerCase()
      ),
    [customers, role]
  );

  if (error) return <h3>Error: {error}</h3>;

  return (
    <>
      <h2>User Types</h2>
      <RadioButton
        onClick={handleClick}
        id="admin"
        name="role"
        label="admin"
        checked={role === "admin"}
      />
      <RadioButton
        onClick={handleClick}
        id="manager"
        name="role"
        label="manager"
        checked={role === "manager"}
      />
      <hr />
      <h2>{role === "admin" ? "Admin Users" : "Manager Users"}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : filteredCustomers.length ? (
        filteredCustomers.map((item) => (
          <Card key={item.id} name={item.name} role={item.role} />
        ))
      ) : (
        <p>No {role} users found.</p>
      )}
      <hr />
    </>
  );
}

export default App;
