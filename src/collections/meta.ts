import type { CollectionSlug, GlobalConfig } from "payload";
import { MediaCollection } from "./media";

export const MetaCollection: GlobalConfig = {
  slug: "meta",
  fields: [
    {
      name: "brand",
      label: "Brand",
      type: "text",
      required: true,
      defaultValue: "Acme Company",
    },

    {
      name: "profileImage",
      label: "Profile Image",
      type: "relationship",
      relationTo: [MediaCollection.slug as CollectionSlug],
      required: false,
      admin: {
        description: "Upload profile image for the about page.",
      },
    },
    {
      name: "favicon",
      label: "Favicon",
      type: "relationship",
      relationTo: [MediaCollection.slug as CollectionSlug],
      required: false,
      admin: {
        description: "Upload favicon (.ico recommended) for the website.",
      },
    },

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
    {
      name: "googleMapsEmbed",
      label: "Google Maps Embed Link",
      type: "text",
      required: true,
      defaultValue: "https://www.google.com/maps/embed",
    },
  ],
};
