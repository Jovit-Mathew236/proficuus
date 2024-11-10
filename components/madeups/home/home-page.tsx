"use client";
// pages/index.tsx
import Iphone15Pro from "@/components/ui/iphone-15-pro";
import { useState } from "react";
import BlogCard from "./modules/BlogCard";
import EventsCarousel from "./modules/EventsCarousel";
import Footer from "./modules/Footer";
import { ModeToggle } from "@/components/theme-mode";
import MainEvents from "./modules/mainEvents";
import { ReactLenis } from "lenis/react";
// Define types for events
interface Event {
  title: string;
  description: string;
  image: string;
}

const Home: React.FC = () => {
  const [events] = useState<Event[]>([
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
  ]);

  return (
    <>
      {/* Dark mode toggle */}
      <ReactLenis root>
        <main>
          <article>
            <section className="  h-screen  w-full sticky top-0">
              <ModeToggle className="right-10 top-10 absolute z-50" />{" "}
              <div className="dark:bg-black">
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
                    <div className="max-w-2xl py-32 sm:py-48 lg:py-56">
                      <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                        <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                          Announcing Proficuus&apos;24{" "}
                          <a href="#" className="font-semibold text-indigo-600">
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            Read more <span aria-hidden="true">&rarr;</span>
                          </a>
                        </div>
                      </div>
                      <div className="text-left">
                        <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-7xl">
                          About MEST Team
                        </h1>
                        <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                          Jesus Youth Medical Engineering Students Team is a
                          stream team under the Kerala campus ministry that
                          addresses medical engineering campuses. The main
                          programs initiated by the MEST team are Proficuus,
                          Footprints, Discovery, Insight and Catalyst
                        </p>
                        <div className="mt-10 flex items-center gap-x-6">
                          <a
                            href="/proficuus24/register"
                            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Register For Proficuus{" "}
                          </a>
                          <a
                            href="#"
                            className="text-sm font-semibold leading-6 text-gray-900"
                          >
                            Learn more <span aria-hidden="true">→</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* iPhone 15 Pro mockup */}
                    <Iphone15Pro
                      className="size-1/2 md:size-1/5"
                      src="/images/proficuus.png"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Blog Section */}
            <section className="bg-gray-100 dark:bg-gray-900 py-20 text-black h-screen sticky top-0 rounded-tr-2xl rounded-tl-2xl overflow-hidden ">
              <div className="container mx-auto">
                <h2 className="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-10">
                  Our Latest Blog Posts
                </h2>
                <div className="flex flex-wrap justify-center gap-8">
                  {/* Example Blog Cards */}
                  <BlogCard
                    image="https://images.unsplash.com/photo-1565759732117-a48f0bedbbfd?q=80&w=1000&auto=format&fit=crop"
                    date="9 Dec 2023"
                    title="Learn why UI/UX is Important and How to Implement it Well in Your Site"
                    link="/blog/learn-ui-ux"
                  />
                  <BlogCard
                    image="https://images.unsplash.com/photo-1565759732117-a48f0bedbbfd?q=80&w=1000&auto=format&fit=crop"
                    date="10 Dec 2023"
                    title="The Best Practices for Responsive Web Design"
                    link="/blog/responsive-web-design"
                  />
                  <BlogCard
                    image="https://images.unsplash.com/photo-1565759732117-a48f0bedbbfd?q=80&w=1000&auto=format&fit=crop"
                    date="10 Dec 2023"
                    title="The Best Practices for Responsive Web Design"
                    link="/blog/responsive-web-design"
                  />
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

            <section className="bg-gray-100 dark:bg-black w-full sticky top-0">
              <MainEvents />
            </section>

            {/* Footer */}
          </article>
          <Footer />
        </main>
      </ReactLenis>
    </>
  );
};

export default Home;
