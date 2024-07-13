import React, { useState } from 'react';

function Input({ type = "text", label, placeholder, initialValue, onChange, onBlur, errorMessage = "" }) {
  const [value, setValue] = useState(initialValue);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleChange = (e) => {
    const valueOut = e.target.value;
    setValue(() => valueOut);
    if (onChange) {
      onChange(valueOut);
    }
  };

  const handleBlur = (e) => {
    if (onBlur) {
      onBlur(e.target.value);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div>
      <label className="block text-sm font-bold mb-2" htmlFor={label}>
        {label}
      </label>
      <div className="relative">

        <input
          type={type === 'password' && isPasswordVisible ? 'text' : type}
          className="w-full px-3 py-2 border rounded"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {type === 'password' && (
          <i
            className={`absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer fi ${isPasswordVisible ? 'fi-rs-crossed-eye' : 'fi-rs-eye'}`}
            onClick={togglePasswordVisibility}
          ></i>
        )}
      </div>
      {errorMessage && <p className="text-red-500 text-xs italic">{errorMessage}</p>}
    </div>
  );
}

export default Input;