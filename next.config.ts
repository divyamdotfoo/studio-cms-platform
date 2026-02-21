import { withPayload } from "@payloadcms/next/withPayload";
import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [{ hostname: "images.unsplash.com" }],
  },
  redirects: async () => {
    return [
      {
        source: "/whatsapp",
        destination:
          "https://wa.me/917668761558?text=Hello, I'm interested in your services",
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

export default withPayload(withMDX(nextConfig));
