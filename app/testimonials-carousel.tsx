"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  LONG_TESTIMONIAL_LENGTH,
  TestimonialCard,
  type Testimonial,
} from "./testimonial-card";

const CARD_GAP = 18;
const MODAL_CLOSE_MS = 180;

function getVisibleCount() {
  if (window.innerWidth <= 680) {
    return 1;
  }

  if (window.innerWidth <= 980) {
    return 2;
  }

  return 3;
}

export function TestimonialsCarousel({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const [cardWidth, setCardWidth] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const maxIndex = Math.max(0, testimonials.length - visibleCount);
  const clampedActiveIndex = Math.min(activeIndex, maxIndex);
  const activeTestimonial = openIndex === null ? null : testimonials[openIndex];
  const modalState = isClosing ? "closing" : activeTestimonial ? "open" : "closed";

  const carouselStyle = useMemo(
    () =>
      ({
        "--testimonial-card-width": cardWidth ? `${cardWidth}px` : "100%",
        "--testimonial-index": clampedActiveIndex,
      }) as CSSProperties,
    [cardWidth, clampedActiveIndex],
  );

  const closeModal = useCallback(() => {
    if (!activeTestimonial || isClosing) {
      return;
    }

    setIsClosing(true);
    closeTimerRef.current = window.setTimeout(() => {
      setOpenIndex(null);
      setIsClosing(false);
      closeTimerRef.current = null;
    }, MODAL_CLOSE_MS);
  }, [activeTestimonial, isClosing]);

  useEffect(() => {
    function syncCarouselMetrics() {
      const nextVisibleCount = getVisibleCount();
      const viewportWidth = viewportRef.current?.clientWidth ?? 0;
      const nextCardWidth =
        nextVisibleCount > 0
          ? (viewportWidth - CARD_GAP * (nextVisibleCount - 1)) / nextVisibleCount
          : viewportWidth;

      setVisibleCount(nextVisibleCount);
      setCardWidth(Math.max(0, nextCardWidth));
    }

    syncCarouselMetrics();
    window.addEventListener("resize", syncCarouselMetrics);

    return () => {
      window.removeEventListener("resize", syncCarouselMetrics);
    };
  }, []);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeModal();
      }
    }

    if (activeTestimonial) {
      window.addEventListener("keydown", closeOnEscape);
    }

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeTestimonial, closeModal]);

  useEffect(
    () => () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    },
    [],
  );

  function openModal(index: number) {
    if (testimonials[index].quote.length <= LONG_TESTIMONIAL_LENGTH) {
      return;
    }

    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
    }

    setIsClosing(false);
    setOpenIndex(index);
  }

  return (
    <div className="testimonials-carousel" data-visible={visibleCount}>
      <div className="testimonial-window" ref={viewportRef}>
        <div className="testimonial-track" style={carouselStyle}>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={`${testimonial.name}-${index}`}
              name={testimonial.name}
              note={testimonial.note}
              quote={testimonial.quote}
              onReadMore={() => openModal(index)}
            />
          ))}
        </div>
      </div>

      {clampedActiveIndex > 0 ? (
        <button
          aria-label="Ver depoimentos anteriores"
          className="testimonial-nav testimonial-nav-prev"
          type="button"
          onClick={() => setActiveIndex(Math.max(0, clampedActiveIndex - 1))}
        >
          ←
        </button>
      ) : null}

      {clampedActiveIndex < maxIndex ? (
        <button
          aria-label="Ver próximos depoimentos"
          className="testimonial-nav testimonial-nav-next"
          type="button"
          onClick={() => setActiveIndex(Math.min(maxIndex, clampedActiveIndex + 1))}
        >
          →
        </button>
      ) : null}

      {activeTestimonial ? (
        <div className="testimonial-modal-root" data-state={modalState}>
          <button
            aria-label="Fechar depoimento completo"
            className="testimonial-backdrop"
            type="button"
            onClick={closeModal}
          />
          <article className="testimonial-modal" role="dialog" aria-modal="true">
            <div className="testimonial-surface">
              <p className="testimonial-quote">“{activeTestimonial.quote}”</p>
              <button
                className="testimonial-close"
                type="button"
                onClick={closeModal}
              >
                Fechar
              </button>
              <span>{activeTestimonial.name}</span>
              <small>{activeTestimonial.note}</small>
            </div>
          </article>
        </div>
      ) : null}
    </div>
  );
}
