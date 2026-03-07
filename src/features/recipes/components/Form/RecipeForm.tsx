import CoreForm from "@/features/core/components/CoreForm";
import PreferencesStep from "./Steps/PreferencesStep";
import ConstraintsStep from "./Steps/ConstraintsStep";
import { useEffect, useState } from "react";
import useRecipeAreas from "../../hooks/useRecipeAreas";
import useRecipeCategories from "../../hooks/useRecipeCategories";

interface Props {
  onSubmit: (formState: Record<string, any>) => void;
}

function RecipeForm({ onSubmit }: Props) {
  const STEPS = [PreferencesStep, ConstraintsStep];
  const [currentStep, setCurrentStep] = useState(1);
  const [formState, setFormState] = useState({
    cuisine: "",
    category: "",
  });
  const [stepValidation, setStepValidation] = useState<Map<number, boolean>>(
    new Map(),
  );

  const { allAreas, getAllAreas } = useRecipeAreas();
  const { allCategories, getAllCategories } = useRecipeCategories();

  const isValidStep = stepValidation.get(currentStep) || false;

  useEffect(() => {
    Promise.all([getAllAreas(), getAllCategories()]);
  }, []);

  useEffect(() => {
    updateFormState({ allAreas, allCategories });
  }, [allAreas, allCategories]);

  const updateFormState = (data: Record<string, any>) => {
    setFormState({
      ...formState,
      ...data,
    });
  };

  const validateStep = (params: { step: number; isValid: boolean }) => {
    setStepValidation((prev) => new Map(prev.set(params.step, params.isValid)));
  };

  return (
    <CoreForm
      currentStep={currentStep}
      totalSteps={STEPS.length}
      isValidStep={isValidStep}
      onNextStep={() => setCurrentStep(currentStep + 1)}
      onPreviousStep={() => setCurrentStep(currentStep - 1)}
      onSubmit={() => onSubmit(formState)}
    >
      {STEPS.map(
        (Step, index) =>
          currentStep === index + 1 && (
            <Step
              key={index}
              currentStep={currentStep}
              formState={formState}
              updateFormState={updateFormState}
              validateStep={validateStep}
            />
          ),
      )}
    </CoreForm>
  );
}

export default RecipeForm;
