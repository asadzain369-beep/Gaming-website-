import { supabase } from "./supabase.js";
import { requireLogin, showMessage } from "./common.js";

const form =
  document.querySelector(
    "#problemForm"
  );

const message =
  document.querySelector(
    "#problemMessage"
  );

form?.addEventListener(
  "submit",
  async (event) => {

    event.preventDefault();

    const user =
      await requireLogin();

    if (!user) {
      return;
    }

    const title =
      document.querySelector(
        "#problemTitle"
      ).value.trim();

    const type =
      document.querySelector(
        "#problemType"
      ).value;

    const description =
      document.querySelector(
        "#problemDescription"
      ).value.trim();

    const { error } =
      await supabase
        .from("problems")
        .insert({
          user_id: user.id,
          title: title,
          problem_type: type,
          description:
            description
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
      "Problem submitted successfully.",
      true
    );

    form.reset();
  }
);
