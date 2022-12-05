import React, { useEffect, useRef, useState } from 'react';
import useValidate from '../../hooks/use-validate';
import Button from '../ui/Button';
import Input from '../ui/Input';

const Reg = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formStatus, setFormStatus] = useState('Submit');
  const [formValid, setFormValid] = useState(false);
  const [errorText, setErrorText] = useState<null | boolean>(null);

  //refs
  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const telephoneRef = useRef<HTMLTextAreaElement>(null);

  //states
  const [loginVal, setLoginVal] = useState('');
  const [passwordVal, setPasswordVal] = useState('');
  const [emailVal, setEmailVal] = useState('');
  const [telephoneVal, setTelephoneVal] = useState(0);
  const [regulaminValid, setRegulaminValid] = useState<any>(null);

  //checking if values are valid
  const { loginValid, passwordValid, emailValid, telephoneValid } = useValidate(
    {
      login: loginVal,
      password: passwordVal,
      email: emailVal,
      telephone: telephoneVal,
    }
  );
  //checking form validity every 500ms
  useEffect(() => {
    const identifier = setTimeout(() => {
      const formValidity =
        loginValid &&
        passwordValid &&
        emailValid &&
        telephoneValid &&
        regulaminValid
          ? true
          : false;
      setFormValid(formValidity);
    }, 500);

    return () => {
      console.log('cleanup');
      clearTimeout(identifier);
    };
  }, [loginValid, passwordValid, emailValid, telephoneValid, regulaminValid]);

  // submit form
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formValid) {
      setFormStatus('Sending...');
      console.log(`validForm`);
      console.log(formRef.current);
      console.log(e);
      const data = {
        login: loginVal,
        password: passwordVal,
        email: emailVal,
        telephone: telephoneVal,
      };
      const response = await fetch('https://example', {
        method: 'POST',
        headers: {
          Accent: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      response.json().then((res) => console.log('request complete: ', res));

      clearFormHandler();
    }
    !loginValid && loginRef.current?.focus();
    !passwordValid && passwordRef.current?.focus();
    !emailValid && emailRef.current?.focus();
    !telephoneValid && telephoneRef.current?.focus();
    setRegulaminValid(false);
    setErrorText(true);
  };
  const clearFormHandler = () => {
    formRef.current?.reset();
    setLoginVal('');
    setPasswordVal('');
    setEmailVal('');
    setTelephoneVal(0);
    setRegulaminValid(null);
    setFormStatus('Submit');
    setErrorText(false);
  };
  console.log(formRef);
  return (
    <div className='h-screen bg-gradient-to-r from-blue-500'>
      <h3 className='font-bold text-lg text-end pt-10 mr-5 uppercase'>
        formularz rejestracyjny
      </h3>
      <form
        onSubmit={submitForm}
        className='flex flex-col items-center space-y-6 text-lg font-semibold form'
        ref={formRef}
      >
        <Input
          type='text'
          name='Login'
          id='login'
          valid={loginValid}
          setState={setLoginVal}
          reference={loginRef}
        />
        <Input
          type='password'
          name='Hasło'
          id='password'
          valid={passwordValid}
          setState={setPasswordVal}
          reference={passwordRef}
        />
        <Input
          type='email'
          name='E-mail'
          id='email'
          valid={emailValid}
          setState={setEmailVal}
          reference={emailRef}
        />
        <Input
          type='tel'
          name='Numer telefonu'
          id='telephone'
          valid={telephoneValid}
          setState={setTelephoneVal}
          reference={telephoneRef}
        />
        <div className='flex items-center justify-center'>
          <input
            type='checkbox'
            name='regulamin'
            id='regulamin'
            className={`${
              regulaminValid === false ? 'invalid-reg' : ''
            } mr-3 scale-150`}
            onChange={(e) => setRegulaminValid(e.target.checked)}
          />
          <label className='whitespace-nowrap' htmlFor='regulamin'>
            Akceptuję regulamin
          </label>
        </div>
        <Button aria-disabled={formValid} className='btn'>
          {formStatus}
        </Button>
        {errorText && (
          <p className='font-semibold text-red-500'>
            Please fill form correctly
          </p>
        )}
      </form>
    </div>
  );
};
export default Reg;
