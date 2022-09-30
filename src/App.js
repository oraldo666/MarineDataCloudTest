import "./App.css";
import { useEffect, useState } from "react";
import { DYNAMIC_FORM_DATA } from "./constants/constants";

import FormComponent from "./components/FormComponent";

function App() {
  const [dynamicForm, setDynamicForm] = useState([]);

  useEffect(() => {
    fetch(DYNAMIC_FORM_DATA)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data.attributes.config);
        setDynamicForm(res.data.attributes.config);
      });
  }, []);

  return (
    <div className="form-container">
      <FormComponent dynamicForm={dynamicForm} />
    </div>
  );
}

export default App;
