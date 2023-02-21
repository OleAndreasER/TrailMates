import "./InputField.css";

interface Props {
  labelText: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const InputField = ({
  labelText,
  onChange,
  value,
  type,
  onKeyDown,
}: Props) => {
  return (
    <div className="input-container">
      <label htmlFor="input">{labelText}</label>
      <input
        type={type}
        onChange={onChange}
        value={value}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};
