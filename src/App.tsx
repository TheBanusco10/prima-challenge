import CoreForm from "./components/CoreForm";
import CoreFormStep from "./components/CoreFormStep";
import CoreInput from "./components/CoreInput";
import CoreSelect from "./components/CoreSelect";
import { useState } from "react";

function FirstStep({
  updateFormState,
}: {
  updateFormState: (data: Record<string, any>) => void;
}) {
  const handleChange = (value: string) => {
    updateFormState({ cuisine: value });
  };
  return (
    <CoreFormStep>
      <CoreSelect
        label="Cuisine/Area"
        options={[{ label: "Spanish", value: "spanish" }]}
        onChange={handleChange}
      />
    </CoreFormStep>
  );
}

function SecondStep({
  updateFormState,
}: {
  updateFormState: (data: Record<string, any>) => void;
}) {
  const handleChange = (value: string) => {
    updateFormState({ ingredient: value });
  };
  return (
    <CoreFormStep>
      <CoreInput
        type="text"
        label="Ingredient"
        placeholder="Type here"
        onChange={handleChange}
      />
    </CoreFormStep>
  );
}

function App() {
  const STEPS = [FirstStep, SecondStep];
  const [currentStep, setCurrentStep] = useState(1);
  const [formState, setFormState] = useState({});

  const updateFormState = (data: Record<string, any>) => {
    setFormState({
      ...formState,
      ...data,
    });
  };

  return (
    <main>
      <CoreForm
        currentStep={currentStep}
        totalSteps={STEPS.length}
        onNextStep={() => setCurrentStep(currentStep + 1)}
        onPreviousStep={() => setCurrentStep(currentStep - 1)}
      >
        {STEPS.map(
          (Step, index) =>
            currentStep === index + 1 && (
              <Step key={index} updateFormState={updateFormState} />
            ),
        )}
      </CoreForm>
    </main>
  );
}

export default App;
