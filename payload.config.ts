import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { AdminCollection } from "./collections/admin";
import { MediaCollection } from "./collections/media";
import { ProjectCollection } from "./collections/project";
import { MetaCollection } from "./collections/meta";
import { s3Storage } from "@payloadcms/storage-s3";
import { HomepageCollection } from "./collections/homepage";
import { FaqCollection } from "./collections/faq";
import { MicroOfferingsCollection } from "./collections/micro-offering";
import { ReviewsCollection } from "./collections/reviews";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: AdminCollection.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    AdminCollection,
    FaqCollection,
    MediaCollection,
    MicroOfferingsCollection,
    ProjectCollection,
    ReviewsCollection,
  ],
  globals: [MetaCollection, HomepageCollection],
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
    s3Storage({
      collections: {
        media: {
          prefix: "dev",
        },
      },
      bucket: process.env.S3_BUCKET || "",
      config: {
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
        },
        region: process.env.S3_REGION || "",
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
