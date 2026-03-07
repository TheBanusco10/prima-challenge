import type { Suggestion } from "../domain/models/Suggestion";

interface Props {
  suggestions: Suggestion[];
}

function SuggestionsTable({ suggestions }: Props) {
  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Status</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {suggestions.map(({ meal, status, timestamp }, index) => (
            <tr key={meal.id}>
              <th>{index + 1}</th>
              <td>{meal.title}</td>
              <td>{status}</td>
              <td>{timestamp.toLocaleString()}</td>
            </tr>
          ))}
          {!suggestions.length && (
            <tr>
              <td colSpan={4} className="text-center">
                No data to display
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SuggestionsTable;
