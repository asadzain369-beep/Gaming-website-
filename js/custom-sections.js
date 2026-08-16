import { supabase } from "./supabase.js";

export async function loadCustomSections(
  pageName,
  selector
) {
  const container =
    document.querySelector(selector);

  if (!container) {
    return;
  }

  const { data, error } =
    await supabase
      .from("custom_sections")
      .select("*")
      .eq("page_name", pageName)
      .eq("visible", true)
      .order(
        "sort_order",
        { ascending: true }
      );

  if (error) {
    console.error(error);
    return;
  }

  container.innerHTML = "";

  data.forEach(
    (section) => {
      const element =
        document.createElement(
          "section"
        );

      element.className =
        "custom-section";

      element.style.fontFamily =
        section.font_family;

      element.style.fontSize =
        section.font_size;

      element.style.color =
        section.text_color;

      element.style.backgroundColor =
        section.background_color;

      element.style.padding =
        section.padding;

      element.style.margin =
        section.margin;

      element.style.borderRadius =
        section.border_radius;

      element.style.textAlign =
        section.text_alignment;

      const heading =
        document.createElement(
          "h2"
        );

      heading.textContent =
        section.heading ||
        section.section_name;

      const content =
        document.createElement(
          "p"
        );

      content.textContent =
        section.content || "";

      element.append(
        heading,
        content
      );

      container.appendChild(
        element
      );
    }
  );
          }
