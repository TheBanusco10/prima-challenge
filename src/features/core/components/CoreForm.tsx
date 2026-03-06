interface Props {
  onNextStep?: () => void;
  onPreviousStep?: () => void;
  totalSteps: number;
  currentStep?: number;
  isValidStep?: boolean;
}

function CoreForm({
  onNextStep,
  onPreviousStep,
  children,
  totalSteps,
  isValidStep = true,
  currentStep = 1,
}: React.PropsWithChildren<Props>) {
  const canGoNext = currentStep < (totalSteps || 1) && isValidStep;
  const isFinalStep = currentStep === (totalSteps || 1);
  const isFirstStep = currentStep === 1;

  return (
    <section className="flex flex-col gap-8 p-4">
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
          <button className="btn btn-primary" disabled={!isValidStep}>
            Send
          </button>
        )}
      </div>
    </section>
  );
}

export default CoreForm;
