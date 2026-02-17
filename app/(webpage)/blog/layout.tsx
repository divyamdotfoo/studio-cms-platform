import { ReadMoreBlogs } from "./_components/ReadMoreBlogs";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="pt-28 lg:pt-32 pb-16 lg:pb-24">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        {children}
        <ReadMoreBlogs />
      </div>
    </main>
  );
}
