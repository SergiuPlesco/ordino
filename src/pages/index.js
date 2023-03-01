import Head from "next/head";
import { Roboto } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Tasks from "@/containers/Tasks/Tasks";

const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });

export default function Home() {
	return (
		<>
			<Head>
				<title>Ordino App</title>
				<meta name="description" content="Devide and conquer your tasks, microtask by microtask" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main} style={roboto.style}>
				<h1>Ordino App</h1>
				<h4>
					One hour of pure focus a day, on lever-moving tasks, is all you need to build the project
					that will launch you into a life of meaning.
				</h4>
				<Tasks />
			</main>
		</>
	);
}
