interface Props {
  onNextStep?: () => void;
  onPreviousStep?: () => void;
  currentStep?: number;
  totalSteps?: number;
}

function CoreForm({
  children,
  onNextStep,
  onPreviousStep,
  currentStep = 1,
  totalSteps,
}: React.PropsWithChildren<Props>) {
  const canGoNext = currentStep < (totalSteps || 1);
  const isFinalStep = currentStep === (totalSteps || 1);
  const isFirstStep = currentStep === 1;

  return (
    <section className="flex flex-col gap-8">
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
        {isFinalStep && <button className="btn btn-primary">Send</button>}
      </div>
    </section>
  );
}

export default CoreForm;
