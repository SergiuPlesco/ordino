import React from "react";
import UserButton from "@/components/UserButton/UserButton";

const SignIn = ({ searchParams }: { searchParams: any }) => {
  const callback = searchParams.callbackUrl;
  return (
    <div>
      SignIn
      <UserButton callback={callback} />
    </div>
  );
};

export default SignIn;
