import type { Route } from "./+types/home";
import { Main } from "../components/Main"
import MainContextProvider from "~/contextProvider/MainContextProvider";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Illustrator-Sorting Algo" },
    { name: "description", content: "Simulation for sorting Algotithms" }
  ];
}

export default function Home() {
  return <MainContextProvider>
    <Main />
  </MainContextProvider>
}
