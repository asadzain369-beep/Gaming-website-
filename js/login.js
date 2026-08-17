import { supabase } from "./supabase.js";
import { showMessage } from "./common.js";

const form =
  document.querySelector("#loginForm");

const message =
  document.querySelector("#loginMessage");

form?.addEventListener(
  "submit",
  async (event) => {
    event.preventDefault();

    const email =
      document
        .querySelector("#email")
        .value.trim();

    const password =
      document
        .querySelector("#password")
        .value;

    showMessage(
      message,
      "Logging in..."
    );

    const {
      data,
      error
    } =
      await supabase.auth
        .signInWithPassword({
          email,
          password
        });

    if (error) {
      showMessage(
        message,
        error.message
      );
      return;
    }

    const {
      data: profile
    } =
      await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

    if (
      profile &&
      profile.role === "admin"
    ) {
      window.location.href =
        "admin.html";
      return;
    }

    window.location.href =
      "dashboard.html";
  }
);
