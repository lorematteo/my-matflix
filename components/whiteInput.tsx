
interface WhiteInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange(e: string): void;
  multiline?: number;
}

const WhiteInput: React.FC<WhiteInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  multiline,
}) => {
  if (!multiline) {
    return (
      <div className="flex flex-row items-center gap-4 w-full">
        <label className="w-24 text-right shrink-0">{label}</label>
        <input
          type="text"
          id={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            w-full
          text-gray-600
            text-sm sm:text-base
            h-8
            sm:indent-2
            px-1
          bg-gray-300
            focus:outline-none
          "
          placeholder={placeholder}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-4 w-full">
      <label className="w-24 mt-1 shrink-0">{label}</label>
      <textarea
        id={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
        text-gray-600
          text-sm sm:text-base
          sm:indent-2
          px-1
          py-1
        bg-gray-300
          focus:outline-none
        "
        placeholder={placeholder}
        rows={multiline}
      />
    </div>
  );
};

export default WhiteInput;
