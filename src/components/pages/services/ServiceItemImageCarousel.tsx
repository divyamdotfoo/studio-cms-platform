"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface ServiceItemImageCarouselProps {
  imageUrls: string[];
  serviceItemName: string;
}

export function ServiceItemImageCarousel({
  imageUrls,
  serviceItemName,
}: ServiceItemImageCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!api) return;

    const updateActiveIndex = () => setActiveIndex(api.selectedScrollSnap());
    updateActiveIndex();
    api.on("select", updateActiveIndex);
    api.on("reInit", updateActiveIndex);

    return () => {
      api.off("select", updateActiveIndex);
      api.off("reInit", updateActiveIndex);
    };
  }, [api]);

  return (
    <div className="bg-ivory shadow-[0_2px_20px_-4px_rgba(26,26,26,0.10)] p-2 sm:p-3 mb-8 lg:mb-0">
      <Carousel
        setApi={setApi}
        opts={{ align: "start" }}
        aria-label="Service images"
      >
        <CarouselContent className="ml-0">
          {imageUrls.map((imageUrl, index) => (
            <CarouselItem key={`${imageUrl}-${index}`} className="pl-0">
              <Image
                src={imageUrl}
                alt={`${serviceItemName} image ${index + 1}`}
                width={1200}
                height={900}
                className="w-full aspect-4/3 object-cover"
                unoptimized
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {imageUrls.length > 1 && (
        <div className="mt-3 flex items-center justify-center gap-2">
          {imageUrls.map((_, dotIndex) => {
            const isActive = activeIndex === dotIndex;
            return (
              <button
                key={dotIndex}
                type="button"
                onClick={() => api?.scrollTo(dotIndex)}
                aria-label={`Go to image ${dotIndex + 1}`}
                aria-current={isActive}
                className={cn(
                  "h-2 w-2 rounded-full transition-all",
                  isActive ? "bg-bronze scale-110" : "bg-sand/70"
                )}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
