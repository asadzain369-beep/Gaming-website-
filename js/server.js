import { supabase } from "./supabase.js";
import { loadCustomSections } from "./custom-sections.js";

async function loadServer() {
  const { data } =
    await supabase
      .from("server_status")
      .select("*")
      .eq("id", 1)
      .single();

  if (data) {
    document.querySelector(
      "#serverStatus"
    ).textContent =
      data.online
        ? "Online"
        : "Offline";

    document.querySelector(
      "#serverPlayers"
    ).textContent =
      `${data.players}/${data.max_players}`;

    document.querySelector(
      "#serverIp"
    ).textContent =
      data.server_ip ||
      "Not available";
  }

  await loadCustomSections(
    "Server",
    "#customSections"
  );
}

loadServer();
