import "./InputField.css";

interface Props {
  labelText: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type: string;
}

export const InputField = ({ labelText, onChange, value, type }: Props) => {
  return (
    <div className="input-container">
      <label htmlFor="input">{labelText}</label>
      <input type={type} onChange={onChange} value={value} />
    </div>
  );
};
