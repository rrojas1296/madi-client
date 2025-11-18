import Input from "../input/Input";

interface Props {
  placeholderMin: string;
  placeholderMax: string;
  onChange: (val: { min: number; max: number }) => void;
  value: {
    min: number;
    max: number;
  };
}

const InputRange = ({
  placeholderMin,
  placeholderMax,
  onChange,
  value,
}: Props) => {
  const handleChange = (name: "min" | "max", n: number) => {
    const newValue = {
      ...value,
      [name]: n,
    };
    onChange(newValue);
  };
  return (
    <div className="flex gap-4">
      <Input
        type="number"
        placeholder={placeholderMin}
        onChange={(val) => handleChange("min", parseInt(val.target.value))}
      />
      <Input
        type="number"
        placeholder={placeholderMax}
        onChange={(val) => handleChange("max", parseInt(val.target.value))}
      />
    </div>
  );
};

export default InputRange;
