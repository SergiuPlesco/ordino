"use client";
import React from "react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

const LoginButton = () => {
	const handleLogin = () => signIn("google");
	return <Button onClick={handleLogin}>LoginButton</Button>;
};

export default LoginButton;
