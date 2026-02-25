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
import { HomepageCollection } from "./src/collections/homepage";
import { FaqCollection } from "./src/collections/faq";
import { MicroOfferingsCollection } from "./src/collections/micro-offering";
import { ReviewsCollection } from "./src/collections/reviews";
import { uploadthingStorage } from "@payloadcms/storage-uploadthing";

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
    uploadthingStorage({
      collections: {
        media: true,
      },
      options: {
        token: process.env.UPLOADTHING_TOKEN || "",
        acl: "public-read",
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
