import { FORM_DATA_POST } from "../constants/constants";

function formPost(fdata) {
  console.log(fdata);
  console.log(JSON.stringify(fdata));
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
    })
    .catch((error) => {
      console.log(error);
    });
}

export default formPost;
