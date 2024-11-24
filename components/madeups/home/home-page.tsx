"use client";
import Iphone15Pro from "@/components/ui/iphone-15-pro";
import { useEffect, useState } from "react";
import BlogCard from "./modules/BlogCard";
import EventsCarousel from "./modules/EventsCarousel";
import Footer from "./modules/Footer";
import { ModeToggle } from "@/components/theme-mode";
import MainEvents from "./modules/mainEvents";
import { ReactLenis } from "lenis/react";
import { Sparkles } from "@/components/ui/sparkles";
import CountdownTimer from "./modules/CountdownTimer";
import { RandomizedTextEffect } from "@/components/ui/text-randomized.tsx";
import { ArrowRight } from "lucide-react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Ripple from "@/components/ui/ripple";
import { Participant } from "../dashboard/proficuus24/participents/participants";
import { CollageWiseChart } from "../dashboard/proficuus24/home/modules/collage-wise-chart";

// Define types for events
interface Event {
  title: string;
  description: string;
  image: string;
}
type Blog = {
  title: string;
  updatedAt: string;
  thumbnailUrl: string;
  description: string;
  link: string;
  id: string;
};

const Home: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const events: Event[] = [
    {
      title: "Proficuus '24 Registration Open",
      description:
        "The Proficuus '24 event is now open for registration. Sign up now to be a part of it!",
      image:
        "https://images.jdmagicbox.com/comp/ernakulam/m4/0484px484.x484.140206113128.a9m4/catalogue/we-create-events-panampilly-nagar-ernakulam-event-management-companies-nsobpzm660.jpg?clr=",
    },
    {
      title: "Footprints: A Journey of Growth",
      description:
        "Join us for Footprints, an event that aims to inspire and encourage students on their spiritual journey.",
      image:
        "https://images.jdmagicbox.com/comp/ernakulam/m4/0484px484.x484.140206113128.a9m4/catalogue/we-create-events-panampilly-nagar-ernakulam-event-management-companies-nsobpzm660.jpg?clr=",
    },
    {
      title: "Discovery & Insight: Knowledge Sharing",
      description:
        "Discover new horizons at the Discovery & Insight event, where we dive deep into new tech trends.",
      image:
        "https://images.jdmagicbox.com/comp/ernakulam/m4/0484px484.x484.140206113128.a9m4/catalogue/we-create-events-panampilly-nagar-ernakulam-event-management-companies-nsobpzm660.jpg?clr=",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [blogsResponse, participantsResponse] = await Promise.all([
          fetch("/api/dashboard/mest/blog/get", { cache: "no-store" }),
          fetch("/api/dashboard/proficuus24/participants", {
            cache: "no-store",
          }),
        ]);

        if (!blogsResponse.ok) {
          throw new Error("Failed to fetch blogs.");
        }
        if (!participantsResponse.ok) {
          throw new Error("Failed to fetch participants.");
        }

        const blogsData = await blogsResponse.json();
        const participantsData = await participantsResponse.json();

        setBlogs(blogsData);
        setParticipants(participantsData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center w-full h-64">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>
  );

  return (
    <>
      {/* Dark mode toggle */}
      <ReactLenis root>
        <section className=" h-auto w-full sticky -top-36">
          <ModeToggle className="right-10 top-10 absolute z-50" />
          <div className="">
            {/* Hero Section */}
            <div className="relative isolate px-6 pt-14 lg:px-8">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
              >
                <div
                  style={{
                    clipPath:
                      "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                  }}
                  className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                />
              </div>

              <div className="flex flex-col-reverse items-center justify-evenly md:flex-row">
                <div className="max-w-2xl pt-4 pb-32 sm:py-48 lg:py-56">
                  <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                    <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                      Announcing Proficuus&apos;24{" "}
                      <a
                        href="https://www.jymest.com/blog/Get_Ready_for_PROFICUUS_'24!_"
                        className="font-semibold text-indigo-600"
                      >
                        <span aria-hidden="true" className="absolute inset-0" />
                        Read more <span aria-hidden="true">&rarr;</span>
                      </a>
                    </div>
                  </div>
                  <div className="text-center sm:text-left">
                    <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-7xl">
                      <RandomizedTextEffect text="About MEST" />
                    </h1>
                    <TextGenerateEffect
                      words={`
                       Jesus Youth Medical Engineering Students Team is a stream team under the Kerala campus ministry that addresses medical engineering campuses. The main programs initiated by the MEST team are Proficuus, Footprints, Discovery, Insight and Catalyst
                      `}
                      duration={1}
                      className="mt-8 text-pretty text-lg font-thin md:font-medium text-gray-500 sm:text-xl/8"
                    />
                    <div className="mt-10 flex flex-wrap justify-center sm:justify-normal items-center gap-x-6">
                      <a href="/proficuus24/register">
                        <div className="group relative cursor-pointer p-2 w-60 border bg-primary rounded-full overflow-hidden text-white text-center font-semibold">
                          <span className="translate-x-1 group-hover:translate-x-12 group-hover:opacity-0 transition-all duration-300 inline-block">
                            Register For Proficuus
                          </span>
                          <div className="flex gap-2 text-white dark:text-black z-10 items-center absolute top-0 h-full w-full justify-center translate-x-12 opacity-0 group-hover:-translate-x-1 group-hover:opacity-100 transition-all duration-300">
                            <span>Register For Proficuus</span>
                            <ArrowRight />
                          </div>
                          <div className="absolute top-[40%] left-[5%] h-2 w-2 group-hover:h-full group-hover:w-full rounded-lg bg-[#263381] dark:bg-white scale-[1] dark:group-hover:bg-[#fff] group-hover:bg-[#263381] group-hover:scale-[1.8] transition-all duration-300 group-hover:top-[0%] group-hover:left-[0%] "></div>
                        </div>
                      </a>

                      <a
                        href="#blogs"
                        className="text-sm font-semibold leading-6 text-secondary-foreground"
                      >
                        Learn more <span aria-hidden="true">→</span>
                      </a>
                    </div>
                  </div>
                </div>

                <Iphone15Pro
                  className="size-1/2 md:size-1/5 z-100"
                  src="/images/proficuus.png"
                />
              </div>
            </div>
          </div>
          <Ripple
            mainCircleOpacity={0.2}
            numCircles={40}
            className="w-screen overflow-hidden  z-0 absolute"
          />
        </section>

        {/* Blog Section */}
        <section
          id="blogs"
          className="bg-gray-100 dark:bg-gray-900 py-20 text-black sticky rounded-tr-2xl rounded-tl-2xl"
        >
          <div className="container mx-auto p-8">
            <h2 className="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-10">
              Our Latest Blog Posts
            </h2>
            <div className="flex flex-wrap justify-center gap-8">
              {/* Show loading spinner if blogs are still being fetched */}
              {loading ? (
                <LoadingSpinner />
              ) : error ? (
                <div className="text-center text-red-500">{error}</div>
              ) : (
                blogs.map((blog) => (
                  <BlogCard
                    key={blog.id}
                    image={blog.thumbnailUrl}
                    date={new Date(blog.updatedAt).toLocaleDateString()}
                    title={blog.title}
                    description={blog.description}
                    link={`/blog/${blog.id}`}
                  />
                ))
              )}
            </div>
          </div>
        </section>

        {/* Events Carousel */}
        <section className="bg-gray-100 dark:bg-gray-800 py-20 h-screen  w-full  grid place-content-center sticky top-0">
          <div className="container mx-auto">
            <h2 className="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-10">
              Upcoming Events
            </h2>
            {/* Pass events prop to the EventsCarousel component */}
            <EventsCarousel events={events} />
          </div>
        </section>

        <section className="bg-gray-100 dark:bg-black w-full sticky">
          <MainEvents />
        </section>

        <section className="bg-gray-900 text-black grid place-content-center h-screen sticky top-0 overflow-hidden">
          <h1 className="text-white text-xl font-semibold m-auto">
            Proficuus&apos;24 is coming soon
          </h1>
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

          <CountdownTimer
            targetDate={new Date("2024-12-19T23:59:59")}
            // labels={["Days", "Hours", "Minutes", "Seconds"]}
          />
          <div className="w-11/12 sm:w-[600px] m-auto z-10">
            <CollageWiseChart participantsData={participants} />
          </div>
          <div className="absolute bottom-0 z-[2] h-[500px] w-screen overflow-hidden [mask-image:radial-gradient(100%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#3273ff,transparent_90%)] before:opacity-40 after:absolute">
            <Sparkles
              density={1800}
              speed={1.2}
              color="#48b6ff"
              direction="top"
              className="absolute inset-x-0 bottom-0 h-full w-full "
            />
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </ReactLenis>
    </>
  );
};

export default Home;
