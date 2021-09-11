import React from 'react'
import './MultiSelectSuggestions.scss';

const MultiSelectSuggestions = ({
    filteredSuggestions,
    onSelect,
    selectedOptions,
    createNewTag,
    activeSuggestionIndex }) => {

    const active = {
        backgroundColor: "#777b80"
    }

    return (
        <select
            className="multiSelect"
            multiple
            onChange={(e) => {
                onSelect(
                    Array.from(e.target)
                        .filter((suggestions) => suggestions.selected)
                        .map((suggestions) => suggestions.value)
                );
            }}
            value={selectedOptions}
        >
            <option
                value="createNewTag"
                className="createNewTag"
                onClick={createNewTag}
            >
                + Create New Tag
            </option>
            {
                filteredSuggestions.map((suggestions) => (
                    <option
                        style={filteredSuggestions[activeSuggestionIndex] && filteredSuggestions[activeSuggestionIndex].value === suggestions.value
                            ? active
                            : null}
                        key={suggestions.value} value={suggestions.value}>
                        {suggestions.label}
                    </option>
                ))
            }
        </select >
    );
};

export default MultiSelectSuggestions;