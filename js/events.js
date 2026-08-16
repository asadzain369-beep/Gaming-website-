import { supabase } from "./supabase.js";
import { loadCustomSections } from "./custom-sections.js";

async function loadEvents() {
  const {
    data,
    error
  } =
    await supabase
      .from("events")
      .select(
        "id,title,description,event_date,progress"
      )
      .order(
        "event_date",
        { ascending: true }
      );

  const box =
    document.querySelector(
      "#eventsContainer"
    );

  if (error) {
    box.textContent =
      error.message;
    return;
  }

  box.innerHTML = "";

  data.forEach(
    (event) => {
      const card =
        document.createElement(
          "article"
        );

      card.className =
        "card event-card";

      const title =
        document.createElement(
          "h2"
        );

      title.textContent =
        event.title;

      const circle =
        document.createElement(
          "div"
        );

      circle.className =
        "progress-circle";

      const progress =
        Math.max(
          0,
          Math.min(
            100,
            Number(
              event.progress || 0
            )
          )
        );

      circle.style.setProperty(
        "--progress",
        progress
      );

      const value =
        document.createElement(
          "span"
        );

      value.className =
        "progress-value";

      value.textContent =
        `${progress}%`;

      circle.appendChild(value);

      const description =
        document.createElement(
          "p"
        );

      description.textContent =
        event.description || "";

      card.append(
        title,
        circle,
        description
      );

      box.appendChild(card);
    }
  );

  await loadCustomSections(
    "Events",
    "#customSections"
  );
}

loadEvents();
