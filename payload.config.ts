import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig, type CollectionConfig, type GlobalConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { AdminCollection } from "./src/collections/admin";
import { MediaCollection } from "./src/collections/media";
import { ProjectCollection } from "./src/collections/project";
import { MetaCollection } from "./src/collections/meta";
import { HomepageCollection } from "./src/collections/home-page";
import { FaqCollection } from "./src/collections/faq";
import { MicroOfferingsCollection } from "./src/collections/micro-offering";
import { ReviewsCollection } from "./src/collections/reviews";
import { ProjectsPageCollection } from "@/collections/projects-page";
import { AboutPageCollection } from "@/collections/about-page";
import { resendAdapter } from "@payloadcms/email-resend";
import { s3Storage } from "@payloadcms/storage-s3";
import { ServiceCollection } from "@/collections/service";
import { ServiceItemCollection } from "@/collections/service-item";
import { BlogCollection } from "@/collections/blog";
import { BlogPageCollection } from "@/collections/blog-page";
import { SeoConfigCollection } from "@/collections/seo-config";
import { ServicesPageCollection } from "@/collections/services-page";
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const isAdmin = ({ req }: { req: { user?: unknown } }) => Boolean(req.user);

const publicReadCollectionAccess = {
  read: () => true,
  create: isAdmin,
  update: isAdmin,
  delete: isAdmin,
};

const publicReadGlobalAccess = {
  read: () => true,
  update: isAdmin,
};

const publicCollection = <T extends CollectionConfig>(collection: T): T => ({
  ...collection,
  access: publicReadCollectionAccess,
});

const publicGlobal = <T extends GlobalConfig>(globalConfig: T): T => ({
  ...globalConfig,
  access: publicReadGlobalAccess,
});

export default buildConfig({
  admin: {
    user: AdminCollection.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      beforeDashboard: ["@/components/payload/AdminCacheNotice"],
    },
  },
  email: resendAdapter({
    defaultFromAddress: "Divyam <onboarding@resend.dev>",
    defaultFromName: "Divyam gupta",
    apiKey: process.env.RESEND_API_KEY || "",
  }),
  collections: [
    AdminCollection,
    publicCollection(BlogCollection),
    publicCollection(FaqCollection),
    publicCollection(MediaCollection),
    publicCollection(MicroOfferingsCollection),
    publicCollection(ProjectCollection),
    publicCollection(ReviewsCollection),
    publicCollection(ServiceCollection),
    publicCollection(ServiceItemCollection),
  ],
  globals: [
    publicGlobal(MetaCollection),
    publicGlobal(SeoConfigCollection),
    publicGlobal(HomepageCollection),
    publicGlobal(BlogPageCollection),
    publicGlobal(ServicesPageCollection),
    publicGlobal(ProjectsPageCollection),
    publicGlobal(AboutPageCollection),
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
    migrationDir: path.resolve(dirname, "migrations"),
    push: false,
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: {
          generateFileURL:
            process.env.NODE_ENV === "development"
              ? undefined
              : ({ filename }) =>
                  `${process.env.CLOUDFLARE_PUBLIC_URL}/${filename}`,
        },
      },
      bucket: process.env.S3_BUCKET || "",
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
        },
        region: process.env.S3_REGION,
        endpoint: process.env.S3_ENDPOINT || "",
      },
    }),
  ],
  bin: [
    {
      scriptPath: path.resolve(dirname, "local/seed.ts"),
      key: "seed",
    },
    {
      scriptPath: path.resolve(dirname, "local/seed-blogs.ts"),
      key: "seed-blogs",
    },
    {
      scriptPath: path.resolve(dirname, "local/seed-seo.ts"),
      key: "seed-seo",
    },
  ],
  telemetry: false,
});
