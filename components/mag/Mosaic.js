import Photo from '@/components/mag/Photo';

/** @param {{ items: { src: string; alt: string; caption?: string }[]; label: string }} props */
export default function Mosaic({ items, label }) {
  return (
    <div className="mosaic" role="list" aria-label={label}>
      {items.map((item) => (
        <div key={`${item.src}-${item.caption ?? item.alt}`} role="listitem" className="mosaic__item">
          <Photo className="mosaic__photo" src={item.src} alt={item.alt} caption={item.caption} />
        </div>
      ))}
    </div>
  );
}
