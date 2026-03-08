import MealCardLayout from "@/features/core/components/Cards/MealCardLayout";
import type { MealDetailed } from "../domain/models/MealDetailed";

interface Props {
  meal: MealDetailed;
}

function MealCard({ meal }: Props) {
  const { title, mealThumb, category, area, link } = meal;

  return (
    <MealCardLayout
      title={title}
      imageUrl={mealThumb}
      imageAlt={title}
      badges={[area, category]}
      additionalClasses="w-auto [&_.card-body]:p-0 [&_.card-body]:justify-between [&_.card-title]:p-6"
      actions={
        <a
          className={`w-full btn btn-primary btn-soft rounded-tl-none rounded-tr-none ${
            !link ? "opacity-50 pointer-events-none" : ""
          }`}
          target="_blank"
          href={link}
        >
          See recipe
        </a>
      }
    />
  );
}

export default MealCard;
