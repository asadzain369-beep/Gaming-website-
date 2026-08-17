import { supabase } from "./supabase.js";
import { showMessage } from "./common.js";

const form =
  document.querySelector("#registerForm");

const message =
  document.querySelector("#registerMessage");

form?.addEventListener(
  "submit",
  async (event) => {
    event.preventDefault();

    const name =
      document
        .querySelector("#name")
        .value.trim();

    const minecraftId =
      document
        .querySelector("#minecraftId")
        .value.trim();

    const age =
      Number(
        document
          .querySelector("#age")
          .value
      );

    const email =
      document
        .querySelector("#email")
        .value.trim();

    const password =
      document
        .querySelector("#password")
        .value;

    const country =
      document
        .querySelector("#country")
        .value.trim();

    const discord =
      document
        .querySelector("#discord")
        .value.trim();

    if (age < 13 || age > 100) {
      showMessage(
        message,
        "Please enter a valid age."
      );
      return;
    }

    if (password.length < 8) {
      showMessage(
        message,
        "Password must contain at least 8 characters."
      );
      return;
    }

    showMessage(
      message,
      "Creating your account..."
    );

    const {
      data,
      error
    } =
      await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            name: name,
            minecraft_id:
              minecraftId,
            age: age,
            country: country,
            discord: discord
          }
        }
      });

    if (error) {
      showMessage(
        message,
        error.message
      );
      return;
    }

    showMessage(
      message,
      "Registration successful. Check your email if confirmation is enabled.",
      true
    );

    form.reset();
  }
);
