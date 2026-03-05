import type { CoreSelectOption } from "../domain/types/select";

interface Props {
  label: string;
  options: CoreSelectOption[];
  onChange?: (value: string) => void;
}

function CoreSelect({ label, options, onChange }: Props) {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{label}</legend>
      <select
        className="select"
        defaultValue=""
        onChange={(e) => onChange?.(e.target.value)}
      >
        <option disabled value="">
          Select an option
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </fieldset>
  );
}

export default CoreSelect;
