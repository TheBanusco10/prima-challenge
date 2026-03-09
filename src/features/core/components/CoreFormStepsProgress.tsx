import { CheckBold } from "../icons/CheckBold";

interface Props {
  currentStep: number;
  titles: string[];
}

function CoreFormStepsProgress({ currentStep, titles }: Props) {
  const isActive = (index: number) => {
    return index + 1 === currentStep;
  };

  const isCompleted = (index: number) => {
    return index + 1 < currentStep;
  };

  return (
    <section className="flex justify-center gap-4 mt-4">
      {titles.map((title, index) => (
        <article key={title} className="flex gap-4 items-center">
          <p
            className={`flex gap-2 transition duration-200
                ${isActive(index) ? "text-base-content" : "text-base-content/50"}
                ${isCompleted(index) ? "text-base-content!" : ""}
              `}
          >
            <span
              className={`w-6 h-6 flex items-center justify-center rounded-full transition duration-200
                  ${isActive(index) ? "bg-base-200" : ""}
                  ${isCompleted(index) ? "bg-success" : ""}
                `}
            >
              {!isCompleted(index) ? (
                <span className="text-xs">{index + 1}</span>
              ) : (
                <CheckBold width="0.8rem" height="0.8rem" />
              )}
            </span>

            <span>{title}</span>
          </p>

          {index < titles.length - 1 && (
            <div
              className={`w-32 h-px border transition duration-200
                  ${
                    isCompleted(index)
                      ? "border-success border-solid"
                      : "border-base-content/50 border-dashed"
                  }
                `}
            />
          )}
        </article>
      ))}
    </section>
  );
}

export default CoreFormStepsProgress;
