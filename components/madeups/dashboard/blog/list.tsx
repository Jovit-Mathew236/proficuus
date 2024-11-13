"use client";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const BlogList = () => {
  const router = useRouter();
  return (
    <div>
      <Button onClick={() => router.push("/dashboard/mest/blog/create")}>
        <PlusCircle />
        Create New blog
      </Button>
      <div className="mt-10">here is list of blogs</div>
    </div>
  );
};

export default BlogList;
