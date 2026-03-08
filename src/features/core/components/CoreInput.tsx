interface Props {
  label: string;
  placeholder?: string;
  type?: string;
  defaultValue?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  onClick?: () => void;
  onBlur?: () => void;
}

function CoreInput({
  label,
  placeholder = "",
  type = "text",
  defaultValue,
  disabled,
  value,
  onChange,
  onClick,
  onBlur,
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
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onClick={onClick}
        onBlur={onBlur}
      />
    </label>
  );
}

export default CoreInput;
