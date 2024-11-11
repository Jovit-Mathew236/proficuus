import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import Carousel, {
  Slider,
  SliderContainer,
  SliderDotButton,
} from "@/components/ui/carousel";
import Image from "next/image";

interface Event {
  title: string;
  description: string;
  image: string;
}

interface EventsCarouselProps {
  events: Event[];
}

const EventsCarousel: React.FC<EventsCarouselProps> = ({ events }) => {
  // Valid Embla options (autoplay will be handled inside Carousel component)
  const OPTIONS: EmblaOptionsType = { loop: true };

  return (
    <div>
      {/* <h2 className="text-center text-4xl font-semibold pb-4">
        Upcoming Events
      </h2> */}
      <Carousel options={OPTIONS} isAutoPlay={true} className="w-4/5 mx-auto">
        <SliderContainer className="gap-2">
          {events.map((event, index) => (
            <Slider key={index} className="w-full">
              <div className="dark:bg-black bg-white h-[400px] w-full">
                <Image
                  src={event.image}
                  width={1400}
                  height={800}
                  alt={event.title}
                  className="h-full object-cover rounded-lg w-full"
                />
                <div className="absolute w-full bg-slate-50/10 backdrop-blur-md bottom-0 bg-black bg-opacity-50 text-white p-4">
                  <h3 className="text-xl font-bold">{event.title}</h3>
                  <p className="text-sm">{event.description}</p>
                </div>
              </div>
            </Slider>
          ))}
        </SliderContainer>
        <div className="flex justify-center py-4">
          <SliderDotButton />
        </div>
      </Carousel>
    </div>
  );
};

export default EventsCarousel;
