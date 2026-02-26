import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button/variants";
import { cn } from "@/lib/utils";
import type { ServiceContent, ServiceItemContent } from "@/server/types";

interface ServiceItemPageProps {
  service: ServiceContent;
  serviceItem: ServiceItemContent;
  consultationHref: string;
}

export function ServiceItemPage({
  service,
  serviceItem,
  consultationHref,
}: ServiceItemPageProps) {
  return (
    <main>
      <section
        className="pt-24 lg:pt-28 pb-16 lg:pb-24"
        aria-label={serviceItem.name}
      >
        <div className="mx-auto max-w-[1400px] px-4 sm:px-5 lg:px-10">
          <header className="mb-6 lg:mb-8">
            <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-widest text-drift">
              <Link
                href="/services"
                className="hover:text-ink transition-colors"
              >
                Services
              </Link>
              <span>/</span>
              <Link
                href={`/services/${service.slug}`}
                className="hover:text-ink transition-colors"
              >
                {service.name}
              </Link>
              <span>/</span>
              <span className="text-ink">{serviceItem.name}</span>
            </div>
          </header>

          <div className="lg:grid lg:grid-cols-2 lg:gap-16 xl:gap-24 lg:items-start">
            <div className="bg-ivory shadow-[0_2px_20px_-4px_rgba(26,26,26,0.10)] p-2 sm:p-3 mb-8 lg:mb-0">
              <div className="flex flex-col gap-2 sm:gap-3">
                {serviceItem.imageUrls.map((imageUrl, index) => (
                  <Image
                    key={`${imageUrl}-${index}`}
                    src={imageUrl}
                    alt={`${serviceItem.name} image ${index + 1}`}
                    width={1200}
                    height={900}
                    className="w-full aspect-4/3 object-cover"
                  />
                ))}
              </div>
            </div>

            <div className="lg:sticky lg:top-24 lg:self-start">
              <h1 className="font-serif text-[clamp(1.8rem,8vw,3.4rem)] lg:text-[clamp(2.2rem,5vw,4rem)] leading-none tracking-[-0.02em] text-ink mb-4 sm:mb-5">
                {serviceItem.name}
              </h1>
              <div className="w-12 h-px bg-bronze mb-5 sm:mb-6" />
              <p className="text-[14px] sm:text-[15px] lg:text-base leading-[1.75] sm:leading-[1.8] text-stone mb-6">
                {serviceItem.description}
              </p>
              <Link
                href={consultationHref}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "h-auto px-6 py-3 text-[12px] uppercase tracking-widest mb-8"
                )}
              >
                Book a Consultation
              </Link>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8 mb-8">
                <InfoLine
                  label="Estimated Time"
                  value={serviceItem.estimatedTime}
                />
                <InfoLine
                  label="Estimated Cost"
                  value={serviceItem.estimatedCost ?? "Discuss on consultation"}
                />
                <InfoLine
                  label="Layout"
                  value={
                    serviceItem.componentLayout ?? "Custom to site conditions"
                  }
                />
                <InfoLine
                  label="Dimensions"
                  value={
                    serviceItem.componentDimensions ?? "As per final site plan"
                  }
                />
              </div>

              <section className="mb-8">
                <h2 className="text-[11px] uppercase tracking-widest text-drift mb-3">
                  Special Features
                </h2>
                <ul className="space-y-2.5">
                  {serviceItem.specialFeatures.map((feature) => (
                    <li
                      key={feature.id ?? feature.feature}
                      className="text-[14px] leading-[1.7] text-stone"
                    >
                      - {feature.feature}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-[11px] uppercase tracking-widest text-drift mb-3">
                  Colour Palette
                </h2>
                <ul className="space-y-2.5">
                  {serviceItem.colours.map((colour) => (
                    <li
                      key={`${colour.component}-${colour.colour}`}
                      className="text-[14px] leading-[1.7] text-stone"
                    >
                      <span className="text-ink font-medium">
                        {colour.component}:
                      </span>{" "}
                      {colour.colour}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-[10px] uppercase tracking-widest text-drift">
        {label}
      </span>
      <span className="text-sm text-ink font-medium mt-1">{value}</span>
    </div>
  );
}
