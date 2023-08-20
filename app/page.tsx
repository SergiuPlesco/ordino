"use client";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import LoginButton from "@/components/LoginButton/LoginButton";

export default function Home() {
	const { data: sesssion } = useSession();
	if (!sesssion) {
		console.log("no sesstion");
		return null;
	}
	return (
		<main className="flex flex-col items-center gap-2 mt-[150px]">
			<h2 className="text-xl font-bold tracking-wide">ordino</h2>
			<p className="text-center">
				One hour of pure focus a day, on lever-moving tasks, <br />
				is all you need to build the project that will launch you into a life of meaning.
			</p>
			{/* <p>Devide each difficulty into as many parts as is feasible and necessary to resolve it.</p>
			<p>You cannot hope to make progress in areas where you have taken no action.</p> */}
			<pre>{JSON.stringify(sesssion, null, 4)}</pre>

			<LoginButton />
		</main>
	);
}
