interface Props {
  id: string;
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
  id,
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
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="label">
        {label}
      </label>
      <input
        id={id}
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
    </div>
  );
}

export default CoreInput;
