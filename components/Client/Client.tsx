"use client";
import React from "react";
import { useSession } from "next-auth/react";

const Client = () => {
  const { data, status } = useSession();
  console.log("client", status, data);
  return (
    <div>
      <p>{status}</p>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </div>
  );
};

export default Client;
