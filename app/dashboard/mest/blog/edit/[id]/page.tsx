import EditPage from "@/components/madeups/dashboard/mest/blog/edit";
import React from "react";
export default async function BlogEditPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    return <EditPage id={params.id} />;
  } catch (error) {
    console.error("Error loading blog data:", error);
    return <div>Error loading blog data.</div>;
  }
}
