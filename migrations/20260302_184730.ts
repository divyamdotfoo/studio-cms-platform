import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "meta" ADD COLUMN "brand" varchar DEFAULT 'Acme Company' NOT NULL;
  ALTER TABLE "meta" ADD COLUMN "google_maps_embed" varchar DEFAULT 'https://www.google.com/maps/embed' NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "meta" DROP COLUMN "brand";
  ALTER TABLE "meta" DROP COLUMN "google_maps_embed";`)
}
