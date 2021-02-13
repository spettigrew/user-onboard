import { useState, useEffect } from 'react';
import * as yup from 'yup';
import './App.css';
import Form from './Components/Form';
import axios from 'axios';

function App() {
  const validationSchema = yup.object().shape({
    name: yup.string().required('Please include name'),
    email: yup.string()
      .email('Please include valid email')
      .required('Email is required'),
    password: yup.string().required('Password is required'),
    // expecting true as one of our parameters, otherwise return false
    terms: yup.boolean().oneOf([true], 'Agree to term before proceeding')
  })

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
      // yup is async
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
      
      const handlePost = (form) => {
        axios.post('https://reqres.in/api/users', form)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
      }

      useEffect(() => {
        validationSchema.isValid(form)
          .then((valid) => {
            setValidated(valid)
          })
      }, [form])

      const formSubmit = (e) => {
        e.preventDefault();
        handlePost(form); 
        setForm( {
          name: '',
          email: '',
          password: '',
          terms: false,
        })
      }

  const handleChanges = (e) => {
    e.persist()
    validation(e)
    let value = 
    e.target.type === "checkbox" ? e.target.checked : e.target.value;
    
    setForm({
      ...form,
      [e.target.name]: value
    })
  };


  return (
    <div className="App">
      <Form 
      formSubmit={formSubmit} 
      form={form}
      handleChanges={handleChanges}
      errors={errors}
      validated={validated}
      />
    </div>
  );
}

export default App;
