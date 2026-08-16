import { supabase } from "./supabase.js";
import { loadCustomSections } from "./custom-sections.js";

async function loadRules() {
  const { data } =
    await supabase
      .from("server_rules")
      .select("content")
      .eq("id", 1)
      .single();

  const element =
    document.querySelector("#fullRules");

  if (element) {
    element.textContent =
      data?.content ||
      "Rules are currently unavailable.";
  }

  await loadCustomSections(
    "Rules",
    "#customSections"
  );
}

loadRules();
