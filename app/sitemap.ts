import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Fetch the list of blogs
  const response = await fetch(`${apiBaseUrl}/api/dashboard/mest/blog/get`);

  if (!response.ok) {
    // Log the error and return an empty or fallback sitemap if the API request fails
    console.error("Error fetching blog data:", response.statusText);
    return [
      {
        url: "https://www.jymest.com",
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
      {
        url: "https://www.jymest.com/proficuus24/register",
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.8,
      },
      {
        url: "https://www.jymest.com/blog/",
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.5,
      },
    ];
  }

  // If the fetch is successful, parse the JSON response
  const blogs = await response.json();

  // Construct static part of the sitemap
  const sitemap: MetadataRoute.Sitemap = [
    {
      url: "https://www.jymest.com",
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://wwww.jymest.com/proficuus24/register",
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://wwww.jymest.com/proficuus24/login",
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://www.jymest.com/blog/",
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 0.5,
    },
  ];

  // Add dynamic blog URLs with image metadata
  const dynamicBlogUrls = blogs.map(
    (blog: { id: string; updatedAt: string; thumbnailUrl: string }) => ({
      url: `https://www.jymest.com/blog/${blog.id}`,
      lastModified: new Date(blog.updatedAt).toISOString(),
      changeFrequency: "daily",
      priority: 0.7,
      image: blog.thumbnailUrl ? [blog.thumbnailUrl] : [], // Add image metadata
    })
  );

  // Combine static and dynamic URLs
  return [...sitemap, ...dynamicBlogUrls];
}
