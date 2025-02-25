import { trpc } from "@/trpc";

export function Dashboard() {
  const { data, isLoading } = trpc.Hello.useQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex-1 p-8 overflow-auto">
      <h1 className="text-3xl font-bold mb-6">{data}</h1>
    </div>
  );
}
