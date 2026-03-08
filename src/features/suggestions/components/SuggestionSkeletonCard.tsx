import CoreCard from "@/features/core/components/CoreCard";

function SuggestionSkeletonCard() {
  return (
    <CoreCard
      additionalClasses="[&_.card-body]:p-0 [&_.card-title]:p-6"
      Title={() => <div className="skeleton h-6 w-full"></div>}
      Actions={() => (
        <div className="skeleton h-10 w-full rounded-tl-none rounded-tr-none"></div>
      )}
      Image={() => (
        <div className="skeleton h-48 w-full rounded-bl-none rounded-br-none"></div>
      )}
    />
  );
}

export default SuggestionSkeletonCard;
