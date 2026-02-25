import type { GlobalConfig } from "payload";

export const MetaCollection: GlobalConfig = {
  slug: "meta",
  fields: [
    {
      name: "phone",
      label: "Phone Number",
      type: "text",
      required: true,
    },
    {
      name: "whatsapp",
      label: "Whatsapp Link",
      type: "text",
      required: true,
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      required: true,
    },
    {
      name: "insta",
      label: "Instagram Handle",
      type: "text",
      required: true,
    },
    {
      name: "youtube",
      label: "Youtube Handle",
      type: "text",
      required: true,
    },
    {
      name: "tagline_footer",
      label: "Tagline for footer",
      type: "text",
      required: true,
    },
    {
      name: "instaFollowers",
      label: "Instagram Followers",
      type: "text",
      required: true,
    },
    {
      name: "youtubeSubscribers",
      label: "Youtube Subscribers",
      type: "text",
      required: true,
    },
    {
      name: "ownerName",
      label: "Owner Name",
      type: "text",
      required: true,
    },
    {
      name: "ownerRole",
      label: "Owner Role",
      type: "text",
      required: true,
    },
    {
      name: "yearOfEstablishment",
      label: "Year of Establishment",
      type: "number",
      required: true,
    },
    {
      name: "headquartersLocation",
      label: "Headquarters Location",
      type: "text",
      required: true,
    },
  ],
};
