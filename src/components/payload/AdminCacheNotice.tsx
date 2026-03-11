export default function AdminCacheNotice() {
  return (
    <section
      className="mb-4 rounded-xl border-2 border-amber-500 bg-amber-50 px-5 py-4"
      aria-live="polite"
    >
      <p className="mb-1.5 text-[1.15rem] font-extrabold text-amber-800">
        Cache time: 1 min
      </p>
      <p className="m-0 text-[0.98rem] leading-[1.55] text-amber-900">
        Changes you save here will show on the website after about 1 minute. If
        you do not see the update, refresh the website again after 1 minute.
      </p>
    </section>
  );
}
