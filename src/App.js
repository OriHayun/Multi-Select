import React, { useState } from "react";
import categories from "./categories";
import MultiSelect from "./MultiSelect";
import "./App.scss";

export default function App() {
  const [selectedOptions, setSelectedOptions] = useState([]);

  function onChangeSelect(selectedOptions) {
    setSelectedOptions(selectedOptions);
  }

  return (
    <div className="App">
      <div className="Modal">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="FormGroup">
            <label>Categories</label>
            <MultiSelect
              onChange={onChangeSelect}
              options={categories}
              selectedOptions={selectedOptions}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
