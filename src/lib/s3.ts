import { S3Client, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";

export type AssetType = "design" | "video" | "web";

export interface ProjectAsset {
  key: string;
  url: string;
  type: AssetType;
  filename: string;
  ext: string;
}

export interface ProjectMeta {
  featuredVideo?: string;
}

export interface S3ProjectData {
  assets: ProjectAsset[];
  meta: ProjectMeta;
}

const IMAGE_EXTS = new Set(["jpg", "jpeg", "png", "webp", "avif"]);
const VIDEO_EXTS = new Set(["mp4", "mov", "webm"]);

function buildClient(): S3Client {
  return new S3Client({
    region: process.env.S3_REGION!,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID!,
      secretAccessKey: process.env.S3_SECRET_KEY!,
    },
  });
}

function parseType(key: string): AssetType | null {
  if (key.includes("/designs/")) return "design";
  if (key.includes("/videos/")) return "video";
  if (key.includes("/web/")) return "web";
  return null;
}

function parseExt(key: string): string {
  return key.split(".").pop()?.toLowerCase() ?? "";
}

function isAccepted(ext: string): boolean {
  return IMAGE_EXTS.has(ext) || VIDEO_EXTS.has(ext);
}

function basename(key: string): string {
  const name = key.split("/").pop() ?? key;
  const dot = name.lastIndexOf(".");
  return dot > 0 ? name.slice(0, dot) : name;
}

export async function getProjectAssets(slug: string): Promise<S3ProjectData> {
  try {
    const client = buildClient();
    const bucket = process.env.S3_BUCKET!;
    const cdnBase = process.env.CLOUDFRONT_URL!;
    const prefix = `projects/${slug}/`;

    const listRes = await client.send(
      new ListObjectsV2Command({ Bucket: bucket, Prefix: prefix }),
    );

    const assets: ProjectAsset[] = [];
    for (const obj of listRes.Contents ?? []) {
      const key = obj.Key!;
      const ext = parseExt(key);
      if (!isAccepted(ext)) continue;
      const type = parseType(key);
      if (!type) continue;
      assets.push({
        key,
        url: `${cdnBase}/${key}`,
        type,
        filename: basename(key),
        ext,
      });
    }

    let meta: ProjectMeta = {};
    const metaKey = `${prefix}meta.json`;
    try {
      const metaRes = await client.send(
        new GetObjectCommand({ Bucket: bucket, Key: metaKey }),
      );
      const body = await metaRes.Body?.transformToString("utf-8");
      if (body) meta = JSON.parse(body) as ProjectMeta;
    } catch {
      // meta.json is optional — ignore missing or parse errors
    }

    return { assets, meta };
  } catch {
    return { assets: [], meta: {} };
  }
}
