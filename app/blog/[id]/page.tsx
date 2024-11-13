import BlogPage from "@/components/madeups/home/blogs/blog";
import React from "react";
export default async function Blog({ params }: { params: { id: string } }) {
  return <BlogPage id={params.id} />;
}
