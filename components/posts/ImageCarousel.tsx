import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";

interface Props {
  media: string[];
}

export function ImageCarousel({ media }: Props) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="flex flex-col gap-2 mx-auto w-full">
      <Carousel setApi={setApi} className="w-full h-full">
        <CarouselContent>
          {media.map((image, index) => (
            <CarouselItem key={index} className="w-full h-full">
              <Image
                src={image}
                alt="Post Media"
                width={128}
                height={128}
                className="rounded-md w-full h-full object-center"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="text-muted-foreground text-sm text-center">
        Slide {current} of {count}
      </div>
    </div>
  );
}
