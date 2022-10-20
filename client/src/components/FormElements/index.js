import React from "react";

const FormElement = (props) => {
    return <form className={props.className} method={"post"} onSubmit={props.handleSubmit}>{props.children}</form>
}

const LegendElement = ({text}) => {
    return <legend>{text}</legend>
}

const FieldsetElement = (props) => {
    return <fieldset className="form-fieldset">{props.children}</fieldset>
}

const LabelElement = ({forVal, text}) => {
    return <label htmlFor={forVal}>{text}</label>
}

const InputElement = ({ id, name, value, type, handleChange, text, required }) => {
    return (
        <input
            className="form-control"
            type={type}
            id={id}
            name={name}
            // defaultValue={value}
            placeholder={text}
            onChange={(e) => handleChange(e, name)}
            required={required}
        />
    )
}

const SubmitButton = ({text}) => <button type="submit">{text}</button>

export {
    FormElement,
    LegendElement,
    FieldsetElement,
    LabelElement,
    InputElement,
    SubmitButton
}