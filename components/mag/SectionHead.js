import Emph from '@/components/mag/Emph';

/**
 * @param {{ kicker: string; title: string; lead?: import('react').ReactNode; id?: string; as?: 'h2' | 'h3' }} props
 */
export default function SectionHead({ kicker, title, lead, id, as: Heading = 'h2' }) {
  return (
    <header className="section-head">
      <p className="kicker">{kicker}</p>
      <Heading id={id}>
        <Emph text={title} />
      </Heading>
      {lead ? <p className="lead">{typeof lead === 'string' ? <Emph text={lead} /> : lead}</p> : null}
    </header>
  );
}
