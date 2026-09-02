// Reusable section heading (eyebrow + title + subline).
export default function SectionHeading({
  eyebrow,
  title,
  subline,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  subline?: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""} mb-10`}>
      {eyebrow && <div className="eyebrow mb-2">{eyebrow}</div>}
      <h2 className="text-3xl text-ink md:text-4xl">{title}</h2>
      {subline && <p className="mt-3 text-inksoft">{subline}</p>}
    </div>
  );
}
