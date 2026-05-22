export type Testimonial = {
  quote: string;
  name: string;
  note: string;
};

type TestimonialCardProps = Testimonial & {
  onReadMore?: () => void;
};

export const LONG_TESTIMONIAL_LENGTH = 150;

export function TestimonialCard({
  quote,
  name,
  note,
  onReadMore,
}: TestimonialCardProps) {
  const isLong = quote.length > LONG_TESTIMONIAL_LENGTH;

  return (
    <article className="testimonial">
      <div className="testimonial-surface">
        <p className={isLong ? "testimonial-quote is-clamped" : "testimonial-quote"}>
          “{quote}”
        </p>
        {isLong && onReadMore ? (
          <button
            className="testimonial-toggle"
            type="button"
            onClick={onReadMore}
          >
            Ler depoimento completo
          </button>
        ) : null}
        <span>{name}</span>
        <small>{note}</small>
      </div>
    </article>
  );
}
