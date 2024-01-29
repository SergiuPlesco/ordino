import React from "react";
import { auth } from "@/auth";
import BoardList from "@/components/BoardList/BoardList";

const Dashboard = async () => {
  const data = await auth();
  return (
    <div>
      <p>User logged in: {data?.user?.name} </p>

      <div>
        <BoardList />
      </div>
    </div>
  );
};

export default Dashboard;
