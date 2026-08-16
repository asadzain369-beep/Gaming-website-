import { supabase } from "./supabase.js";

export async function getUser() {
 const {
  data: { user }
 } = await supabase.auth.getUser();
 return user;
}

export async function requireLogin() {
 const user = await getUser();
 if (!user) {
  window.location.href = "login.html";
  return null;
 }
 return user;
}

export async function requireAdmin() {
 const user = await getUser();
 if (!user) {
  window.location.href = "admin-login.html";
  return null;
 }
 const { data: profile, error } =
 await supabase
 .from("profiles")
 .select("role")
 .eq("id", user.id)
 .single();
 if (
 error ||
 !profile ||
 profile.role !== "admin"
 ) {
 await supabase.auth.signOut();
 window.location.href = "admin-login.html";
 return null;
 }
 return user;
}

export async function logout(destination="login.html") {
 await supabase.auth.signOut();
 window.location.href = destination;
}

export function showMessage(element, text, success=false) {
 if (!element) {
 return;
 }
 element.textContent = text;
 element.classList.toggle(
 "success-message",
 success
 );
}

export function escapeText(value) {
 const div = document.createElement("div");
 div.textContent =
 value == null ? "" : String(value);
 return div.innerHTML;
   }
