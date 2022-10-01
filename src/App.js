import "./App.css";
import { useEffect, useState } from "react";
import { DYNAMIC_FORM_DATA } from "./constants/constants";

import FormComponent from "./components/FormComponent";

function App() {
  const [dynamicForm, setDynamicForm] = useState([]);
  const [formLoaded, setFormLoaded] = useState(true);

  //Rendering form inputs from API endpoint.
  useEffect(() => {
    fetch(DYNAMIC_FORM_DATA)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setFormLoaded(false);
        }
      })
      .then((res) => {
        setDynamicForm(res.data.attributes.config);
      });
  }, []);

  //Then we pass the form data as props to FormComponent 
  return (
    <div className="form-container">
      <FormComponent dynamicForm={dynamicForm} formLoaded={formLoaded} />
    </div>
  );
}

export default App;
