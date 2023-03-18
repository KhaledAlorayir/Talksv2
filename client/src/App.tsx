import { Component, createSignal, onCleanup, onMount, Show } from "solid-js";
import JoinModal from "./components/JoinModal";
import Hero from "./components/Hero";
import { socket } from "./lib/Socket";
import { waitingSignal } from "./lib/Signals";
import ChatScreen from "./components/ChatScreen";
import { Message } from "./lib/Types";

const App: Component = () => {
  const [_, setIsWaiting] = waitingSignal;
  const [isJoined, setIsJoined] = createSignal();
  const [messages, setMessages] = createSignal<Message[]>([]);

  onMount(() => {
    socket.on("joined", ({ room }) => {
      setIsJoined(true);
    });

    socket.on("waiting", () => {
      setIsWaiting(true);
    });

    socket.on("receive", ({ message }) => {
      setMessages((prev) => [...prev, { content: message, isMe: false }]);
    });
  });

  onCleanup(() => {
    socket.off("joined");
    socket.off("waiting");
    socket.off("receive");
  });

  return (
    <main class="h-screen mx-auto container">
      <Show
        when={!isJoined()}
        fallback={<ChatScreen messages={messages} setMessages={setMessages} />}
      >
        <Hero />
        <JoinModal />
      </Show>
    </main>
  );
};

export default App;
