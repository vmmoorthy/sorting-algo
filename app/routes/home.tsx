import type { Route } from "./+types/home";
import { Main } from "../components/Main"

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Illustrator-Sorting Algo" },
    { name: "description", content: "Simulation for sorting Algotithms" }
  ];
}

export default function Home() {
  return <Main />;
}
