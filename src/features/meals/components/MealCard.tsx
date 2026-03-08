import CoreCard from "@/features/core/components/CoreCard";
import type { MealDetailed } from "../domain/models/MealDetailed";

interface Props extends Omit<OverImageProps, "badges"> {
  meal: MealDetailed;
}

interface OverImageProps {
  badges: string[];
}

function Image({ imageUrl, title }: { imageUrl: string; title: string }) {
  return (
    <img
      className="w-full h-64 object-cover"
      src={`${imageUrl}/medium`}
      alt={title}
    />
  );
}
function OverImage({ badges }: OverImageProps) {
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

function Actions() {
  return (
    <a
      href="#"
      className="w-full btn btn-primary btn-soft rounded-tl-none rounded-tr-none"
    >
      See recipe
    </a>
  );
}

function MealCard({ meal }: Props) {
  const { title, mealThumb, category, area } = meal;

  const tags = [area, category];

  return (
    <CoreCard
      additionalClasses="[&_.card-body]:p-0 [&_.card-title]:p-6"
      Title={() => title}
      Actions={() => <Actions />}
      Image={() => <Image imageUrl={mealThumb} title={title} />}
      OverImage={() => <OverImage badges={tags} />}
    />
  );
}

export default MealCard;
