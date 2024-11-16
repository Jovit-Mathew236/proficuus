"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Blog } from "../list";
import { useRouter } from "next/navigation";
type Props = {
  blog: Blog;
  setBlogs: React.Dispatch<React.SetStateAction<Blog[]>>;
};

const ListActions = ({ blog, setBlogs }: Props) => {
  const router = useRouter();
  const handleEdit = () => {
    // Navigate to the edit page for this blog
    router.push(`/dashboard/mest/blog/edit/${blog.id}`);
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this blog?")) {
      try {
        // Send DELETE request to the API to delete the blog
        const response = await fetch(
          `/api/dashboard/mest/blog/delete/${blog.id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete the blog.");
        }

        // Remove the blog from the local list of blogs
        setBlogs((prevBlogs) =>
          prevBlogs.filter((item) => item.id !== blog.id)
        );

        // Optionally show a success message
        alert("Blog deleted successfully");
      } catch (error) {
        alert("Error deleting the blog.");
        console.error(error);
      }
    }
  };

  const handleOpenLink = () => {
    // Open the blog post link in a new tab
    window.open(`https://jymest.com/blog/${blog.id}`, "_blank");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleOpenLink}>
          Open Link in New Tab
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ListActions;
