import React, { useState } from "react";
import { capitalizeFirstLetter } from "../services/capitalizeFirstLetter";
import "./formcomponent.style.css";

import loadingGif from "../assets/Loading_2.gif";

import { FORM_DATA_POST } from "../constants/constants";

function FormComponent({ dynamicForm }) {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");

  const [loading, setLoading] = useState(false);

  const formInputs = dynamicForm.form_inputs?.map((fInput) => {
    if (fInput.type === "text" || fInput.type === "number" || fInput.type === "textarea") {
      return (
        <div className="form-input-container" key={fInput.id}>
          <label htmlFor="" className="input-label">
            {fInput.label}
          </label>
          <input
            placeholder={fInput.placeholder}
            type={fInput.type}
            readOnly={fInput.readonly}
            multiple={fInput.multiple}
            name={fInput.name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="input-field"
          />
        </div>
      );
    } else if (fInput.type === "select") {
      return (
        <div className="form-input-container" key={fInput.id}>
          <label htmlFor="" className="input-label">
            {fInput.label}
          </label>
          <select
            multiple={fInput.multiple}
            name={fInput.name}
            placeholder={fInput.placeholder}
            readOnly={fInput.readonly}
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
            className="select-field"
          >
            <option value="" disabled selected className="select-placeholder">
              {fInput.placeholder}
            </option>
            {fInput.options.map((option) => {
              return (
                <>
                  <option
                    label={capitalizeFirstLetter(option.value)}
                    value={option.value}
                    key={option.id}
                  ></option>
                </>
              );
            })}
          </select>
        </div>
      );
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const fdata = {
      person_name: name,
      country: country,
    };
    // console.log(data);
    // console.log(name, country);
    setLoading(true);

    fetch(FORM_DATA_POST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: { form_inputs: { fdata } } }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div>
      <div className="form-group-container"></div>
      <form onSubmit={handleSubmit}>
        {formInputs}
        <button className="button-5" type="submit">
          Save
        </button>
        {loading ? <img src={loadingGif} alt="" className="loading-gif" /> : ""}
      </form>
    </div>
  );
}

export default FormComponent;
