import { asset } from "@/lib/asset";

/* Strip of red cloth tape with handwritten marker text */
export function Tape({
  children,
  className = "",
  as: Tag = "span",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "span" | "p" | "h2";
}) {
  return (
    <Tag className={`tape inline-block px-4 py-1.5 font-marker leading-none ${className}`}>{children}</Tag>
  );
}

/*
 * Iridescent disc in a clear case. The rainbow surface and the microprint
 * ring rotate slowly; the photo in the centre stays still.
 */
export function DiscCase({ photo, alt, microprint }: { photo?: string; alt: string; microprint: string }) {
  return (
    <div className="case case-hinge relative mx-auto aspect-square w-full max-w-md p-6 pl-12">
      <div className="relative aspect-square w-full">
        {/* spinning disc surface + microprint */}
        <div className="disc-spin absolute inset-0 rounded-full border-4 border-rim/60 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.6)]">
          <div className="iridescent absolute inset-0 rounded-full" />
          <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden>
            <defs>
              <path id="disc-ring" d="M100,100 m-88,0 a88,88 0 1,1 176,0 a88,88 0 1,1 -176,0" />
            </defs>
            <text fontSize="5.2" letterSpacing="1.4" fill="rgb(20 20 25 / 0.55)" fontFamily="var(--font-geist-mono), monospace">
              <textPath href="#disc-ring">{microprint}</textPath>
            </text>
          </svg>
        </div>

        {/* clear hub + photo label */}
        <div className="absolute inset-[17%] overflow-hidden rounded-full border-[6px] border-fg/85 bg-linear-to-b from-white to-[#e4eaec] shadow-[0_0_0_10px_rgb(255_255_255/0.55)]">
          {photo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={asset(photo)} alt={alt} className="absolute bottom-0 left-1/2 h-[92%] w-auto max-w-none -translate-x-1/2" />
          )}
        </div>
      </div>
    </div>
  );
}
