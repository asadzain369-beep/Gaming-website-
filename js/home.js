import { supabase } from "./supabase.js";
import "./common.js";
import { loadCustomSections } from "./custom-sections.js";

async function loadHome() {
  const { data: settings } =
    await supabase
      .from("website_settings")
      .select("*")
      .eq("id", 1)
      .single();

  if (settings) {
    document.querySelector(
      "#heroHeading"
    ).textContent =
      settings.hero_heading;

    document.querySelector(
      "#heroDescription"
    ).textContent =
      settings.hero_description;

    document.title =
      settings.site_title;
  }

  const { data: server } =
    await supabase
      .from("server_status")
      .select("*")
      .eq("id", 1)
      .single();

  if (server) {
    document.querySelector(
      "#publicServerStatus"
    ).textContent =
      server.online
        ? "Online"
        : "Offline";

    document.querySelector(
      "#publicPlayers"
    ).textContent =
      `${server.players}/${server.max_players}`;

    document.querySelector(
      "#publicServerIp"
    ).textContent =
      server.server_ip ||
      "Not available";
  }

  await loadCustomSections(
    "Home",
    "#customSections"
  );
}

loadHome();
