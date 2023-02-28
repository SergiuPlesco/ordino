import { useState, useEffect, use } from "react";
import Head from "next/head";
import { Roboto } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Form from "@/components/Form/Form";
import TasksList from "@/components/TasksList/TasksList";
import useLocalStorage from "@/hooks/useLocalStorage";

const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });

export default function Home() {
  const { allTasks } = useLocalStorage();
  console.log("rendering home");
  const [list, setList] = useState([]);

  useEffect(() => {
    if (allTasks) {
      setList(allTasks);
    }
  }, [allTasks]);

  return (
    <>
      <Head>
        <title>Ordino App</title>
        <meta
          name="description"
          content="Devide and conquer your tasks, microtask by microtask"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main} style={roboto.style}>
        <h1>Ordino App</h1>
        <Form />
        <TasksList allTasks={list} />
      </main>
    </>
  );
}
