import { supabase } from "./supabase.js";
import { loadCustomSections } from "./custom-sections.js";

async function loadAnnouncements() {
  const { data, error } =
    await supabase
      .from("announcements")
      .select(
        "title,content,created_at"
      )
      .order(
        "created_at",
        { ascending: false }
      );

  const box =
    document.querySelector(
      "#announcementsContainer"
    );

  if (error) {
    box.textContent =
      error.message;
    return;
  }

  box.innerHTML = "";

  data.forEach(
    (announcement) => {
      const card =
        document.createElement(
          "article"
        );

      card.className =
        "card";

      const title =
        document.createElement(
          "h2"
        );

      title.textContent =
        announcement.title;

      const content =
        document.createElement(
          "p"
        );

      content.textContent =
        announcement.content;

      card.append(
        title,
        content
      );

      box.appendChild(card);
    }
  );

  await loadCustomSections(
    "Announcements",
    "#customSections"
  );
}

loadAnnouncements();
