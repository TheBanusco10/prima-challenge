import type React from "react";

interface Props {
  totalSteps: number;
  currentStep?: number;
  isValidStep?: boolean;
  onNextStep?: () => void;
  onPreviousStep?: () => void;
  onSubmit?: () => void;
}

function CoreFormTitle({ children }: React.PropsWithChildren) {
  return <div>{children}</div>;
}

function CoreForm({
  children,
  totalSteps,
  isValidStep = true,
  currentStep = 1,
  onNextStep,
  onPreviousStep,
  onSubmit,
}: React.PropsWithChildren<Props>) {
  const canGoNext = currentStep < (totalSteps || 1) && isValidStep;
  const isFinalStep = currentStep === (totalSteps || 1);
  const isFirstStep = currentStep === 1;

  return (
    <section className="flex flex-col gap-8 p-4">
      <CoreFormTitle />
      {children}
      <div className="flex justify-between">
        <button
          className="btn btn-outline"
          onClick={onPreviousStep}
          disabled={isFirstStep}
        >
          Back
        </button>
        {!isFinalStep && (
          <button
            className="btn btn-primary"
            disabled={!canGoNext}
            onClick={onNextStep}
          >
            Next
          </button>
        )}
        {isFinalStep && (
          <button
            className="btn btn-primary"
            disabled={!isValidStep}
            onClick={onSubmit}
          >
            Send
          </button>
        )}
      </div>
    </section>
  );
}

CoreForm.Title = CoreFormTitle;

export default CoreForm;
