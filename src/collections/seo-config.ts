import type { GlobalConfig } from "payload";

export const SeoConfigCollection: GlobalConfig = {
  slug: "seo-config",
  fields: [
    {
      name: "metadataBase",
      label: "Metadata Base URL",
      type: "text",
      required: true,
    },
    {
      name: "siteName",
      label: "Site Name",
      type: "text",
      required: true,
    },
    {
      name: "titleSuffix",
      label: "Metadata Title Suffix",
      type: "text",
      required: true,
    },
    {
      name: "defaultRobotsIndex",
      label: "Default Robots: Index",
      type: "checkbox",
      required: true,
      defaultValue: true,
    },
    {
      name: "defaultRobotsFollow",
      label: "Default Robots: Follow",
      type: "checkbox",
      required: true,
      defaultValue: true,
    },
    {
      name: "defaultTwitterCard",
      label: "Default Twitter Card",
      type: "select",
      required: true,
      defaultValue: "summary_large_image",
      options: [
        { label: "Summary", value: "summary" },
        { label: "Summary Large Image", value: "summary_large_image" },
      ],
    },
    {
      name: "defaultOgImageUrl",
      label: "Default OpenGraph Image URL",
      type: "text",
      required: true,
    },
    {
      name: "defaultOgImageAlt",
      label: "Default OpenGraph Image Alt",
      type: "text",
      required: true,
    },
    {
      name: "serviceNotFoundTitle",
      label: "Service Not Found Title",
      type: "text",
      required: true,
    },
    {
      name: "serviceItemNotFoundTitle",
      label: "Service Item Not Found Title",
      type: "text",
      required: true,
    },
    {
      name: "organization",
      label: "Organization Schema",
      type: "group",
      fields: [
        {
          name: "name",
          label: "Organization Name",
          type: "text",
          required: true,
        },
        {
          name: "legalName",
          label: "Legal Name",
          type: "text",
          required: true,
        },
        {
          name: "url",
          label: "Website URL",
          type: "text",
          required: true,
        },
        {
          name: "logoUrl",
          label: "Logo URL",
          type: "text",
          required: true,
        },
        {
          name: "telephone",
          label: "Telephone",
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
          name: "foundingDate",
          label: "Founding Date",
          type: "text",
          required: true,
        },
        {
          name: "description",
          label: "Organization Description",
          type: "textarea",
          required: true,
        },
        {
          name: "priceRange",
          label: "Price Range",
          type: "text",
          required: true,
        },
        {
          name: "founderName",
          label: "Founder Name",
          type: "text",
          required: true,
        },
        {
          name: "founderJobTitle",
          label: "Founder Job Title",
          type: "text",
          required: true,
        },
        {
          name: "addressLocality",
          label: "Address Locality",
          type: "text",
          required: true,
        },
        {
          name: "addressRegion",
          label: "Address Region",
          type: "text",
          required: true,
        },
        {
          name: "addressCountry",
          label: "Address Country",
          type: "text",
          required: true,
        },
        {
          name: "geoLatitude",
          label: "Geo Latitude",
          type: "number",
          required: true,
        },
        {
          name: "geoLongitude",
          label: "Geo Longitude",
          type: "number",
          required: true,
        },
        {
          name: "sameAs",
          label: "SameAs Links",
          type: "array",
          fields: [
            {
              name: "url",
              label: "URL",
              type: "text",
              required: true,
            },
          ],
        },
        {
          name: "areaServed",
          label: "Area Served",
          type: "array",
          fields: [
            {
              name: "name",
              label: "Location Name",
              type: "text",
              required: true,
            },
            {
              name: "type",
              label: "Schema Type",
              type: "select",
              required: true,
              options: [
                { label: "City", value: "City" },
                { label: "State", value: "State" },
                { label: "Country", value: "Country" },
              ],
            },
          ],
        },
        {
          name: "serviceCatalog",
          label: "Service Catalog",
          type: "array",
          fields: [
            {
              name: "name",
              label: "Service Name",
              type: "text",
              required: true,
            },
            {
              name: "description",
              label: "Service Description",
              type: "textarea",
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
