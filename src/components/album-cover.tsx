import { asset } from "@/lib/asset";

/*
 * Profile presented as a record: a square sleeve (photo in true colour,
 * artist name, album title, catalogue line, a release sticker) with the
 * vinyl sliding out of the right side.
 */
export function AlbumCover({
  photo,
  artist,
  title,
  location,
  sticker,
}: {
  photo?: string;
  artist: string;
  title: string;
  location: string;
  sticker: string;
}) {
  const year = new Date().getFullYear();
  const catalogue = `${artist
    .split(" ")
    .map((w) => w[0])
    .join("")}-${String(year).slice(2)}01`;

  return (
    <figure className="group relative mx-auto w-full max-w-[19rem] sm:max-w-sm">
      {/* vinyl peeking out of the sleeve */}
      <div
        aria-hidden
        className="absolute top-[4%] right-0 aspect-square w-[92%] translate-x-[22%] rounded-full transition-transform duration-700 ease-out group-hover:translate-x-[34%] group-hover:rotate-45 motion-reduce:transition-none"
        style={{
          background:
            "radial-gradient(circle, #f5c518 0 16%, #0a0a22 16.5% 18%, transparent 18.5%), repeating-radial-gradient(circle, #111118 0 2px, #1c1c26 2px 3px)",
          boxShadow: "0 20px 40px -18px rgb(0 0 0 / 0.6), inset 0 0 0 2px rgb(255 255 255 / 0.06)",
        }}
      >
        <span className="absolute inset-[47%] rounded-full bg-[#0a0a22]" />
      </div>

      {/* the sleeve */}
      <div className="relative aspect-square overflow-hidden rounded-sm bg-[#e6e7ec] shadow-[0_28px_50px_-20px_rgb(0_0_0/0.65)] ring-1 ring-white/10">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,#ffffff_0%,#e9eaef_50%,#c7cad6_100%)]" />
        {photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={asset(photo)}
            alt={artist}
            className="absolute bottom-[14%] left-1/2 h-[74%] w-auto max-w-none -translate-x-1/2"
          />
        )}

        {/* artist line */}
        <div className="absolute inset-x-0 top-0 p-4">
          <figcaption className="text-xs font-semibold tracking-[0.25em] text-night uppercase">{artist}</figcaption>
        </div>

        {/* album title along the bottom, over a fade so it stays readable */}
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-night from-45% via-night/80 to-transparent px-4 pt-12 pb-4">
          <p className="title-yellow text-4xl sm:text-5xl">{title}</p>
          <div className="mt-2 flex items-center justify-between text-[10px] tracking-[0.2em] text-white/70 uppercase">
            <span>{location}</span>
            <span>
              {catalogue} · © {year}
            </span>
          </div>
        </div>
      </div>

      {/* shrink-wrap release sticker */}
      <div className="absolute -top-5 -right-5 grid size-24 rotate-12 place-items-center rounded-full bg-yellow p-3 text-center text-night shadow-lg ring-4 ring-yellow/30">
        <p className="text-[11px] leading-tight font-bold tracking-wide uppercase">{sticker}</p>
      </div>
    </figure>
  );
}
