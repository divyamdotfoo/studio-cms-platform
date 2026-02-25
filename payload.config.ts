import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
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
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: AdminCollection.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  email: resendAdapter({
    defaultFromAddress: "Divyam <onboarding@resend.dev>",
    defaultFromName: "Divyam gupta",
    apiKey: process.env.RESEND_API_KEY || "",
  }),
  collections: [
    AdminCollection,
    FaqCollection,
    MediaCollection,
    MicroOfferingsCollection,
    ProjectCollection,
    ReviewsCollection,
  ],
  globals: [
    MetaCollection,
    HomepageCollection,
    ProjectsPageCollection,
    AboutPageCollection,
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
  }),
  sharp,
  plugins: [
    // uploadthingStorage({
    //   collections: {
    //     media: true,
    //   },
    //   options: {
    //     token: process.env.UPLOADTHING_TOKEN || "",
    //     acl: "public-read",
    //   },
    // }),
    s3Storage({
      collections: {
        media: true,
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
      scriptPath: path.resolve(dirname, "seed.ts"),
      key: "seed",
    },
  ],
  telemetry: false,
});
