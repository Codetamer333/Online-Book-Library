

/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisherYear, setPublisherYear] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublisherYear(response.data.publisherYear);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publisherYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:3000/books/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((err) => {
        setLoading(false);
        alert('Something went wrong');
        console.log(err);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Id</span>
            <span>{book._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Title</span>
            {isEditing ? (
              <input
                type="text"
                className="border-2 border-gray-500 px-4 py-2 w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            ) : (
              <span>{title}</span>
            )}
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Author</span>
            {isEditing ? (
              <input
                type="text"
                className="border-2 border-gray-500 px-4 py-2 w-full"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            ) : (
              <span>{author}</span>
            )}
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Publish Year</span>
            {isEditing ? (
              <input
                type="text"
                className="border-2 border-gray-500 px-4 py-2 w-full"
                value={publisherYear}
                onChange={(e) => setPublisherYear(e.target.value)}
              />
            ) : (
              <span>{publisherYear}</span>
            )}
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Create Time</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Last Update Time</span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
          {isEditing ? (
            <button className="p-2 bg-sky-300 m-8" onClick={handleSaveBook}>
              Save
            </button>
          ) : (
            <button
              className="p-2 bg-sky-300 m-8"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ShowBook;
