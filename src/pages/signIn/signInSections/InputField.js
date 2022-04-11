import React from "react";
import Select from "react-select";

const InputField = ({ placeholder, icon, type, dropdown }) => {
  const options = [
    { value: "+45", label: "+45 Denmark" },
    { value: "+91", label: "+91 India" },
    { value: "+63", label: "+63 Australia" },
  ];
  return (
    <div className="signIn-input">
      <div className="input-select-group">
        {dropdown && <Select className="select-target " options={options} />}
        <input
          type={type}
          placeholder={placeholder}
          autoComplete="new-password"
        />
      </div>
      {icon && <img src={icon} alt="" />}
    </div>
  );
};

export default InputField;
