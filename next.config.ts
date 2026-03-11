import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";
import { PHASE_PRODUCTION_BUILD } from "next/constants";

export default (phase: string) => {
  const isBuildingForProduction = phase === PHASE_PRODUCTION_BUILD;
  const nextConfig: NextConfig = {
    env: {
      IS_PROD_BUILD: String(isBuildingForProduction),
    },
    images: {
      remotePatterns: [{ hostname: "images.unsplash.com" }],
    },
  };

  return withPayload(nextConfig);
};
