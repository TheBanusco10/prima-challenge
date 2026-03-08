import CoreAutocomplete from "@/features/core/components/CoreAutocomplete";
import CoreFormStep from "@/features/core/components/CoreFormStep";
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
      <CoreAutocomplete
        label="Cuisine/Area"
        placeholder="Select a cuisine"
        value={formState.cuisine}
        items={mappedAllAreas}
        onChange={handleChange}
      />
    </CoreFormStep>
  );
}

export default PreferencesStep;
