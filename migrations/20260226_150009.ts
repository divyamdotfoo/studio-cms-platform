import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_project_type" AS ENUM('residential', 'shops-showrooms', 'offices', 'restaurants');
  CREATE TABLE "admin_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "admin" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "faq" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar
  );
  
  CREATE TABLE "micro_offerings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "project_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar NOT NULL
  );
  
  CREATE TABLE "project" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"area" varchar NOT NULL,
  	"timeline" varchar NOT NULL,
  	"type" "enum_project_type" NOT NULL,
  	"location" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "project_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "reviews" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"content" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "reviews_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "service" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "service_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"service_item_id" integer
  );
  
  CREATE TABLE "service_item_special_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar NOT NULL
  );
  
  CREATE TABLE "service_item_colours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"colour" varchar NOT NULL,
  	"component" varchar NOT NULL
  );
  
  CREATE TABLE "service_item" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"component_layout" varchar,
  	"component_dimensions" varchar,
  	"estimated_time" varchar NOT NULL,
  	"estimated_cost" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "service_item_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"admin_id" integer,
  	"faq_id" integer,
  	"media_id" integer,
  	"micro_offerings_id" integer,
  	"project_id" integer,
  	"reviews_id" integer,
  	"service_id" integer,
  	"service_item_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"admin_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "meta" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"phone" varchar NOT NULL,
  	"whatsapp" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"insta" varchar NOT NULL,
  	"youtube" varchar NOT NULL,
  	"tagline_footer" varchar NOT NULL,
  	"insta_followers" varchar NOT NULL,
  	"youtube_subscribers" varchar NOT NULL,
  	"owner_name" varchar NOT NULL,
  	"owner_role" varchar NOT NULL,
  	"year_of_establishment" numeric NOT NULL,
  	"headquarters_location" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "homepage_services_section_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"stat" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_services_section_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"service_heading" varchar,
  	"service_description" varchar
  );
  
  CREATE TABLE "homepage" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_headline_part_one" varchar NOT NULL,
  	"hero_headline_part_two" varchar NOT NULL,
  	"hero_description" varchar NOT NULL,
  	"featured_projects_section_label" varchar NOT NULL,
  	"featured_projects_section_headline_part_one" varchar NOT NULL,
  	"featured_projects_section_headline_part_two" varchar NOT NULL,
  	"services_section_label" varchar NOT NULL,
  	"services_section_headline_part_one" varchar NOT NULL,
  	"services_section_headline_part_two" varchar NOT NULL,
  	"services_section_description" varchar NOT NULL,
  	"reviews_section_label" varchar NOT NULL,
  	"reviews_section_headline_part_one" varchar,
  	"reviews_section_headline_part_two" varchar,
  	"faq_section_label" varchar NOT NULL,
  	"faq_section_headline_part_one" varchar NOT NULL,
  	"faq_section_headline_part_two" varchar NOT NULL,
  	"faq_section_description" varchar NOT NULL,
  	"social_section_label" varchar NOT NULL,
  	"social_section_headline_part_one" varchar,
  	"social_section_headline_part_two" varchar,
  	"social_section_description" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "homepage_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"project_id" integer,
  	"micro_offerings_id" integer,
  	"reviews_id" integer,
  	"faq_id" integer
  );
  
  CREATE TABLE "projects_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_headline_part_one" varchar NOT NULL,
  	"hero_headline_part_two" varchar NOT NULL,
  	"hero_description" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "projects_page_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"project_id" integer
  );
  
  CREATE TABLE "about_page_section_two_description" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"journey_item" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_approach_section_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"approach_item_title" varchar NOT NULL,
  	"approach_item_description" varchar NOT NULL
  );
  
  CREATE TABLE "about_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_label" varchar NOT NULL,
  	"hero_headline_part_one" varchar NOT NULL,
  	"hero_headline_part_two" varchar,
  	"hero_description" varchar NOT NULL,
  	"section_two_label" varchar NOT NULL,
  	"section_two_headline" varchar NOT NULL,
  	"section_three_label" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "admin_sessions" ADD CONSTRAINT "admin_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."admin"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "project_features" ADD CONSTRAINT "project_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "project_rels" ADD CONSTRAINT "project_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "project_rels" ADD CONSTRAINT "project_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reviews_rels" ADD CONSTRAINT "reviews_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reviews_rels" ADD CONSTRAINT "reviews_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_rels" ADD CONSTRAINT "service_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."service"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_rels" ADD CONSTRAINT "service_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_rels" ADD CONSTRAINT "service_rels_service_item_fk" FOREIGN KEY ("service_item_id") REFERENCES "public"."service_item"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_item_special_features" ADD CONSTRAINT "service_item_special_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_item"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_item_colours" ADD CONSTRAINT "service_item_colours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_item"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_item_rels" ADD CONSTRAINT "service_item_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."service_item"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_item_rels" ADD CONSTRAINT "service_item_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_admin_fk" FOREIGN KEY ("admin_id") REFERENCES "public"."admin"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faq_fk" FOREIGN KEY ("faq_id") REFERENCES "public"."faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_micro_offerings_fk" FOREIGN KEY ("micro_offerings_id") REFERENCES "public"."micro_offerings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_project_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_reviews_fk" FOREIGN KEY ("reviews_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_service_fk" FOREIGN KEY ("service_id") REFERENCES "public"."service"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_service_item_fk" FOREIGN KEY ("service_item_id") REFERENCES "public"."service_item"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_admin_fk" FOREIGN KEY ("admin_id") REFERENCES "public"."admin"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_services_section_stats" ADD CONSTRAINT "homepage_services_section_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_services_section_list" ADD CONSTRAINT "homepage_services_section_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_project_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_micro_offerings_fk" FOREIGN KEY ("micro_offerings_id") REFERENCES "public"."micro_offerings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_reviews_fk" FOREIGN KEY ("reviews_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_faq_fk" FOREIGN KEY ("faq_id") REFERENCES "public"."faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_page_rels" ADD CONSTRAINT "projects_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_page_rels" ADD CONSTRAINT "projects_page_rels_project_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_section_two_description" ADD CONSTRAINT "about_page_section_two_description_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_approach_section_items" ADD CONSTRAINT "about_page_approach_section_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "admin_sessions_order_idx" ON "admin_sessions" USING btree ("_order");
  CREATE INDEX "admin_sessions_parent_id_idx" ON "admin_sessions" USING btree ("_parent_id");
  CREATE INDEX "admin_updated_at_idx" ON "admin" USING btree ("updated_at");
  CREATE INDEX "admin_created_at_idx" ON "admin" USING btree ("created_at");
  CREATE UNIQUE INDEX "admin_email_idx" ON "admin" USING btree ("email");
  CREATE INDEX "faq_updated_at_idx" ON "faq" USING btree ("updated_at");
  CREATE INDEX "faq_created_at_idx" ON "faq" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "micro_offerings_updated_at_idx" ON "micro_offerings" USING btree ("updated_at");
  CREATE INDEX "micro_offerings_created_at_idx" ON "micro_offerings" USING btree ("created_at");
  CREATE INDEX "project_features_order_idx" ON "project_features" USING btree ("_order");
  CREATE INDEX "project_features_parent_id_idx" ON "project_features" USING btree ("_parent_id");
  CREATE INDEX "project_updated_at_idx" ON "project" USING btree ("updated_at");
  CREATE INDEX "project_created_at_idx" ON "project" USING btree ("created_at");
  CREATE INDEX "project_rels_order_idx" ON "project_rels" USING btree ("order");
  CREATE INDEX "project_rels_parent_idx" ON "project_rels" USING btree ("parent_id");
  CREATE INDEX "project_rels_path_idx" ON "project_rels" USING btree ("path");
  CREATE INDEX "project_rels_media_id_idx" ON "project_rels" USING btree ("media_id");
  CREATE INDEX "reviews_updated_at_idx" ON "reviews" USING btree ("updated_at");
  CREATE INDEX "reviews_created_at_idx" ON "reviews" USING btree ("created_at");
  CREATE INDEX "reviews_rels_order_idx" ON "reviews_rels" USING btree ("order");
  CREATE INDEX "reviews_rels_parent_idx" ON "reviews_rels" USING btree ("parent_id");
  CREATE INDEX "reviews_rels_path_idx" ON "reviews_rels" USING btree ("path");
  CREATE INDEX "reviews_rels_media_id_idx" ON "reviews_rels" USING btree ("media_id");
  CREATE UNIQUE INDEX "service_slug_idx" ON "service" USING btree ("slug");
  CREATE INDEX "service_updated_at_idx" ON "service" USING btree ("updated_at");
  CREATE INDEX "service_created_at_idx" ON "service" USING btree ("created_at");
  CREATE INDEX "service_rels_order_idx" ON "service_rels" USING btree ("order");
  CREATE INDEX "service_rels_parent_idx" ON "service_rels" USING btree ("parent_id");
  CREATE INDEX "service_rels_path_idx" ON "service_rels" USING btree ("path");
  CREATE INDEX "service_rels_media_id_idx" ON "service_rels" USING btree ("media_id");
  CREATE INDEX "service_rels_service_item_id_idx" ON "service_rels" USING btree ("service_item_id");
  CREATE INDEX "service_item_special_features_order_idx" ON "service_item_special_features" USING btree ("_order");
  CREATE INDEX "service_item_special_features_parent_id_idx" ON "service_item_special_features" USING btree ("_parent_id");
  CREATE INDEX "service_item_colours_order_idx" ON "service_item_colours" USING btree ("_order");
  CREATE INDEX "service_item_colours_parent_id_idx" ON "service_item_colours" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "service_item_slug_idx" ON "service_item" USING btree ("slug");
  CREATE INDEX "service_item_updated_at_idx" ON "service_item" USING btree ("updated_at");
  CREATE INDEX "service_item_created_at_idx" ON "service_item" USING btree ("created_at");
  CREATE INDEX "service_item_rels_order_idx" ON "service_item_rels" USING btree ("order");
  CREATE INDEX "service_item_rels_parent_idx" ON "service_item_rels" USING btree ("parent_id");
  CREATE INDEX "service_item_rels_path_idx" ON "service_item_rels" USING btree ("path");
  CREATE INDEX "service_item_rels_media_id_idx" ON "service_item_rels" USING btree ("media_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_admin_id_idx" ON "payload_locked_documents_rels" USING btree ("admin_id");
  CREATE INDEX "payload_locked_documents_rels_faq_id_idx" ON "payload_locked_documents_rels" USING btree ("faq_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_micro_offerings_id_idx" ON "payload_locked_documents_rels" USING btree ("micro_offerings_id");
  CREATE INDEX "payload_locked_documents_rels_project_id_idx" ON "payload_locked_documents_rels" USING btree ("project_id");
  CREATE INDEX "payload_locked_documents_rels_reviews_id_idx" ON "payload_locked_documents_rels" USING btree ("reviews_id");
  CREATE INDEX "payload_locked_documents_rels_service_id_idx" ON "payload_locked_documents_rels" USING btree ("service_id");
  CREATE INDEX "payload_locked_documents_rels_service_item_id_idx" ON "payload_locked_documents_rels" USING btree ("service_item_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_admin_id_idx" ON "payload_preferences_rels" USING btree ("admin_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "homepage_services_section_stats_order_idx" ON "homepage_services_section_stats" USING btree ("_order");
  CREATE INDEX "homepage_services_section_stats_parent_id_idx" ON "homepage_services_section_stats" USING btree ("_parent_id");
  CREATE INDEX "homepage_services_section_list_order_idx" ON "homepage_services_section_list" USING btree ("_order");
  CREATE INDEX "homepage_services_section_list_parent_id_idx" ON "homepage_services_section_list" USING btree ("_parent_id");
  CREATE INDEX "homepage_rels_order_idx" ON "homepage_rels" USING btree ("order");
  CREATE INDEX "homepage_rels_parent_idx" ON "homepage_rels" USING btree ("parent_id");
  CREATE INDEX "homepage_rels_path_idx" ON "homepage_rels" USING btree ("path");
  CREATE INDEX "homepage_rels_project_id_idx" ON "homepage_rels" USING btree ("project_id");
  CREATE INDEX "homepage_rels_micro_offerings_id_idx" ON "homepage_rels" USING btree ("micro_offerings_id");
  CREATE INDEX "homepage_rels_reviews_id_idx" ON "homepage_rels" USING btree ("reviews_id");
  CREATE INDEX "homepage_rels_faq_id_idx" ON "homepage_rels" USING btree ("faq_id");
  CREATE INDEX "projects_page_rels_order_idx" ON "projects_page_rels" USING btree ("order");
  CREATE INDEX "projects_page_rels_parent_idx" ON "projects_page_rels" USING btree ("parent_id");
  CREATE INDEX "projects_page_rels_path_idx" ON "projects_page_rels" USING btree ("path");
  CREATE INDEX "projects_page_rels_project_id_idx" ON "projects_page_rels" USING btree ("project_id");
  CREATE INDEX "about_page_section_two_description_order_idx" ON "about_page_section_two_description" USING btree ("_order");
  CREATE INDEX "about_page_section_two_description_parent_id_idx" ON "about_page_section_two_description" USING btree ("_parent_id");
  CREATE INDEX "about_page_approach_section_items_order_idx" ON "about_page_approach_section_items" USING btree ("_order");
  CREATE INDEX "about_page_approach_section_items_parent_id_idx" ON "about_page_approach_section_items" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "admin_sessions" CASCADE;
  DROP TABLE "admin" CASCADE;
  DROP TABLE "faq" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "micro_offerings" CASCADE;
  DROP TABLE "project_features" CASCADE;
  DROP TABLE "project" CASCADE;
  DROP TABLE "project_rels" CASCADE;
  DROP TABLE "reviews" CASCADE;
  DROP TABLE "reviews_rels" CASCADE;
  DROP TABLE "service" CASCADE;
  DROP TABLE "service_rels" CASCADE;
  DROP TABLE "service_item_special_features" CASCADE;
  DROP TABLE "service_item_colours" CASCADE;
  DROP TABLE "service_item" CASCADE;
  DROP TABLE "service_item_rels" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "meta" CASCADE;
  DROP TABLE "homepage_services_section_stats" CASCADE;
  DROP TABLE "homepage_services_section_list" CASCADE;
  DROP TABLE "homepage" CASCADE;
  DROP TABLE "homepage_rels" CASCADE;
  DROP TABLE "projects_page" CASCADE;
  DROP TABLE "projects_page_rels" CASCADE;
  DROP TABLE "about_page_section_two_description" CASCADE;
  DROP TABLE "about_page_approach_section_items" CASCADE;
  DROP TABLE "about_page" CASCADE;
  DROP TYPE "public"."enum_project_type";`)
}
