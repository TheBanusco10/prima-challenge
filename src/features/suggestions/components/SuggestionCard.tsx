import CoreCard from "@/features/core/components/CoreCard";
import { ThumbDownOutline } from "@/features/core/icons/ThumbDownOutline";
import { ThumbUpOutline } from "@/features/core/icons/ThumbUpOutline";
import type { Suggestion } from "../domain/models/Suggestion";
import type { SuggestionStatus } from "../domain/types/suggestions";
import { ThumbUp } from "@/features/core/icons/ThumbUp";
import { ThumbDown } from "@/features/core/icons/ThumbDown";

interface Props extends OverImageProps {
  suggestion: Suggestion;
}

interface OverImageProps {
  badges: string[];
  status?: SuggestionStatus | null;
  onLike?: () => void;
  onDislike?: () => void;
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
function OverImage({ badges, status, onLike, onDislike }: OverImageProps) {
  const liked = status === "liked";
  const disliked = status === "disliked";

  return (
    <>
      <section className="absolute bottom-2 left-2 flex gap-2">
        {badges.map((badge) => (
          <div
            key={badge}
            className="badge badge-secondary badge-soft badge-sm"
          >
            {badge}
          </div>
        ))}
      </section>
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
    </>
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

function SuggestionCard({ suggestion, onLike, onDislike }: Props) {
  const { meal, status, tags } = suggestion;
  return (
    <CoreCard
      additionalClasses="[&_.card-body]:p-0 [&_.card-title]:p-6"
      Title={() => meal.title}
      Actions={() => <Actions />}
      Image={() => <Image imageUrl={meal.mealThumb} title={meal.title} />}
      OverImage={() => (
        <OverImage
          badges={tags}
          status={status}
          onLike={onLike}
          onDislike={onDislike}
        />
      )}
    />
  );
}

export default SuggestionCard;
