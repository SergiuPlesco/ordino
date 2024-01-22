import React from "react";
import { auth } from "@/auth";

const Dashboard = async () => {
  const data = await auth();
  return (
    <div>
      <p>User logged in: </p>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </div>
  );
};

export default Dashboard;
