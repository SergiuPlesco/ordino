import { useState, useEffect } from "react";
import Head from "next/head";
import { Roboto } from "@next/font/google";
import styles from "@/styles/Home.module.css";

const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });

export default function Home() {
	const [isSaving, setIsSaving] = useState(false);
	const [task, setTask] = useState("");
	const [allTasks, setAllTasks] = useState([]);

	useEffect(() => {
		const savedTasks = JSON.parse(localStorage.getItem("tasks"));
		if (savedTasks) {
			setAllTasks(savedTasks);
		}
	}, []);

	useEffect(() => {
		if (isSaving) {
			localStorage.setItem("tasks", JSON.stringify(allTasks));
			setIsSaving(false);
		}
	}, [allTasks]);

	const saveTask = (e) => {
		e.preventDefault();
		setIsSaving(true);
		setAllTasks((current) => [...current, task]);
		setTask("");
	};
	return (
		<>
			<Head>
				<title>Ordino App</title>
				<meta name="description" content="Devide and conquer your tasks" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main} style={roboto.style}>
				<h1>Ordino App</h1>
				<form>
					<input type="text" name="task" value={task} onChange={(e) => setTask(e.target.value)} />
					<button type="submit" onClick={saveTask}>
						save
					</button>
				</form>
				<ul>
					{allTasks.map((task, index) => {
						return <li key={index}>{task}</li>;
					})}
				</ul>
			</main>
		</>
	);
}
