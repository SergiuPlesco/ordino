"use client";
import { useSession } from "next-auth/react";
import LoginButton from "@/components/LoginButton/LoginButton";
import SignOutButton from "@/components/SignOutButton/SignOutButton";

export default function Home() {
  const { data } = useSession();
  console.log("data", data);

  return (
    <main className="flex flex-col items-center gap-2 mt-[150px]">
      <h2 className="text-xl font-bold tracking-wide">ordino</h2>
      <p className="text-center">
        One hour of pure focus a day, on lever-moving tasks, <br />
        is all you need to build the project that will launch you into a life of
        meaning.
      </p>
      {/* <p>Devide each difficulty into as many parts as is feasible and necessary to resolve it.</p>
			<p>You cannot hope to make progress in areas where you have taken no action.</p> */}
      <pre>{JSON.stringify(data, null, 4)}</pre>
      <LoginButton />
      <SignOutButton />
    </main>
  );
}
