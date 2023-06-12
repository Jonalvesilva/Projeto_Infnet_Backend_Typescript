export type TextFieldProps = {
  className?: string;
  onKeyDown?: (event: Event) => void;
  value?: string;
  onChange?: (value: string) => void;
  placeholder: string;
  name?: string;
  defaultValue?: string;
};

export function TextField({
  className,
  value,
  placeholder,
  name,
  onChange,
  defaultValue,
}: TextFieldProps) {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={onChange ? (event) => onChange(event.target.value) : undefined}
      className={className}
      name={name}
      defaultValue={defaultValue}
      type="text"
    />
  );
}
