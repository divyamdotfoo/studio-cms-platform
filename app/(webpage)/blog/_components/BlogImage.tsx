import Image from "next/image";

interface BlogImageProps {
  src: string;
  alt: string;
  priority?: boolean;
}

/**
 * Reusable full-bleed blog image with figcaption.
 * Keeps image usage DRY across all .mdx posts.
 */
export function BlogImage({ src, alt, priority = false }: BlogImageProps) {
  return (
    <figure className="my-10 -mx-5 lg:-mx-12">
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={675}
        className="w-full h-auto object-cover"
        priority={priority}
      />
      {alt && (
        <figcaption className="mt-3 px-5 lg:px-12 text-center text-sm text-drift">
          {alt}
        </figcaption>
      )}
    </figure>
  );
}
