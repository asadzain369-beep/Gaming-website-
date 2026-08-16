import { supabase } from "./supabase.js";
import { loadCustomSections } from "./custom-sections.js";

async function loadPlayers() {
  const whitelist =
    await supabase
      .from("whitelist_players")
      .select(
        "minecraft_id,player_name"
      )
      .order(
        "minecraft_id",
        { ascending: true }
      );

  const banned =
    await supabase
      .from("banned_players")
      .select(
        "minecraft_id,player_name,reason"
      )
      .order(
        "minecraft_id",
        { ascending: true }
      );

  const whitelistBox =
    document.querySelector(
      "#whitelistedPlayers"
    );

  const bannedBox =
    document.querySelector(
      "#bannedPlayers"
    );

  whitelistBox.innerHTML = "";

  whitelist.data?.forEach(
    (player) => {
      const item =
        document.createElement("div");

      item.className =
        "player-item";

      item.textContent =
        `${player.player_name || "Player"} — ${player.minecraft_id}`;

      whitelistBox.appendChild(item);
    }
  );

  bannedBox.innerHTML = "";

  banned.data?.forEach(
    (player) => {
      const item =
        document.createElement("div");

      item.className =
        "player-item";

      item.textContent =
        `${player.player_name || "Player"} — ${player.minecraft_id} — ${player.reason || "No reason provided"}`;

      bannedBox.appendChild(item);
    }
  );

  await loadCustomSections(
    "Players",
    "#customSections"
  );
}

loadPlayers();
