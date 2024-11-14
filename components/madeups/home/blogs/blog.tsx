"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";

export type BlogData = {
  id: string;
  keywords: string[];
  createdAt: string;
  description: string;
  content: string;
  title: string;
  thumbnailUrl: string;
  updatedAt: string;
};

type Props = {
  id: string;
};

const BlogPage = (props: Props) => {
  const [blogData, setBlogData] = useState<BlogData | null>(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const queryParam = `id=${props.id}`;
        const response = await fetch(`/api/dashboard/mest/blog?${queryParam}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setBlogData(data); // Assuming the response contains the blog data
      } catch (error) {
        console.error("Failed to fetch blog data:", error);
      }
    };

    fetchBlogData();
  }, [props.id]);

  if (!blogData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{blogData.title}</title>
        <meta name="description" content={blogData.description} />
        <meta property="og:title" content={blogData.title} />
        <meta property="og:description" content={blogData.description} />
        <meta property="og:image" content={blogData.thumbnailUrl} />
        <meta
          property="og:url"
          content={`https://yourwebsite.com/blog/${props.id}`}
        />
        <meta property="og:type" content="article" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Blog Title */}
        <h1 className="text-4xl font-bold text-center">{blogData.title}</h1>

        {/* Blog Thumbnail
        {blogData.thumbnailUrl && (
          <div className="mt-4 text-center">
            <img
              className="rounded-lg shadow-md max-w-full h-auto"
              src={blogData.thumbnailUrl}
              alt={blogData.title}
              style={{ maxHeight: "400px" }}
            />
          </div>
        )} */}

        {/* Blog Description */}
        <p className="mt-1 font-light text-xs text-center">
          {blogData.description}
        </p>

        {/* Blog Content (HTML injected) */}
        <div
          className="mt-8 blog-content tiptap"
          dangerouslySetInnerHTML={{ __html: blogData.content }}
        />

        {/* Keywords (optional, to display below content) */}
        <div className="mt-6 text-sm text-gray-500">
          <strong>Keywords: </strong>
          {blogData.keywords.join(", ")}
        </div>

        {/* Date of Creation */}
        <div className="mt-4 text-sm text-gray-500">
          <strong>Created At: </strong>
          {new Date(blogData.createdAt).toLocaleDateString()}
        </div>

        {/* Date of Update */}
        <div className="mt-1 text-sm text-gray-500">
          <strong>Updated At: </strong>
          {new Date(blogData.updatedAt).toLocaleDateString()}
        </div>
      </div>
    </>
  );
};

export default BlogPage;
