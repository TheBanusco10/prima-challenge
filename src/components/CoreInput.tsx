interface Props {
  label: string;
  placeholder?: string;
  type?: string;
  onChange?: (value: string) => void;
}

function CoreInput({
  label,
  placeholder = "",
  type = "text",
  onChange,
}: Props) {
  return (
    <label className="floating-label">
      <span>{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="input input-md"
        onChange={(e) => onChange?.(e.target.value)}
      />
    </label>
  );
}

export default CoreInput;
