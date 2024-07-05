import React, { useEffect, useState } from 'react';
import axiosApi from '../../axiosApi';

interface Page {
  title: string;
  content: string;
}

const Admin = () => {
  const [pages, setPages] = useState<string[]>([]);
  const [selectedPage, setSelectedPage] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    axiosApi.get<{ [key: string]: Page }>('pages.json')
      .then(response => {
        const keys = Object.keys(response.data);
        setPages(keys);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSelectPage = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const pageName = event.target.value;
    setSelectedPage(pageName);
    const response = await axiosApi.get<Page>(`pages/${pageName}.json`);
    setTitle(response.data.title);
    setContent(response.data.content);
  };

  const handleSave = async () => {
    await axiosApi.put(`pages/${selectedPage}.json`, { title, content });
    window.location.href = `/pages/${selectedPage}`;
  };

  return (
    <div className='container'>
      <select className="w-25 form-select form-select-lg mb-3" value={selectedPage} onChange={handleSelectPage}>
        <option value=''>Select page</option>
        {pages.map(page => (
          <option key={page} value={page}>{page}</option>
        ))}
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
        <button type="button" onClick={handleSave} className='btn btn-outline-secondary'>Save</button>
      </form>
    </div>
  );
};

export default Admin;
