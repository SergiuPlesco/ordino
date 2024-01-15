import { auth } from "@/auth";

const Page = async () => {
  const data = await auth();
  return (
    <div className="flex flex-col items-center gap-2 mt-[150px]">
      <h1>Middleware Page</h1>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </div>
  );
};

export default Page;
