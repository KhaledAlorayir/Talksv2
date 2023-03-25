import {
  Accessor,
  Component,
  createEffect,
  createSignal,
  For,
  Setter,
} from "solid-js";
import { Message } from "../lib/Types";
import { socket } from "../lib/Socket";

type props = {
  messages: Accessor<Message[]>;
  setMessages: Setter<Message[]>;
  setIsJoined: Setter<boolean>;
};

const ChatScreen: Component<props> = (props) => {
  const [message, setMessage] = createSignal("");
  let chatEndRef!: HTMLDivElement | undefined;

  function submitHandler(event: Event) {
    event.preventDefault();
    socket.emit("message", { message: message() });
    props.setMessages((prev) => [...prev, { content: message(), isMe: true }]);
    setMessage("");
  }

  function leaveHandler() {
    socket.emit("leave", () => {
      props.setIsJoined(false);
    });
  }

  createEffect(() => {
    if (props.messages()) {
      chatEndRef?.scrollIntoView({ behavior: "smooth" });
    }
  });

  return (
    <main class="h-full pt-12 flex flex-col">
      <section class="flex-1 overflow-y-scroll px-6 text-white text-base md:text-sm">
        <For each={props.messages()}>
          {({ content, isMe }) => <ChatCard content={content} isMe={isMe} />}
        </For>
        {/*@ts-ignore */}
        <div ref={chatEndRef}></div>
      </section>
      <section class="py-6">
        <form class="flex gap-2" onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="message..."
            class="input input-bordered w-full input-secondary"
            required
            value={message()}
            onInput={(e) => setMessage(e.currentTarget.value)}
          />
          <button class="btn btn-secondary" type="submit">
            Send
          </button>
          <button onClick={leaveHandler} class="btn btn-error" type="button">
            Leave
          </button>
        </form>
      </section>
    </main>
  );
};

const ChatCard: Component<Message> = (props) => {
  return (
    <div class="flex mb-4" classList={{ "justify-end": props.isMe }}>
      <div
        class="px-8 py-10 rounded-xl"
        classList={{ "bg-sky-800": props.isMe, "bg-gray-800": !props.isMe }}
      >
        {props.content}
      </div>
    </div>
  );
};

export default ChatScreen;
