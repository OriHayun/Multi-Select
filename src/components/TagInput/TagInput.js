import React, { useEffect, useRef } from "react";
import './TagInput.scss';
import { RiArrowDownSFill } from "@react-icons/all-files/ri/RiArrowDownSFill";
import { RiArrowUpSFill } from "@react-icons/all-files/ri/RiArrowUpSFill";
import { BsPlus } from "@react-icons/all-files/bs/BsPlus";
import { ValidKeyCode } from './ValidKeyCode'

const TagInput = ({
    tags,
    removeTag,
    onChange,
    showSuggestions,
    setShowSuggestions,
    input,
    onCleaerIconClick,
    onKeyDown,
    onArrowDownClick }) => {

    const inputRef = useRef(null);
    const keyCode = ValidKeyCode;

    useEffect(() => {
        inputRef.current.focus()
    }, [onChange])

    return (
        <div className="tags-input"
        >
            <ul id="tags">
                {tags.map((tag) => (
                    <li key={tag.value} className="tag">
                        <span className='tag-title'>{tag.label}</span>
                        <span className='tag-close-icon'
                            onClick={() => removeTag(tag.value)}
                        >
                            x
                        </span>
                    </li>
                ))}
            </ul>
            <input
                ref={inputRef}
                type="text"
                onChange={onChange}
                placeholder="Search"
                value={input}
                onKeyDown={(e) => Object.values(keyCode).includes(e.keyCode) && onKeyDown(e)}
            />
            <span className="iconWrapper">
                {input !== "" ?
                    <>
                        <BsPlus className="cleaerInputIcon" onClick={onCleaerIconClick} />
                        <div className="verticalBar"></div>
                    </>
                    : null}
                {showSuggestions ?
                    <RiArrowUpSFill
                        className="arrowIcon"
                        onClick={() => { setShowSuggestions(!showSuggestions) }} />
                    : <RiArrowDownSFill
                        className="arrowIcon"
                        onClick={onArrowDownClick} />}
            </span>
        </div>
    )
}

export default TagInput;