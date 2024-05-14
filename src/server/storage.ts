import {
  GetObjectCommand,
  ListObjectsCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import "server-only";

const client = new S3Client({
  region: "auto",
  endpoint: process.env.CLOUDFLARE_ENDPOINT as string,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.CLOUDFLARE_ACCESS_KEY as string,
  },
});

const bucket = process.env.CLOUDFLARE_BUCKET as string;

export const getFiles = async () => {
  // Bucketの中身を取得
  const { Contents } = await client.send(
    new ListObjectsCommand({
      Bucket: bucket,
    }),
  );

  console.log(Contents);

  return Contents?.map((content) => content.Key);
  /*
  [
    {
      Key: '賢い質問のしかた.md',
      LastModified: 2024-05-14T12:27:06.981Z,
      ETag: '"5c44245aebf353b45693974abc5e8e4c"',
      Size: 4131,
      StorageClass: 'STANDARD',
      Owner: {
        DisplayName: '4c15b2cfe5f1e01c60cee122f1dc9abf',
        ID: '4c15b2cfe5f1e01c60cee122f1dc9abf'
      }
    }
  ]
  */
};

export const getFileByKey = async (key: string) => {
  // Keyの中身を取得
  const { Body } = await client.send(
    new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    }),
  );

  if (!Body) throw new Error("File not found");

  const output = Body?.transformToString();

  return output;
};

export const updateFileByKey = async (key: string, body: string) => {
  console.log(key, body);
  console.log(bucket);
  // Keyの中身を更新
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: body,
  });

  const res = await client.send(command);
  console.log(res);

  return true;
};
