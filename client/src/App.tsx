import { Component, createSignal, onCleanup, onMount, Show } from "solid-js";
import JoinModal from "./components/JoinModal";
import Hero from "./components/Hero";
import { socket } from "./lib/Socket";
import { waitingSignal } from "./lib/Signals";
import ChatScreen from "./components/chat/ChatScreen";

const App: Component = () => {
  const [_, setIsWaiting] = waitingSignal;
  const [isJoined, setIsJoined] = createSignal();

  onMount(() => {
    socket.on("joined", ({ room }) => {
      setIsJoined(true);
    });

    socket.on("waiting", () => {
      setIsWaiting(true);
    });
  });

  onCleanup(() => {
    socket.off("joined");
    socket.off("waiting");
  });

  return (
    <main class="h-screen mx-auto container">
      <Show when={isJoined()} fallback={<ChatScreen />}>
        <Hero />
        <JoinModal />
      </Show>
    </main>
  );
};

export default App;
