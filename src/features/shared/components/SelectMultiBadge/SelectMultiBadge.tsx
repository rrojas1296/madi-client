import BadgeOption from "../BadgeOption/BadgeOption";

interface Option {
  label: string;
  value: string | number;
}
interface Props {
  options?: Option[];
  onChange: (val: (number | string)[]) => void;
  values: (string | number)[];
}

const SelectMultiBadge = ({ options, onChange, values }: Props) => {
  const handleChange = (selected: string | number) => {
    if (values && values.includes(selected)) {
      const newOpts = values.filter((v) => v !== selected);
      onChange(newOpts);
    } else if (!values) {
      onChange([selected]);
    } else {
      onChange([...values, selected]);
    }
  };

  return (
    <div className="flex gap-4">
      {options?.map((opt) => {
        const isActive = values?.includes(opt.value);
        return (
          <BadgeOption
            key={opt.label}
            isActive={isActive}
            handleChange={handleChange}
            label={opt.label}
            value={opt.value}
          />
        );
      })}
    </div>
  );
};

export default SelectMultiBadge;
