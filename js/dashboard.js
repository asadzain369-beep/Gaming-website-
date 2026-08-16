import { supabase } from "./supabase.js";

import {
 requireLogin,
 logout
} from "./common.js";

async function loadDashboard() {

 const user =
 await requireLogin();

 if (!user) {
  return;
 }

 const {
  data: profile,
  error
 } =
 await supabase
  .from("profiles")
  .select(
   "name,minecraft_id,age,coins,kills,wins"
  )
  .eq("id", user.id)
  .single();

 if (error) {
  console.error(error);
  return;
 }

 document.querySelector(
  "#username"
 ).textContent =
 profile.minecraft_id;

 document.querySelector(
  "#minecraftId"
 ).textContent =
 profile.minecraft_id;

 document.querySelector(
  "#playerName"
 ).textContent =
 profile.name;

 document.querySelector(
  "#age"
 ).textContent =
 profile.age;

 document.querySelector(
  "#coins"
 ).textContent =
 profile.coins;

 document.querySelector(
  "#kills"
 ).textContent =
 profile.kills;

 document.querySelector(
  "#wins"
 ).textContent =
 profile.wins;
}

document
 .querySelector("#logoutButton")
 ?.addEventListener(
  "click",
  () => logout("login.html")
 );

loadDashboard();
