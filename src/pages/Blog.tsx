import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Blog, BlogContractData } from '../@types/interfaces';
import PageLayout from '../layouts/PageLayout';

const BlogPage = () => {
  const { blogs } = useAppContext();
  const [data, setData] = useState<(Blog & BlogContractData) | undefined>();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setData(blogs.data.find((blog) => blog.storageHash === id));
  }, [id, blogs]);

  return (
    <PageLayout>
      <Header />
      <main className='pb-4 pt-8 mx-auto' style={{ maxWidth: '720px' }}>
        <div
          className='flex items-center opacity-40 cursor-pointer hover:opacity-90 transition-all'
          onClick={() => navigate(-1)}
        >
          <ArrowBackIosNewIcon />
          <span>Back</span>
        </div>
        <h1 className='text-3xl font-bold mt-4'>{data?.title}</h1>
        <p className='mt-1 text-sm text-gray-600 mb-6'>{data?.publishDate}</p>
        {data?.coverImage ? (
          <div className='bg-gray-200 mb-6'>
            <img
              src={data?.coverImage?.toString()}
              alt='cover of the blog'
              className='w-full h-full rounded'
            />
          </div>
        ) : null}
        <div
          // TODO: Safegaurd against XSS
          dangerouslySetInnerHTML={{
            __html: `${data?.content}`,
          }}
        ></div>
      </main>
    </PageLayout>
  );
};

export default BlogPage;
