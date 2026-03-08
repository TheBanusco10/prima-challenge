import { ThumbDownOutline } from "@/features/core/icons/ThumbDownOutline";
import { ThumbUpOutline } from "@/features/core/icons/ThumbUpOutline";
import { ThumbUp } from "@/features/core/icons/ThumbUp";
import { ThumbDown } from "@/features/core/icons/ThumbDown";
import type { Suggestion } from "../domain/models/Suggestion";
import MealCardLayout from "@/features/core/components/Cards/MealCardLayout";

interface Props {
  suggestion: Suggestion;
  onLike?: () => void;
  onDislike?: () => void;
}

function SuggestionActions({
  status,
  onLike,
  onDislike,
}: {
  status?: string | null;
  onLike?: () => void;
  onDislike?: () => void;
}) {
  const liked = status === "liked";
  const disliked = status === "disliked";

  return (
    <div
      className="absolute right-2 top-2 tooltip tooltip-left"
      data-tip="Did it match your preference?"
    >
      <div className="flex gap-2">
        <button
          className={`btn btn-circle btn-soft ${liked ? "text-success" : ""}`}
          onClick={onLike}
          disabled={liked}
        >
          {liked ? (
            <ThumbUp width="1.3rem" height="1.3rem" />
          ) : (
            <ThumbUpOutline width="1.3rem" height="1.3rem" />
          )}
        </button>

        <button
          className={`btn btn-circle btn-soft ${disliked ? "text-error" : ""}`}
          onClick={onDislike}
          disabled={disliked}
        >
          {!disliked ? (
            <ThumbDownOutline width="1.3rem" height="1.3rem" />
          ) : (
            <ThumbDown width="1.3rem" height="1.3rem" />
          )}
        </button>
      </div>
    </div>
  );
}

function SuggestionCard({ suggestion, onLike, onDislike }: Props) {
  const { meal, tags, status } = suggestion;

  return (
    <MealCardLayout
      title={meal.title}
      imageUrl={meal.mealThumb}
      imageAlt={meal.title}
      badges={tags}
      additionalClasses="[&_.card-body]:p-0 [&_.card-title]:p-6"
      actions={
        <a className="w-full btn btn-primary btn-soft rounded-tl-none rounded-tr-none opacity-50 pointer-events-none">
          See recipe
        </a>
      }
      overImage={
        <SuggestionActions
          status={status}
          onLike={onLike}
          onDislike={onDislike}
        />
      }
    />
  );
}

export default SuggestionCard;
