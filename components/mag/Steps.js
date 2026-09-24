import Link from 'next/link';

/** @param {{ steps: { title: string; description: string; link?: { href: string; label: string } }[] }} props */
export default function Steps({ steps }) {
  return (
    <ol className="steps">
      {steps.map((step, index) => (
        <li key={step.title} className="step">
          <span className="step__no" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="step__title">{step.title}</h3>
          <p className="step__text">{step.description}</p>
          {step.link ? (
            <Link href={step.link.href} className="text-link step__link">
              {step.link.label}
            </Link>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
