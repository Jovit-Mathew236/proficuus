import BlogPage, { BlogData } from "@/components/madeups/home/blogs/blog";
import React from "react";
import { Metadata } from "next";

// Define `generateMetadata` to dynamically generate metadata
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    // Fetch blog data based on the id, using the environment variable
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(
      `${apiBaseUrl}/api/dashboard/mest/blog?id=${params.id}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const blogData: BlogData = await response.json();

    // Check if blog data exists and return appropriate metadata
    if (blogData) {
      // Join the keywords array into a comma-separated string
      const keywords = blogData.keywords.join(", ");

      return {
        title: blogData.title,
        description: blogData.description,
        keywords: keywords, // Add keywords to metadata
        openGraph: {
          title: blogData.title,
          description: blogData.description,
          images: blogData.thumbnailUrl,
          url: `https://yourdomain.com/blog/${params.id}`,
          type: "article",
        },
      };
    }

    // Return default metadata if blog data is not found
    return {
      title: "Blog not found",
      description: "The requested blog post could not be found.",
    };
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return {
      title: "Blog not found",
      description: "There was an error fetching the blog data.",
    };
  }
}

export default async function Blog({ params }: { params: { id: string } }) {
  try {
    return <BlogPage id={params.id} />;
  } catch (error) {
    console.error("Error loading blog data:", error);
    return <div>Error loading blog data.</div>;
  }
}
