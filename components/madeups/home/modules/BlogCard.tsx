import React from "react";
import Image from "next/image";
import { ChevronRight, ChevronsRight } from "lucide-react";

// Define the types for the props
interface BlogCardProps {
  image: string;
  date: string;
  title: string;
  link: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ image, date, title, link }) => {
  return (
    <div className="w-full sm:w-80 md:w-96 relative mt-4 group mx-auto dark:bg-black bg-white dark:border-0 border overflow-hidden rounded-md dark:text-white text-black">
      <figure className="w-full h-56 sm:h-64 md:h-72 rounded-md overflow-hidden">
        <Image
          src={image}
          alt="blog post image"
          width={600}
          height={400}
          className="h-full w-full scale-105 group-hover:scale-100 rounded-lg object-cover transition-all duration-300"
        />
      </figure>
      <div className="p-4 space-y-1 transition-all duration-300">
        <span className="text-sm">{date}</span>
        <h1 className="text-lg font-medium capitalize">{title}</h1>
        <a
          href={link}
          className="bg-green-400 w-fit text-base dark:text-white rounded-md  font-normal p-2 flex justify-center"
        >
          Read Story
          <span className="relative">
            <ChevronRight className="group-hover:opacity-0 opacity-100 translate-y-0 group-hover:translate-y-2 transition-all duration-300" />
            <ChevronsRight className="absolute top-0 group-hover:opacity-100 opacity-0 translate-y-2 group-hover:translate-y-0 transition-all duration-300" />
          </span>
        </a>
      </div>
    </div>
  );
};

export default BlogCard;
