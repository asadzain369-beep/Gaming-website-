import { supabase } from "./supabase.js";
import { requireAdmin, logout } from "./common.js";

const message =
 document.querySelector("#adminMessage");

function notify(text) {
 if (message) {
  message.textContent = text;
 }
}

async function saveServer() {
 const online =
  document.querySelector("#serverOnline")
  .value === "true";

 const players =
  Number(
   document.querySelector("#serverPlayers")
   .value
  );

 const maxPlayers =
  Number(
   document.querySelector("#serverMaxPlayers")
   .value
  );

 const serverIp =
  document.querySelector("#serverIp")
  .value.trim();

 const { error } =
  await supabase
   .from("server_status")
   .upsert({
    id: 1,
    online: online,
    players: players,
    max_players: maxPlayers,
    server_ip: serverIp
   });

 if (error) {
  throw error;
 }
}

async function saveRules() {
 const content =
  document.querySelector("#rulesContent")
  .value.trim();

 const { error } =
  await supabase
   .from("server_rules")
   .upsert({
    id: 1,
    content: content
   });

 if (error) {
  throw error;
 }
}

async function addWhitelist() {
 const minecraftId =
  document.querySelector(
   "#whitelistMinecraftId"
  ).value.trim();

 const playerName =
  document.querySelector(
   "#whitelistPlayerName"
  ).value.trim();

 const { error } =
  await supabase
   .from("whitelist_players")
   .insert({
    minecraft_id: minecraftId,
    player_name: playerName
   });

 if (error) {
  throw error;
 }
}

async function banPlayer() {
 const minecraftId =
  document.querySelector(
   "#banMinecraftId"
  ).value.trim();

 const playerName =
  document.querySelector(
   "#banPlayerName"
  ).value.trim();

 const reason =
  document.querySelector(
   "#banReason"
  ).value.trim();

 const { error } =
  await supabase
   .from("banned_players")
   .insert({
    minecraft_id: minecraftId,
    player_name: playerName,
    reason: reason
   });

 if (error) {
  throw error;
 }
}

async function saveEvent(
 titleId,
 descriptionId,
 progressId,
 dateId
) {
 const title =
  document.querySelector(titleId)
  .value.trim();

 const description =
  document.querySelector(descriptionId)
  .value.trim();

 const progress =
  Math.max(
   0,
   Math.min(
    100,
    Number(
     document.querySelector(progressId)
     .value || 0
    )
   )
  );

 const eventDate =
  document.querySelector(dateId)
  .value || null;

 const { error } =
  await supabase
   .from("events")
   .upsert({
    title: title,
    description: description,
    progress: progress,
    event_date: eventDate
   });

 if (error) {
  throw error;
 }
}

async function publishAnnouncement() {
 const title =
  document.querySelector(
   "#announcementTitle"
  ).value.trim();

 const content =
  document.querySelector(
   "#announcementContent"
  ).value.trim();

 const { error } =
  await supabase
   .from("announcements")
   .insert({
    title: title,
    content: content
   });

 if (error) {
  throw error;
 }
}

async function saveLeaderboard() {
 const playerName =
  document.querySelector(
   "#leaderboardName"
  ).value.trim();

 const points =
  Number(
   document.querySelector(
    "#leaderboardPoints"
   ).value || 0
  );

 const kills =
  Number(
   document.querySelector(
    "#leaderboardKills"
   ).value || 0
  );

 const wins =
  Number(
   document.querySelector(
    "#leaderboardWins"
   ).value || 0
  );

 const { error } =
  await supabase
   .from("leaderboard")
   .upsert({
    player_name: playerName,
    points: points,
    kills: kills,
    wins: wins
   });

 if (error) {
  throw error;
 }
}

async function saveHome() {
 const siteTitle =
  document.querySelector(
   "#siteTitle"
  ).value.trim();

 const heroHeading =
  document.querySelector(
   "#heroHeading"
  ).value.trim();

 const heroDescription =
  document.querySelector(
   "#heroDescription"
  ).value.trim();

 const { error } =
  await supabase
   .from("website_settings")
   .upsert({
    id: 1,
    site_title: siteTitle,
    hero_heading: heroHeading,
    hero_description:
     heroDescription
   });

 if (error) {
  throw error;
 }
}

async function createCustomSection() {
 const section = {
  section_name:
   document.querySelector(
    "#sectionName"
   ).value.trim(),

  page_name:
   document.querySelector(
    "#sectionPage"
   ).value,

  heading:
   document.querySelector(
    "#sectionHeading"
   ).value.trim(),

  content:
   document.querySelector(
    "#sectionContent"
   ).value.trim(),

  font_family:
   document.querySelector(
    "#sectionFont"
   ).value.trim(),

  font_size:
   document.querySelector(
    "#sectionFontSize"
   ).value.trim(),

  text_color:
   document.querySelector(
    "#sectionTextColor"
   ).value,

  background_color:
   document.querySelector(
    "#sectionBackground"
   ).value,

  padding:
   document.querySelector(
    "#sectionPadding"
   ).value.trim(),

  margin:
   document.querySelector(
    "#sectionMargin"
   ).value.trim(),

  border_radius:
   document.querySelector(
    "#sectionRadius"
   ).value.trim(),

  text_alignment:
   document.querySelector(
    "#sectionAlignment"
   ).value,

  visible:
   document.querySelector(
    "#sectionVisible"
   ).value === "true"
 };

 const { error } =
  await supabase
   .from("custom_sections")
   .insert(section);

 if (error) {
  throw error;
 }
}

function bindForm(
 selector,
 callback
) {
 const form =
  document.querySelector(selector);

 form?.addEventListener(
  "submit",
  async (event) => {

   event.preventDefault();

   notify("Saving...");

   try {
    await callback();

    notify(
     "Saved successfully."
    );

    form.reset();

   } catch (error) {

    notify(
     error.message
    );
   }
  }
 );
}

async function startAdmin() {

 const user =
  await requireAdmin();

 if (!user) {
  return;
 }

 bindForm(
  "#serverForm",
  saveServer
 );

 bindForm(
  "#rulesForm",
  saveRules
 );

 bindForm(
  "#whitelistForm",
  addWhitelist
 );

 bindForm(
  "#banForm",
  banPlayer
 );

 bindForm(
  "#buildingEventForm",
  () =>
   saveEvent(
    "#buildingTitle",
    "#buildingDescription",
    "#buildingProgress",
    "#buildingDate"
   )
 );

 bindForm(
  "#pvpEventForm",
  () =>
   saveEvent(
    "#pvpTitle",
    "#pvpDescription",
    "#pvpProgress",
    "#pvpDate"
   )
 );

 bindForm(
  "#parkourEventForm",
  () =>
   saveEvent(
    "#parkourTitle",
    "#parkourDescription",
    "#parkourProgress",
    "#parkourDate"
   )
 );

 bindForm(
  "#announcementForm",
  publishAnnouncement
 );

 bindForm(
  "#leaderboardForm",
  saveLeaderboard
 );

 bindForm(
  "#homeForm",
  saveHome
 );

 bindForm(
  "#customSectionForm",
  createCustomSection
 );

 document
  .querySelector("#adminLogout")
  ?.addEventListener(
   "click",
   () => logout("admin-login.html")
  );
}

startAdmin();
