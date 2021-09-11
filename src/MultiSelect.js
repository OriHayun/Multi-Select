import React, { useEffect, useState } from "react";
import "./MultiSelect.scss";
import TagInput from './components/TagInput/TagInput';
import MultiSelectSuggestions from './components/MultiSelectSuggestions/MultiSelectSuggestions';

export default function MultiSelect({ options, selectedOptions, onChange }) {

  const [tags, setTags] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [input, setInput] = useState("");
  const [maxValue, setMaxValue] = useState(Math.max.apply(Math, options.map(function (o) { return o.value; })));
  const [dynamicOptions, setDynamicOptions] = useState(options)
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);


  useEffect(() => {
    const initialMax = getInitialMaxValue()
    if (maxValue !== initialMax) {
      const newTag = filteredSuggestions[filteredSuggestions.length - 1]
      addTags(newTag.value)
    }
  }, [maxValue])

  const getInitialMaxValue = () => Math.max.apply(Math, options.map(function (o) { return o.value; }))

  const addTags = (value) => {
    if (value !== "") {
      const selectedObject = filteredSuggestions.filter((suggestion) => value.includes(suggestion.value))
      const selectedValues = selectedObject.map((selected) => selected.value).toString()

      removeOptionFromfFilteredSuggestions(selectedValues.split(','));
      setTags([...tags, ...selectedObject]);
      setActiveSuggestionIndex(0);
      onChange([...selectedOptions, selectedValues]);
    }
  };

  const removeTag = value => {
    const option = tags.find((tag) => tag.value == value)
    setFilteredSuggestions([...filteredSuggestions, option])
    setDynamicOptions([...dynamicOptions, option])
    setTags([...tags.filter((tag) => tag.value !== value)]);
    onChange([...selectedOptions.filter((selectedOption) => selectedOption.value === value)]);
  };

  const onInputChange = (e) => {
    const suggestions = dynamicOptions;
    const userInput = e.target.value;
    const realTimeFilteredSuggestions = suggestions.filter(
      (suggestion) => suggestion.label.toLowerCase().indexOf(userInput.toLowerCase()) > -1);

    setInput(userInput);
    setFilteredSuggestions(realTimeFilteredSuggestions);
    setActiveSuggestionIndex(0);
    setShowSuggestions(e.target.value === '' ? false : true);
  };

  const removeOptionFromfFilteredSuggestions = (selectedValues) => {
    setFilteredSuggestions(filteredSuggestions.filter((filterSuggest) => !selectedValues.some(value => value === filterSuggest.value)));
    setDynamicOptions(dynamicOptions.filter((option) => !selectedValues.some(value => value === option.value)))
  }

  const createNewTag = () => {
    const isTagExsistes = checkIfTagExsistes()
    if (isTagExsistes) {
      return;
    }

    const newTag = {
      value: `${maxValue + 1}`,
      label: input
    }
    setFilteredSuggestions([...filteredSuggestions, newTag])
    setDynamicOptions([...dynamicOptions, newTag])
    setMaxValue(maxValue + 1)
  }

  const checkIfTagExsistes = () => {
    return dynamicOptions.some((dynamicOption) => dynamicOption.label === input)
  }

  const onCleaerIconClick = () => {
    setInput("");
    setShowSuggestions(false);
  }

  const onKeyDown = (e) => {
    if (e.keyCode === 8 && input.length === 0 && tags.length) {
      const lastTag = tags.slice(-1)
      removeTag(lastTag[0].value)
    }

    if (!showSuggestions) {
      return;
    }

    if (e.keyCode === 13) {
      addTags(filteredSuggestions[activeSuggestionIndex].value)
    } else if (e.keyCode === 38 && activeSuggestionIndex > 0) {
      setActiveSuggestionIndex(activeSuggestionIndex - 1)
    } else if (e.keyCode === 40 && activeSuggestionIndex <= filteredSuggestions.length - 2) {
      setActiveSuggestionIndex(activeSuggestionIndex + 1)
    }
  }

  const onArrowDownClick = () => {
    if (input === "") {
      setFilteredSuggestions(options)
    }
    setShowSuggestions(!showSuggestions)
  }

  return (
    <>
      <TagInput
        tags={tags}
        removeTag={removeTag}
        onChange={onInputChange}
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
        input={input}
        onCleaerIconClick={onCleaerIconClick}
        onKeyDown={(e) => onKeyDown(e)}
        onArrowDownClick={onArrowDownClick}
      />
      {showSuggestions &&
        <MultiSelectSuggestions
          selectedOptions={selectedOptions}
          filteredSuggestions={filteredSuggestions}
          onSelect={(value) => value[0] !== "createNewTag" && addTags(value)}
          createNewTag={createNewTag}
          activeSuggestionIndex={activeSuggestionIndex}
        />}
    </>
  );
}
