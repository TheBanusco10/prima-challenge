import type { CoreSelectOption } from "../types/select";

interface Props {
  label: string;
  options: CoreSelectOption[];
  defaultValue?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

function CoreSelect({
  label,
  options,
  defaultValue,
  disabled,
  onChange,
}: Props) {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{label}</legend>
      <select
        className="select"
        defaultValue={defaultValue}
        disabled={disabled}
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
