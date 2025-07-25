import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Felipe Adeildo" },
    { name: "description", content: "Welcome to Felipe Adeildo portfolio" },
  ];
}

export default function Home() {
  return <div className="pt-16 p-4 container mx-auto">Comming soon!</div>;
}
