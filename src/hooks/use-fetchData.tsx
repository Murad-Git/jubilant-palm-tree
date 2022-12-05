import { useEffect, useState } from 'react';
import { proxyImg, proxyPeople } from '../utils/config';

interface IData {
  person: {
    name: string;
    birth_year: string;
    eye_color: string;
    url: string;
    vehicles: string[];
    created: string;
  } | null;
  image: string;
}

const useFetchData = (id: number) => {
  const [data, setData] = useState<IData>({
    person: null,
    image: proxyImg,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setError('');
      setLoading(true);
      try {
        const responsePeople = await fetch(`${proxyPeople}${id}`);
        if (!responsePeople) return setError('No data was found');
        const peopleData = await responsePeople.json();
        const image = proxyImg;
        setData((prev) => ({
          ...prev,
          person: peopleData,
          image,
        }));
      } catch (error) {
        if (error instanceof Error) setError(error.message);
        else setError('Error accured in getting data');
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);
  return {
    data,
    loading,
    error,
  };
};

export default useFetchData;
