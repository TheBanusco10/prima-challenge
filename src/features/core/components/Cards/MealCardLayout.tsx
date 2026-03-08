import CoreCard from "@/features/core/components/CoreCard";

interface Props {
  title: string;
  imageUrl: string;
  imageAlt: string;
  badges?: string[];
  actions?: React.ReactNode;
  overImage?: React.ReactNode;
  additionalClasses?: string;
}

function Image({ imageUrl, imageAlt }: { imageUrl: string; imageAlt: string }) {
  return (
    <img
      className="w-full h-64 object-cover"
      src={`${imageUrl}/medium`}
      alt={imageAlt}
    />
  );
}

function Badges({ badges }: { badges?: string[] }) {
  if (!badges?.length) return null;

  return (
    <section className="absolute bottom-2 left-2 flex gap-2">
      {badges.map((badge) => (
        <div key={badge} className="badge badge-secondary badge-soft badge-sm">
          {badge}
        </div>
      ))}
    </section>
  );
}

function MealCardLayout({
  title,
  imageUrl,
  imageAlt,
  badges,
  actions,
  overImage,
  additionalClasses,
}: Props) {
  return (
    <CoreCard
      additionalClasses={additionalClasses}
      Title={() => title}
      Image={() => <Image imageUrl={imageUrl} imageAlt={imageAlt} />}
      Actions={() => actions}
      OverImage={() => (
        <>
          <Badges badges={badges} />
          {overImage}
        </>
      )}
    />
  );
}

export default MealCardLayout;
