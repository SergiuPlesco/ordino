import React from "react";
import SignInButton from "../SingInButton/SignInButton";
import SignOutButton from "../SignOutButton/SignOutButton";
import { auth } from "@/auth";

const UserButton = async ({ callback }: { callback?: string }) => {
  const session = await auth();
  if (!session?.user)
    return <SignInButton provider="google" callback={callback} />;

  return <SignOutButton />;
};

export default UserButton;
