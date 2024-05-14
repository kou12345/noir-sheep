import { getFiles } from "@/server/storage";
import Link from "next/link";

export const FileNames = async () => {
  const fileNames = await getFiles();
  if (!fileNames) {
    return <div>ファイルがありません</div>;
  }

  return (
    <ul>
      {fileNames?.map((fileName, i) => (
        <li key={i}>
          <Link href={`/${encodeURIComponent(fileName || "")}`}>
            {fileName}
          </Link>
        </li>
      ))}
    </ul>
  );
};
