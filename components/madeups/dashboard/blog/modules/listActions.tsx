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
  payment: Blog;
  setBlogs: React.Dispatch<React.SetStateAction<Blog[]>>;
};

const ListActions = ({ payment, setBlogs }: Props) => {
  const router = useRouter();
  const handleEdit = () => {
    // Navigate to the edit page for this blog
    router.push(`/dashboard/mest/blog/edit/${payment.id}`);
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this blog?")) {
      try {
        const response = await fetch(
          `/api/dashboard/mest/blog/delete/${payment.id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete the blog.");
        }

        // Refresh the list after deletion
        setBlogs((prevBlogs) =>
          prevBlogs.filter((blog) => blog.id !== payment.id)
        );
      } catch (error) {
        alert("Error deleting the blog.");
        console.error(error);
      }
    }
  };

  const handleOpenLink = () => {
    // Open the blog post link in a new tab
    window.open(`https://jymest.com/blog/${payment.id}`, "_blank");
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
