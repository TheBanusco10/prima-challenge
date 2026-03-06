interface FormStepProps {
  currentStep: number;
  formState: Record<string, any>;
  updateFormState: (data: Record<string, any>) => void;
  validateStep: (params: { step: number; isValid: boolean }) => void;
}
