import "./App.css";
import { useEffect, useState } from "react";
import { DYNAMIC_FORM_DATA } from "./constants/constants";

import FormComponent from "./components/FormComponent";

function App() {
  const [dynamicForm, setDynamicForm] = useState([]);
  const [formLoaded, setFormLoaded] = useState(true);

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
        console.log(res.data.attributes.config);
        setDynamicForm(res.data.attributes.config);
      });
  }, []);

  return (
    <div className="form-container">
      <FormComponent dynamicForm={dynamicForm} formLoaded={formLoaded} />
    </div>
  );
}

export default App;
