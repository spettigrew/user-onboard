import { useState } from 'react';
import * yup from 'yup';
import './App.css';

function App() {
  const validationSchema = yup.object().shape({
    name: yup.string().required('Please include name'),
    email: yup.string()
      .email('Please include valid email')
      .required('Email is required'),
    password: yup.string().required('Password is required'),
    terms: yup.boolean().oneOf([true], 'Agree to term before proceeding')
  })

  useEffect(() => {
    validationSchema.isValid(form)
    .then((valid) => {
      setValidated(valid)
    })
  }, [form])
  
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    terms: false,
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    terms: '',
  })

  const validation = (e) => {
    // set value to the target.value if not checkbox and target.checked if checkbox
    let value = 
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
      // yup is ansync
      yup
      // yup.reach passing in the validationSchema to check against the event.target
        .reach(validationSchema, e.target.name)
        // call validate on the value we set above
        .validate(value)
        // if we pass validation
        .then(valid => {
          // set the errors to stay empty string because no errors
          setErrors({
            ...errors, 
            [e.target.name]: '',
          })
        })
        // if errors
        .catch(err => {
          console.log({err});
          // set the error state to the error message we get back
          setErrors({
            ...errors, 
            [e.target.name]: err.errors[0]
          })
        })
  }

  const handleChanges = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  };

  const formSubmit = () => {

  };

  console.log({ form });

  return (
    <div className="App">
      <form onSubmit={formSubmit}>
        <input
          type={'text'}
          name={'name'}
          value={form.name}
          placeholder={'Name'}
          onChange={handleChanges}
        />
        <input 
          type={'password'}
          name={'password'}
          value={form.password}
          placeholder={"Password"}
          onChange={handleChanges}
          />
        <input
          type={'text'}
          name={'email'}
          value={form.email}
          placeholder={'Email'}
          onChange={handleChanges}
        />
        <label
          for={'terms'}>Agree to terms</label>
        <input
          id={'terms'}
          type={'checkbox'}
          name={'terms'}
          checked={form.terms}
          onChange={handleChanges}
        />
        <button disabled={!validated} type={'submit'}>Submit</button>
      </form>

    </div>
  );
}

export default App;
