import type { Component } from "solid-js";

const Hero: Component = () => {
  async function startHandler() {}

  return (
    <section class="flex h-full justify-center items-center">
      <article class="text-center flex flex-col gap-y-4">
        <h1 class="text-5xl font-bold font-mono">Talks</h1>
        <h3 class="text-lg font-semibold font-mono mb-8">
          Talk with someone about anything 🖐
        </h3>
        <button class="btn" onClick={startHandler}>
          Start
        </button>
      </article>
    </section>
  );
};

export default Hero;
