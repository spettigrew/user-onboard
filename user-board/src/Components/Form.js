import React from 'react'

const Form = (props) => {
    const {formSubmit, form, handleChanges, errors, validated}= props;

    return (
        <div>
            <form onSubmit={formSubmit}>
                <label htmlFor={'name'}>
                    <input
                        id={'name'}
                        type={'text'}
                        name={'name'}
                        value={form.name}
                        placeholder={'Name'}
                        onChange={handleChanges}
                    />
                    {/* if there is an error, it will display within the label */}
                    {errors.name.length > 0 && <p>{errors.name}</p>}
                </label>
                {/* htmlFor points to an id for one specific item */}
                <label htmlFor={'password'}>
                    <input
                        id={'password'}
                        type={'password'}
                        name={'password'}
                        value={form.password}
                        placeholder={"Password"}
                        onChange={handleChanges}
                    />
                    {errors.password.length > 0 && <p>{errors.password}</p>}
                </label>
                <label htmlFor={'email'}>
                    <input
                        id={'email'}
                        type={'text'}
                        name={'email'}
                        value={form.email}
                        placeholder={'Email'}
                        onChange={handleChanges}
                    />
                    {errors.email.length > 0 && <p>{errors.email}</p>}
                </label>
                <label
                    htmlFor={'terms'}>Agree to terms
                <input
                    id={'terms'}
                    type={'checkbox'}
                    name={'terms'}
                    checked={form.terms}
                    onChange={handleChanges}
                />
                    {errors.terms.length > 0 && <p>{errors.terms}</p>}
                </label>
                <button disabled={!validated} type={'submit'}>Submit</button>
            </form>

        </div>
    )
}

export default Form
