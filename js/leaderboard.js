import { supabase } from "./supabase.js";
import { loadCustomSections } from "./custom-sections.js";

async function loadLeaderboard() {
  const { data, error } =
    await supabase
      .from("leaderboard")
      .select(
        "player_name,points,kills,wins"
      )
      .order(
        "points",
        { ascending: false }
      );

  const box =
    document.querySelector(
      "#leaderboardContainer"
    );

  if (error) {
    box.textContent =
      error.message;
    return;
  }

  box.innerHTML = "";

  data.forEach(
    (player, index) => {
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
        `#${index + 1} ${player.player_name}`;

      const stats =
        document.createElement(
          "p"
        );

      stats.textContent =
        `Points: ${player.points} | Kills: ${player.kills} | Wins: ${player.wins}`;

      card.append(
        title,
        stats
      );

      box.appendChild(card);
    }
  );

  await loadCustomSections(
    "Leaderboard",
    "#customSections"
  );
}

loadLeaderboard();
