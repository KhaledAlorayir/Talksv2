import { Component, Show } from "solid-js";
import { createSignal } from "solid-js";
import { modalSignal, waitingSignal } from "../lib/Signals";
import { socket } from "../lib/Socket";

const JoinModal: Component = () => {
  const [subject, setSubject] = createSignal("");
  const [isOpen] = modalSignal;
  const [isWaiting] = waitingSignal;

  async function submitHandler(event: Event) {
    event.preventDefault();
    if (!subject().trim()) {
      setSubject("");
      return;
    }
    socket.emit("join", { subject: subject().trim() }, (issues) => {
      console.log(issues);
    });
  }

  return (
    <>
      <input type="checkbox" class="modal-toggle" checked={isOpen()} />
      <div class="modal">
        <form class="modal-box w-11/12 max-w-4xl" onSubmit={submitHandler}>
          <Show when={!isWaiting()} fallback={<WaitingIndicator />}>
            <h3 class="font-mono text-xl font-semibold mb-12 text-center">
              what do you want to chat about 😗
            </h3>
            <div class="mb-8">
              <input
                type="text"
                placeholder="subject"
                class="input input-bordered w-full"
                required
                onInput={(e) => setSubject(e.currentTarget.value)}
                value={subject()}
              />
            </div>
            <div class="modal-action">
              <button class="btn" type="submit">
                Yay!
              </button>
            </div>
          </Show>
        </form>
      </div>
    </>
  );
};

const WaitingIndicator: Component = () => {
  return (
    <p class="font-mono text-xl font-semibold  text-center">
      looking for someone ...
    </p>
  );
};

export default JoinModal;
