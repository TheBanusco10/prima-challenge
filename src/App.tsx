import SkeletonCardLayout from "./features/core/components/Cards/SkeletonCardLayout";
import SearchMealsSection from "./features/meals/components/SearchMealsSection";
import RecipeForm from "./features/recipes/components/Form/RecipeForm";
import SuggestionCard from "./features/suggestions/components/SuggestionCard";
import SuggestionsTable from "./features/suggestions/components/SuggestionsTable";
import useSuggestion from "./features/suggestions/hooks/useSuggestion";

function App() {
  const {
    suggestions,
    suggestion,
    isFetching,
    hasSearched,
    getSuggestion,
    likeSuggestion,
    dislikeSuggestion,
    suggestAgain,
  } = useSuggestion();

  return (
    <main className="flex flex-col lg:flex-row container mx-auto gap-8 pt-4">
      <section className="flex flex-wrap max-md:justify-center flex-row lg:flex-col [&>section]:w-96 [&>section]:max-md:mx-auto [&>section]:lg:px-0">
        <RecipeForm onSubmit={getSuggestion} />
        {isFetching && <SkeletonCardLayout />}
        {!isFetching && suggestion && (
          <div className="flex flex-col gap-4">
            <SuggestionCard
              suggestion={suggestion}
              onLike={likeSuggestion}
              onDislike={dislikeSuggestion}
            />
            <button className="btn btn-outline" onClick={suggestAgain}>
              New Idea
            </button>
          </div>
        )}
        {!isFetching && hasSearched && !suggestion && (
          <p className="text-center">No results found</p>
        )}
      </section>
      <section className="flex flex-col flex-1 gap-4 px-4">
        <div>
          <p className="text-lg font-semibold mb-2">Suggestions History</p>
          <SuggestionsTable suggestions={suggestions} />
        </div>
        <div>
          <p className="text-lg font-semibold mb-2">Search Meals</p>
          <SearchMealsSection />
        </div>
      </section>
    </main>
  );
}

export default App;
