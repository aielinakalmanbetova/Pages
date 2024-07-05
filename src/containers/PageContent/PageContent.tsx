import React, {useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosApi from '../../axiosApi';

const PageContent = () => {
  const {pageName} = useParams();
  const [pages, setPages] = useState({});

  useEffect(() => {
    axiosApi.get(`pages/${pageName}.json`)
      .then(response => {
        setPages(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [pageName]);


  return (
    <div className='container'>
      <h1 className='text-white'>{pages.title}</h1>
      <p className='text-white'>{pages.content}</p>
    </div>
  );
};

export default PageContent;