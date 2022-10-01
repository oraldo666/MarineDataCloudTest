import React, { useState } from "react";
import { capitalizeFirstLetter } from "../services/capitalizeFirstLetter";
import "./formcomponent.style.css";

import loadingGif from "../assets/Loading_2.gif";

import { FORM_DATA_POST } from "../constants/constants";

function FormComponent({ dynamicForm, formLoaded }) {
  const [formDataInput, setFormDataInputs] = useState({
    person_name: "",
    country: "",
  });

  const [loading, setLoading] = useState(false);
  const [fieldsValidate, setFieldsValidate] = useState("");
  const [errors, setErrors] = useState(null);

  const [formPost, setFormPost] = useState(false);

  const handleInputCHange = (e) => {
    setFormDataInputs({
      ...formDataInput,
      [e.target.name]: e.target.value,
    });
  };

  const formInputs = dynamicForm.form_inputs?.map((fInput) => {
    if (
      fInput.type === "text" ||
      fInput.type === "number" ||
      fInput.type === "textarea"
    ) {
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
            value={formDataInput.person_name}
            required={fInput.rules.split("|")[0]}
            minLength={fInput.rules.split("min:")[1].charAt(0)}
            maxLength={fInput.rules.split("max:")[1]}
            onChange={handleInputCHange}
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
            value={formDataInput.country}
            required={fInput.rules.split("|")[0]}
            minLength={fInput.rules.split("min:")[1].charAt(0)}
            maxLength={fInput.rules.split("max:")[1]}
            onChange={handleInputCHange}
            className="select-field"
          >
            <option
              value=""
              disabled
              // selected
              // hidden
              className="select-placeholder"
            >
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
    setLoading(true);

    if (!formDataInput.person_name || !formDataInput.country) {
      setFieldsValidate("Please fill out the form fields!");
    } else {
      fetch(FORM_DATA_POST, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: { form_inputs: { formDataInput } } }),
        // body: JSON.stringify({ data: { formDataInput } }),
      })
        .then((response) => {
          console.log(response);
          if (response.ok) {
            setErrors(null);
            setLoading(false);
            setFormPost(true);
            setFormDataInputs({
              ...formDataInput,
              person_name: "",
              country: "",
            });
            return response.json();
          } else if (!response.ok) {
            setErrors("Something went wrong!");
            return response.text().then((text) => {
              throw new Error(text);
            });
          }
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    }
  };

  return (
    <div>
      {!formLoaded ? (
        <h1>Form could not be loaded!</h1>
      ) : (
        <div className="form-group-container">
          {fieldsValidate ? (
            <h2 className="form-validation">{fieldsValidate}</h2>
          ) : null}

          {errors ? <h2 className="form-validation">{errors}</h2> : null}

          {formPost ? (
            <h2 className="form-sent">Form sent successfully.</h2>
          ) : null}

          <form onSubmit={handleSubmit}>
            {formInputs}
            <button
              disabled={loading ? true : false}
              className="button-5"
              type="submit"
            >
              Save
            </button>
            {loading ? (
              <img src={loadingGif} alt="" className="loading-gif" />
            ) : (
              ""
            )}
          </form>
        </div>
      )}
    </div>
  );
}

export default FormComponent;
