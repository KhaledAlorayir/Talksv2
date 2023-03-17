import { Component, For } from "solid-js";

const ChatScreen: Component = () => {
  const messages = [
    { message: "hello", isMe: false },
    { message: "hello dsd ", isMe: true },
    { message: "hello dsadsadas", isMe: true },
    { message: "hello asdsadsadsa", isMe: false },
    { message: "hello saddsadsad", isMe: false },
    { message: "hello sadsadsad", isMe: false },
    { message: "hello dsadsadsa", isMe: true },
    { message: "hello sdadsadsa", isMe: false },
    { message: "hello sadsadsa", isMe: true },
  ];

  return (
    <main class="h-full pt-12 flex flex-col">
      <section class="flex-1 overflow-y-scroll px-6">
        <div class="text-white text-base md:text-sm">
          <For each={messages}>
            {({ message, isMe }) => (
              <div class="flex mb-4" classList={{ "justify-end": isMe }}>
                <div
                  class="px-8 py-10 rounded-xl"
                  classList={{ "bg-sky-800": isMe, "bg-gray-800": !isMe }}
                >
                  {message}
                </div>
              </div>
            )}
          </For>
        </div>
      </section>
      <section class="py-6">
        <form class="flex gap-2">
          <input
            type="text"
            placeholder="message..."
            class="input input-bordered w-full input-secondary"
            required
          />
          <button class="btn btn-secondary">Send</button>
          <button class="btn btn-error">Leave</button>
        </form>
      </section>
    </main>
  );
};

export default ChatScreen;
