import { useEffect, useState } from 'react';

type InputProps = {
  login: string;
  password: string;
  email: string;
  telephone: number | null;
};

const useValidate = ({ ...rest }: InputProps) => {
  const { login, password, email, telephone } = { ...rest };

  const [loginValid, setLoginValid] = useState<boolean | null>(null);
  const [passwordValid, setPasswordValid] = useState<boolean | null>(null);
  const [emailValid, setEmailValid] = useState<boolean | null>(null);
  const [telephoneValid, setTelephoneValid] = useState<boolean | null>(null);

  //validation
  useEffect(() => {
    setLoginValid(() => (login ? login.trim().length > 5 : null));
    setPasswordValid(() => (password ? password.trim().length > 6 : null));
    setEmailValid(() =>
      email ? email.includes('@') && email.includes('.') : null
    );
    setTelephoneValid(() =>
      telephone ? telephone.toString().length === 9 : null
    );
  }, [login, password, email, telephone]);

  return {
    loginValid,
    passwordValid,
    emailValid,
    telephoneValid,
  };
};

export default useValidate;
