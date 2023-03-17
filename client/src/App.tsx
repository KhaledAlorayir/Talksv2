import type { Component } from "solid-js";
import Auth from "./components/Auth";
import Hero from "./components/Hero";

const App: Component = () => {
  return (
    <main class="h-screen px-6">
      <Hero />
      <Auth />
    </main>
  );
};

export default App;
