interface Props {
  label: string;
  placeholder?: string;
  type?: string;
  defaultValue?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

function CoreInput({
  label,
  placeholder = "",
  type = "text",
  defaultValue,
  disabled,
  onChange,
}: Props) {
  return (
    <label className="floating-label">
      <span>{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full input input-md"
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </label>
  );
}

export default CoreInput;
