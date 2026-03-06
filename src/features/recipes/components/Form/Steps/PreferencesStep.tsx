import CoreFormStep from "@/features/core/components/CoreFormStep";
import CoreSelect from "@/features/core/components/CoreSelect";
import type { Area } from "@/features/recipes/domain/models/Area";

function PreferencesStep({
  currentStep,
  formState,
  updateFormState,
  validateStep,
}: FormStepProps) {
  const mappedAllAreas =
    formState.allAreas?.map((area: Area) => ({
      label: area.label,
      value: area.label.toLowerCase(),
    })) || [];

  const handleChange = (value: string) => {
    updateFormState({ cuisine: value });

    validateStep({ step: currentStep, isValid: true });
  };

  return (
    <CoreFormStep>
      <CoreSelect
        label="Cuisine/Area"
        options={mappedAllAreas}
        defaultValue={formState.cuisine}
        onChange={handleChange}
      />
    </CoreFormStep>
  );
}

export default PreferencesStep;
