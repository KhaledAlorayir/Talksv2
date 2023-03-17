import type { Component } from "solid-js";
import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";

const Auth: Component = () => {
  const [isLogin, setIsLogin] = createSignal(true);
  const [form, setForm] = createStore({ email: "", password: "" });

  async function submitHandler(event: Event) {
    event.preventDefault();
    // use create resorce??
    if (isLogin()) {
    } else {
      //solve types
      // maybe init client is wrong?
      //const res = await client.service('users');
      //console.log(res);
    }
  }

  return (
    <>
      <input type="checkbox" class="modal-toggle" checked={false} />
      <div class="modal">
        <form class="modal-box w-11/12 max-w-4xl" onSubmit={submitHandler}>
          <header class="font-mono mb-12 text-center">
            <h4 class="text-xl font-semibold mb-3">
              {isLogin() ? "Login 🐤" : "Register 🐣"}
            </h4>
            <button
              onClick={() => setIsLogin((pre) => !pre)}
              class="btn btn-ghost"
              type="button"
            >
              {isLogin()
                ? "you don't have an account?"
                : "you have an account?"}
            </button>
          </header>
          <div class="mb-8">
            <input
              type="email"
              placeholder="email"
              class="input input-bordered w-full"
              required
              onInput={(e) => setForm({ email: e.currentTarget.value })}
            />
          </div>
          <div class="mb-8">
            <input
              type="password"
              placeholder="password"
              class="input input-bordered w-full"
              required
              minLength={8}
              maxLength={255}
              onInput={(e) => setForm({ password: e.currentTarget.value })}
            />
          </div>
          <div class="modal-action">
            <button class="btn" type="submit">
              Yay!
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Auth;
