import CoreCard from "@/features/core/components/CoreCard";
import { MdiThumbDownOutline } from "@/features/core/icons/ThumbDownOutline";
import { ThumbUpOutline } from "@/features/core/icons/ThumbUpOutline";
import type { Suggestion } from "../domain/models/Suggestion";
import type { SuggestionStatus } from "../domain/types/suggestions";

interface Props extends ActionsProps {
  suggestion: Suggestion;
}

interface ActionsProps {
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
            disabled={liked}
          >
            <ThumbUpOutline width="1.3rem" height="1.3rem" />
          </button>
          <button
            className={`btn btn-circle btn-ghost ${disliked ? "text-error" : ""}`}
            onClick={onDislike}
            disabled={disliked}
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

function SuggestionCard({ suggestion, onLike, onDislike }: Props) {
  const { meal, status, tags } = suggestion;
  return (
    <CoreCard
      Title={() => meal.title}
      Actions={() => (
        <Actions status={status} onLike={onLike} onDislike={onDislike} />
      )}
      Image={() => <Image imageUrl={meal.mealThumb} title={meal.title} />}
      OverImage={() => (tags ? OverImage({ badges: tags }) : null)}
    />
  );
}

export default SuggestionCard;
