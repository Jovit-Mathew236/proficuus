"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
// import { Blog } from "./list";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ListActions from "./modules/listActions";
import { useSidebar } from "@/components/ui/sidebar";
// import ListActions from "@/components/ListActions";  // Import ListActions here
export type Blog = {
  title: string;
  updatedAt: string;
  thumbnailUrl: string;
  description: string;
  keywords: string[];
  id: string;
};
const BlogList = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const router = useRouter();
  const { state } = useSidebar();
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/dashboard/mest/blog/get", {
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch blogs.");
        }
        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      <Button onClick={() => router.push("/dashboard/mest/blog/create")}>
        <PlusCircle />
        Create New Blog
      </Button>

      <div className="w-full mt-4">
        <div
          className={`rounded-md h-full overflow-scroll border max-w-[90vw] sm:[95vw] ${
            state === "expanded"
              ? "lg:max-w-[calc(100vw-19rem)]"
              : "lg:max-w-[calc(100vw)]"
          } `}
        >
          {" "}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Keywords</TableHead>
                <TableHead>Link</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogs.length > 0 ? (
                blogs.map((blog) => (
                  <TableRow key={blog.id}>
                    <TableCell>{blog.title}</TableCell>
                    <TableCell>{blog.description}</TableCell>
                    <TableCell>{blog.keywords.join(", ")}</TableCell>
                    <TableCell>
                      <a
                        href={`https://jymest.com/blog/${blog.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    </TableCell>
                    <TableCell>
                      {new Date(blog.updatedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <ListActions blog={blog} setBlogs={setBlogs} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
