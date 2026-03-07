import CoreCard from "@/features/core/components/CoreCard";
import { MdiThumbDownOutline } from "@/features/core/icons/ThumbDownOutline";
import { ThumbUpOutline } from "@/features/core/icons/ThumbUpOutline";
import type { MealPreview } from "../../recipes/domain/models/MealPreview";
import type { SuggestionStatus } from "../domain/types/suggestions";

interface Props extends ActionsProps {
  mealPreview: MealPreview;
  tags?: string[];
}

interface ActionsProps {
  status?: SuggestionStatus | null;
  onLike?: () => void;
  onDislike?: () => void;
}

function Image({ imageUrl, meal }: { imageUrl: string; meal: string }) {
  return (
    <img
      className="w-full h-64 object-cover"
      src={`${imageUrl}/medium`}
      alt={meal}
    />
  );
}

function OverImage({ badges }: { badges: string[] }) {
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

function Actions({ status, onLike, onDislike }: ActionsProps) {
  const liked = status === "liked";
  const disliked = status === "disliked";

  return (
    <section className="w-full flex justify-between">
      <div className="tooltip" data-tip="Did it match your preference?">
        <div className="flex gap-1">
          <button
            className={`btn btn-circle btn-ghost ${liked ? "text-success" : ""}`}
            onClick={onLike}
          >
            <ThumbUpOutline width="1.3rem" height="1.3rem" />
          </button>
          <button
            className={`btn btn-circle btn-ghost ${disliked ? "text-error" : ""}`}
            onClick={onDislike}
          >
            <MdiThumbDownOutline width="1.3rem" height="1.3rem" />
          </button>
        </div>
      </div>
      <a href="#" className="btn btn-link">
        See recipe
      </a>
    </section>
  );
}

function SuggestionCard({
  mealPreview,
  tags,
  status,
  onLike,
  onDislike,
}: Props) {
  return (
    <CoreCard
      Title={() => mealPreview.meal}
      Actions={() => (
        <Actions status={status} onLike={onLike} onDislike={onDislike} />
      )}
      Image={() => (
        <Image imageUrl={mealPreview.mealThumb} meal={mealPreview.meal} />
      )}
      OverImage={() => (tags ? OverImage({ badges: tags }) : null)}
    />
  );
}

export default SuggestionCard;
