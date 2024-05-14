import { Textarea } from "@/components/Textarea";
import { getFileByKey, updateFileByKey } from "@/server/storage";

export default async function Page({
  params,
}: {
  params: { fileName: string };
}) {
  const decodedFileName = decodeURIComponent(params.fileName);
  const file = await getFileByKey("不平不満を言わない.md");

  console.log("hohoho");
  const onSave = async (fileName: string, content: string) => {
    "use server";
    await updateFileByKey(fileName, content);
  };

  return (
    <div className="h-screen">
      <p className="mb-4 text-xl">{decodedFileName}</p>
      <Textarea fileName={decodedFileName} content={file} onSave={onSave} />
    </div>
  );
}
