/// <reference path="../.astro/types.d.ts" />

type KVNamespace = import('@cloudflare/workers-types').KVNamespace;
type R2Bucket = import('@cloudflare/workers-types').R2Bucket;

type Runtime = import('@astrojs/cloudflare').Runtime<{
  SESSION: KVNamespace;
  ASSETS_BUCKET: R2Bucket;
  KEYSTATIC_GITHUB_CLIENT_ID: string;
  KEYSTATIC_GITHUB_CLIENT_SECRET: string;
  KEYSTATIC_SECRET: string;
  UPLOAD_ALLOWED_USERS?: string;
}>;

declare namespace App {
  interface Locals extends Runtime {}
}
