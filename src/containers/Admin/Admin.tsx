import React, { useState } from 'react';
import axiosApi from '../../axiosApi';

const Admin = () => {
  const [pages, setPages] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSelectPage = (event) => {
    setPages(event.target.value);
    axiosApi.get(`pages/${event.target.value}.json`)
      .then(response => {
        setTitle(response.data.title);
        setContent(response.data.content);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleSave = () => {
    axiosApi.put(`pages/${pages}.json`, {title, content})
      .then(response => {
      console.log(response);
    })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className='container'>
      <select className="w-25 form-select form-select-lg mb-3" value={pages} onChange={handleSelectPage}>
        <option value='/'>Select page</option>
        <option value="about">About</option>
        <option value='cardsPages'>CardsPages</option>
        <option value='contacts'>Contacts</option>
        <option value='division'>Division</option>
        <option value='slides'>Slides</option>
      </select>
      <form>
        <div>
          <label className='text-white pb-4'>
          Title:
          <input type="text"
                 value={title}
                 onChange={(event) => setTitle(event.target.value)} />
        </label>
        </div>
        <div>
          <label className='text-white pb-3'>
          Content:
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)} />
        </label>
        </div>


        <button onClick={handleSave} className='btn btn-outline-secondary'>Save</button>
      </form>
    </div>
  );
};

export default Admin;