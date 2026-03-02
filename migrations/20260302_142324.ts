import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_blog_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_seo_config_organization_area_served_type" AS ENUM('City', 'State', 'Country');
  CREATE TYPE "public"."enum_seo_config_default_twitter_card" AS ENUM('summary', 'summary_large_image');
  CREATE TABLE "blog" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"status" "enum_blog_status" DEFAULT 'draft' NOT NULL,
  	"published_at" timestamp(3) with time zone,
  	"reading_time" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"cover_image" varchar NOT NULL,
  	"cover_image_alt" varchar NOT NULL,
  	"content" varchar NOT NULL,
  	"seo_title" varchar NOT NULL,
  	"seo_description" varchar NOT NULL,
  	"seo_keywords" varchar NOT NULL,
  	"seo_open_graph_title" varchar NOT NULL,
  	"seo_open_graph_description" varchar NOT NULL,
  	"seo_twitter_title" varchar NOT NULL,
  	"seo_twitter_description" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "seo_config_organization_same_as" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar
  );
  
  CREATE TABLE "seo_config_organization_area_served" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"type" "enum_seo_config_organization_area_served_type"
  );
  
  CREATE TABLE "seo_config_organization_service_catalog" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "seo_config" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"metadata_base" varchar,
  	"site_name" varchar,
  	"title_suffix" varchar,
  	"default_robots_index" boolean DEFAULT true,
  	"default_robots_follow" boolean DEFAULT true,
  	"default_twitter_card" "enum_seo_config_default_twitter_card" DEFAULT 'summary_large_image',
  	"default_og_image_url" varchar,
  	"default_og_image_alt" varchar,
  	"service_not_found_title" varchar,
  	"service_item_not_found_title" varchar,
  	"organization_name" varchar,
  	"organization_legal_name" varchar,
  	"organization_url" varchar,
  	"organization_logo_url" varchar,
  	"organization_telephone" varchar,
  	"organization_email" varchar,
  	"organization_founding_date" varchar,
  	"organization_description" varchar,
  	"organization_price_range" varchar,
  	"organization_founder_name" varchar,
  	"organization_founder_job_title" varchar,
  	"organization_address_locality" varchar,
  	"organization_address_region" varchar,
  	"organization_address_country" varchar,
  	"organization_geo_latitude" numeric,
  	"organization_geo_longitude" numeric,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "blogs_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_keywords" varchar,
  	"seo_canonical_path" varchar,
  	"seo_open_graph_title" varchar,
  	"seo_open_graph_description" varchar,
  	"seo_twitter_title" varchar,
  	"seo_twitter_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "services_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_keywords" varchar,
  	"seo_canonical_path" varchar,
  	"seo_open_graph_title" varchar,
  	"seo_open_graph_description" varchar,
  	"seo_twitter_title" varchar,
  	"seo_twitter_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "blog_id" integer;
  ALTER TABLE "homepage" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "homepage" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "homepage" ADD COLUMN "seo_keywords" varchar;
  ALTER TABLE "homepage" ADD COLUMN "seo_canonical_path" varchar;
  ALTER TABLE "homepage" ADD COLUMN "seo_open_graph_title" varchar;
  ALTER TABLE "homepage" ADD COLUMN "seo_open_graph_description" varchar;
  ALTER TABLE "homepage" ADD COLUMN "seo_twitter_title" varchar;
  ALTER TABLE "homepage" ADD COLUMN "seo_twitter_description" varchar;
  ALTER TABLE "projects_page" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "projects_page" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "projects_page" ADD COLUMN "seo_keywords" varchar;
  ALTER TABLE "projects_page" ADD COLUMN "seo_canonical_path" varchar;
  ALTER TABLE "projects_page" ADD COLUMN "seo_open_graph_title" varchar;
  ALTER TABLE "projects_page" ADD COLUMN "seo_open_graph_description" varchar;
  ALTER TABLE "projects_page" ADD COLUMN "seo_twitter_title" varchar;
  ALTER TABLE "projects_page" ADD COLUMN "seo_twitter_description" varchar;
  ALTER TABLE "about_page" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "about_page" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "about_page" ADD COLUMN "seo_keywords" varchar;
  ALTER TABLE "about_page" ADD COLUMN "seo_canonical_path" varchar;
  ALTER TABLE "about_page" ADD COLUMN "seo_open_graph_title" varchar;
  ALTER TABLE "about_page" ADD COLUMN "seo_open_graph_description" varchar;
  ALTER TABLE "about_page" ADD COLUMN "seo_twitter_title" varchar;
  ALTER TABLE "about_page" ADD COLUMN "seo_twitter_description" varchar;
  ALTER TABLE "seo_config_organization_same_as" ADD CONSTRAINT "seo_config_organization_same_as_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seo_config"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seo_config_organization_area_served" ADD CONSTRAINT "seo_config_organization_area_served_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seo_config"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seo_config_organization_service_catalog" ADD CONSTRAINT "seo_config_organization_service_catalog_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seo_config"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "blog_slug_idx" ON "blog" USING btree ("slug");
  CREATE INDEX "blog_updated_at_idx" ON "blog" USING btree ("updated_at");
  CREATE INDEX "blog_created_at_idx" ON "blog" USING btree ("created_at");
  CREATE INDEX "seo_config_organization_same_as_order_idx" ON "seo_config_organization_same_as" USING btree ("_order");
  CREATE INDEX "seo_config_organization_same_as_parent_id_idx" ON "seo_config_organization_same_as" USING btree ("_parent_id");
  CREATE INDEX "seo_config_organization_area_served_order_idx" ON "seo_config_organization_area_served" USING btree ("_order");
  CREATE INDEX "seo_config_organization_area_served_parent_id_idx" ON "seo_config_organization_area_served" USING btree ("_parent_id");
  CREATE INDEX "seo_config_organization_service_catalog_order_idx" ON "seo_config_organization_service_catalog" USING btree ("_order");
  CREATE INDEX "seo_config_organization_service_catalog_parent_id_idx" ON "seo_config_organization_service_catalog" USING btree ("_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_blog_id_idx" ON "payload_locked_documents_rels" USING btree ("blog_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "blog" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "seo_config_organization_same_as" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "seo_config_organization_area_served" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "seo_config_organization_service_catalog" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "seo_config" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blogs_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_page" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "blog" CASCADE;
  DROP TABLE "seo_config_organization_same_as" CASCADE;
  DROP TABLE "seo_config_organization_area_served" CASCADE;
  DROP TABLE "seo_config_organization_service_catalog" CASCADE;
  DROP TABLE "seo_config" CASCADE;
  DROP TABLE "blogs_page" CASCADE;
  DROP TABLE "services_page" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_blog_fk";
  
  DROP INDEX "payload_locked_documents_rels_blog_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "blog_id";
  ALTER TABLE "homepage" DROP COLUMN "seo_title";
  ALTER TABLE "homepage" DROP COLUMN "seo_description";
  ALTER TABLE "homepage" DROP COLUMN "seo_keywords";
  ALTER TABLE "homepage" DROP COLUMN "seo_canonical_path";
  ALTER TABLE "homepage" DROP COLUMN "seo_open_graph_title";
  ALTER TABLE "homepage" DROP COLUMN "seo_open_graph_description";
  ALTER TABLE "homepage" DROP COLUMN "seo_twitter_title";
  ALTER TABLE "homepage" DROP COLUMN "seo_twitter_description";
  ALTER TABLE "projects_page" DROP COLUMN "seo_title";
  ALTER TABLE "projects_page" DROP COLUMN "seo_description";
  ALTER TABLE "projects_page" DROP COLUMN "seo_keywords";
  ALTER TABLE "projects_page" DROP COLUMN "seo_canonical_path";
  ALTER TABLE "projects_page" DROP COLUMN "seo_open_graph_title";
  ALTER TABLE "projects_page" DROP COLUMN "seo_open_graph_description";
  ALTER TABLE "projects_page" DROP COLUMN "seo_twitter_title";
  ALTER TABLE "projects_page" DROP COLUMN "seo_twitter_description";
  ALTER TABLE "about_page" DROP COLUMN "seo_title";
  ALTER TABLE "about_page" DROP COLUMN "seo_description";
  ALTER TABLE "about_page" DROP COLUMN "seo_keywords";
  ALTER TABLE "about_page" DROP COLUMN "seo_canonical_path";
  ALTER TABLE "about_page" DROP COLUMN "seo_open_graph_title";
  ALTER TABLE "about_page" DROP COLUMN "seo_open_graph_description";
  ALTER TABLE "about_page" DROP COLUMN "seo_twitter_title";
  ALTER TABLE "about_page" DROP COLUMN "seo_twitter_description";
  DROP TYPE "public"."enum_blog_status";
  DROP TYPE "public"."enum_seo_config_organization_area_served_type";
  DROP TYPE "public"."enum_seo_config_default_twitter_card";`)
}
