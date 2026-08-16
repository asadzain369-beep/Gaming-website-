import { supabase } from "./supabase.js";

import { showMessage } from "./common.js";

const form =
 document.querySelector("#adminLoginForm");

const message =
 document.querySelector("#adminLoginMessage");

form?.addEventListener(
 "submit",
 async (event) => {

  event.preventDefault();

  const email =
   document.querySelector("#adminEmail")
   .value.trim();

  const password =
   document.querySelector("#adminPassword")
   .value;

  showMessage(
   message,
   "Checking administrator account..."
  );

  const {
   data,
   error
  } =
   await supabase.auth
   .signInWithPassword({
    email,
    password
   });

  if (error) {
   showMessage(
    message,
    "Invalid administrator credentials."
   );
   return;
  }

  const {
   data: profile
  } =
   await supabase
   .from("profiles")
   .select("role")
   .eq("id", data.user.id)
   .single();

  if (
   !profile ||
   profile.role !== "admin"
  ) {

   await supabase.auth.signOut();

   showMessage(
    message,
    "You are not authorized to access the Admin Panel."
   );

   return;
  }

  window.location.href =
   "admin.html";
 }
);
