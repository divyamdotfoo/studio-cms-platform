import Link from "next/link";
import Image from "next/image";
import type { ServiceContent } from "@/server/types";

interface ServicePageProps {
  service: ServiceContent;
}

export function ServicePage({ service }: ServicePageProps) {
  return (
    <main>
      <section
        className="pt-24 lg:pt-28 pb-16 lg:pb-24"
        aria-label={service.name}
      >
        <div className="mx-auto max-w-[1400px] px-4 sm:px-5 lg:px-10">
          <header className="mb-10 lg:mb-14">
            <Link
              href="/services"
              className="text-[12px] uppercase tracking-widest text-drift hover:text-ink transition-colors"
            >
              Services
            </Link>

            <h1 className="mt-4 font-serif text-[clamp(1.8rem,8vw,3.6rem)] lg:text-[clamp(2.4rem,5vw,4.2rem)] leading-none tracking-[-0.02em] text-ink mb-5 sm:mb-6">
              <span className="block">{service.name}</span>
              <span className="block">
                <em className="font-serif italic text-bronze">
                  service options
                </em>
              </span>
            </h1>
            <div className="w-12 h-px bg-bronze mb-5 sm:mb-6" />
            <p className="text-[14px] sm:text-[15px] lg:text-base leading-[1.75] sm:leading-[1.8] text-stone max-w-[620px]">
              {service.description}
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {service.serviceItems.map((item) => (
              <Link
                key={item.id}
                href={`/services/${service.slug}/${item.slug}`}
                className="group bg-ivory shadow-[0_2px_20px_-4px_rgba(26,26,26,0.10)] hover:shadow-[0_8px_30px_-8px_rgba(26,26,26,0.18)] transition-shadow flex flex-col gap-4"
              >
                <div className="h-58 sm:h-60 lg:h-64 shrink-0 overflow-hidden">
                  <Image
                    src={item.imageUrls[0] ?? "/images/service-placeholder.svg"}
                    alt={item.name}
                    width={1200}
                    height={900}
                    className="h-full w-full object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                <div className="p-4 sm:p-5 flex flex-col h-full">
                  <h2 className="font-serif text-[1.2rem] leading-[1.2] text-ink mb-2">
                    {item.name}
                  </h2>
                  <p className="text-sm leading-[1.6] text-stone mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  <p className="text-xs uppercase tracking-widest text-drift mb-4">
                    Estimated Time: {item.estimatedTime}
                  </p>

                  <div className="mt-auto inline-flex items-center gap-3 text-[11px] uppercase tracking-widest text-ink">
                    <span className="inline-block w-8 h-px bg-ink" />
                    View details
                    <span
                      aria-hidden
                      className="text-drift group-hover:text-ink font-bold group-hover:scale-150 transition-all"
                    >
                      ↗
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
