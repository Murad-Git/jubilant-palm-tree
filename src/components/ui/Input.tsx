interface Props {
  type: string;
  name: string;
  id: string;
  valid: boolean | null;
  setState: (prev: any) => void;
  reference:
    | React.RefObject<HTMLInputElement>
    | React.RefObject<HTMLTextAreaElement>;
}

const Input = ({ type, name, id, valid, setState, reference }: Props) => {
  return (
    <>
      <label htmlFor={id}>{name}:</label>
      <input
        className={valid === false ? 'invalid' : 'border-b-black '}
        placeholder={valid ? `${name}` : `Please enter ${name}`}
        type={type}
        name={id}
        id={id}
        onBlur={(e) => setState(e.target.value)}
        ref={reference as React.LegacyRef<HTMLInputElement> | undefined}
      />
    </>
  );
};

export default Input;
