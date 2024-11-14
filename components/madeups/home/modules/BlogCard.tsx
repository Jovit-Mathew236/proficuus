import React from "react";
import Image from "next/image";
import { ChevronRight, ChevronsRight } from "lucide-react";
import {
  BlurVignette,
  BlurVignetteArticle,
} from "@/components/ui/blur-vignette";

// Define the types for the props
interface BlogCardProps {
  image: string;
  date: string;
  title: string;
  description: string;
  link: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  image,
  date,
  title,
  description,
  link,
}) => {
  return (
    <div className="w-full sm:w-80 md:w-96 h-[400px] relative mt-4 group mx-auto dark:bg-black bg-white dark:border-0 border overflow-hidden rounded-xl dark:text-white text-black shadow-lg">
      {/* Blur vignette background effect */}
      <BlurVignette
        radius="0.75rem"
        inset="100px"
        transitionLength="200px"
        blur="15px"
        classname="relative w-full h-full"
      >
        {/* Image with 1:1 aspect ratio */}
        <div className="h-2/3 w-full relative">
          <Image
            src={image}
            alt="blog post image"
            width={600}
            height={600}
            className="object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Blog Metadata & Content */}
        <BlurVignetteArticle classname="h-fit w-full  mt-auto border border-gray-900/20 rounded-xl text-white bg-black/50">
          <article className="py-4 px-3">
            <span className="text-sm text-muted-foreground">{date}</span>
            <h1 className="text-lg font-medium capitalize">{title}</h1>
            <p className="text-sm">{description}</p>

            {/* Read Story button */}
            <a
              href={link}
              className="bg-green-400 text-base dark:text-white rounded-md font-normal p-2 flex justify-center mt-2"
            >
              Read blog
              <span className="relative">
                <ChevronRight className="group-hover:opacity-0 opacity-100 translate-y-0 group-hover:translate-y-2 transition-all duration-300" />
                <ChevronsRight className="absolute top-0 group-hover:opacity-100 opacity-0 translate-y-2 group-hover:translate-y-0 transition-all duration-300" />
              </span>
            </a>
          </article>
        </BlurVignetteArticle>
      </BlurVignette>
    </div>
  );
};

export default BlogCard;
