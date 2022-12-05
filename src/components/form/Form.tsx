import { useState } from 'react';
import useFetchData from '../../hooks/use-fetchData';
import Button from '../ui/Button';

const Form = () => {
  const [candidateNo, setCandidateNo] = useState(1);
  const { data, loading, error } = useFetchData(candidateNo);
  if (!data || !data.person)
    return (
      <img
        className='candidate_svg'
        src='/images/spinning-circles.svg'
        alt='SVG'
      />
    );
  if (error) return <p>{error}</p>;

  const randomNo = Math.floor(Math.random() * 9 + 1);
  return (
    <div className='form_page h-screen bg-gradient-to-r from-cyan-500 to-blue-500'>
      <div className='flex justify-evenly items-center pt-6'>
        <h3 className='font-bold text-lg'>Murad Kos</h3>
        <Button className='btn'>formularz rejestracyjny</Button>
      </div>
      <div className='form flex flex-col items-center justify-center pt-10'>
        <div className='candidate bg-slate-300 space-y-5 w-[30rem] h-[40rem]'>
          <img
            src={`${
              loading ? '/images/spinning-circles.svg' : data.image + randomNo
            }`}
            alt='candidate'
            className='candidate_img'
          />
          <div className='info p-4'>
            <div className='candidate_info flex items-center justify-between'>
              <p className='name'>Name: {data.person.name}</p>
              <p>CheckBox</p>
            </div>
            <div className='candidate_add_info'>
              <p>Age: 33</p>
              <p>Eye color: {data.person.eye_color}</p>
            </div>
          </div>
        </div>
        <Button
          className='btn mt-6'
          onClick={() => setCandidateNo((prev) => prev + 1)}
        >
          next profiles
        </Button>
      </div>
    </div>
  );
};

export default Form;
