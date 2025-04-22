import { useField } from 'formik';

interface InputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ label, name, type = 'text', placeholder }) => {
  const [field, meta] = useField(name);

  return (
    <div>
      <label htmlFor={name} className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={name}
        type={type}
        placeholder={placeholder}
        {...field}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-xs italic">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default Input;