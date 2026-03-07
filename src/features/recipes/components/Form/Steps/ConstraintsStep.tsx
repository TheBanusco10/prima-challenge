import CoreFormStep from "@/features/core/components/CoreFormStep";
import CoreSelect from "@/features/core/components/CoreSelect";
import type { Category } from "@/features/recipes/domain/models/Category";

function ConstraintsStep({
  currentStep,
  formState,
  updateFormState,
  validateStep,
}: FormStepProps) {
  const mappedCategories =
    formState.allCategories?.map((category: Category) => ({
      label: category.name,
      value: category.name.toLowerCase(),
    })) || [];

  const handleChange = (value: string) => {
    updateFormState({ category: value });

    validateStep({ step: currentStep, isValid: true });
  };

  return (
    <CoreFormStep>
      <CoreSelect
        label="Category"
        defaultValue={formState.category}
        options={mappedCategories}
        onChange={handleChange}
      />
    </CoreFormStep>
  );
}

export default ConstraintsStep;
