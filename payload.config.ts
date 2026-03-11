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

const withAdminGroup = <
  T extends { admin?: Record<string, unknown> | undefined }
>(
  config: T,
  group: string
): T => ({
  ...config,
  admin: {
    ...(config.admin || {}),
    group,
  },
});

const buildCollections = (
  definitions: Array<{
    collection: CollectionConfig;
    group: string;
    publicRead?: boolean;
  }>
): CollectionConfig[] =>
  definitions.map(({ collection, group, publicRead = true }) => {
    const configuredCollection = publicRead
      ? publicCollection(collection)
      : collection;

    return withAdminGroup(configuredCollection, group);
  });

const buildGlobals = (
  definitions: Array<{
    global: GlobalConfig;
    group: string;
    publicRead?: boolean;
  }>
): GlobalConfig[] =>
  definitions.map(({ global, group, publicRead = true }) => {
    const configuredGlobal = publicRead ? publicGlobal(global) : global;

    return withAdminGroup(configuredGlobal, group);
  });

export default buildConfig({
  admin: {
    user: AdminCollection.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      beforeDashboard: ["@/components/payload/AdminCacheNotice"],
      afterDashboard: ["@/components/payload/AdminDashboardBottomPadding"],
    },
  },
  email: resendAdapter({
    defaultFromAddress: "Divyam <onboarding@resend.dev>",
    defaultFromName: "Divyam gupta",
    apiKey: process.env.RESEND_API_KEY || "",
  }),
  globals: buildGlobals([
    { global: HomepageCollection, group: "Pages" },
    { global: BlogPageCollection, group: "Pages" },
    { global: ServicesPageCollection, group: "Pages" },
    { global: ProjectsPageCollection, group: "Pages" },
    { global: AboutPageCollection, group: "Pages" },
    { global: SeoConfigCollection, group: "Settings" },
    { global: MetaCollection, group: "Settings" },
  ]),
  collections: buildCollections([
    { collection: AdminCollection, group: "Admin", publicRead: false },
    { collection: ProjectCollection, group: "Entities" },
    { collection: ServiceCollection, group: "Entities" },
    { collection: ServiceItemCollection, group: "Entities" },
    { collection: ReviewsCollection, group: "Entities" },
    { collection: FaqCollection, group: "Entities" },
    { collection: BlogCollection, group: "Entities" },
    { collection: MicroOfferingsCollection, group: "Entities" },
    { collection: MediaCollection, group: "Entities" },
  ]),

  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
      max: 2,
      min: 0,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 10_000,
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
  ],
  telemetry: false,
});
