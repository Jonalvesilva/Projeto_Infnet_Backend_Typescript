export type TextFieldProps = {
  className?: string;
  onKeyDown?: (event: Event) => void;
  value?: string;
  onChange?: (value: string) => void;
  placeholder: string;
  name?: string;
};
const controlNumber = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "Backspace",
];

export function TextNumber({
  className,
  value,
  placeholder,
  name,
  onChange,
}: TextFieldProps) {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onKeyDown={(event) => {
        if (!controlNumber.includes(event.key) || event.key === "Dead") {
          event.preventDefault();
        }
      }}
      onChange={onChange ? (event) => onChange(event.target.value) : undefined}
      className={className}
      name={name}
      type="text"
    />
  );
}
