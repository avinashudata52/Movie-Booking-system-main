import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { fetchMovieByIdAPI, updateMoviesAPI } from '../../../../../utility/api';

const EditMovie = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    genre: [],
    duration: '',
    description: '',
  });
  const navigate = useNavigate();

  const genres = [
    'Action',
    'Comedy',
    'Drama',
    'Horror',
    'Romance',
    'Sci-Fi',
    'Thriller',
    'Adventure',
    'Animation',
    'Documentary',
  ];

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        genre: checked
          ? [...prevData.genre, value]
          : prevData.genre.filter((genre) => genre !== value),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const { data } = await fetchMovieByIdAPI(id);
        if (data.success) {
          setFormData({
            title: data.movie.title,
            genre: data.movie.genre,
            duration: data.movie.duration,
            description: data.movie.description,
          });
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error('Something went wrong');
      }
    };
    fetchMovie();
  }, [id]);

  const validateForm = () => {
    const { title, genre, duration, description } = formData;
    if (!title || !genre || !duration || !description) {
      toast.error('All fields are required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const { data } = await updateMoviesAPI(id, formData);
        if (data.success) {
          toast.success('Movie updated successfully');
          navigate('/admin/dashboard');
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error('Something went wrong');
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Movie</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter movie title"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block font-medium">Genre</label>
          <div className="grid grid-cols-5 gap-2 bg-zinc-600/20 rounded-md p-2">
            {genres.map((genre) => (
              <div key={genre} className="">
                <label className={`grid items-center grid-cols-3 py-1.5 rounded-md bg-zinc-700/30 ${formData.genre.includes(genre) && 'bg-zinc-700/80'}`}>
                  <input
                    type="checkbox"
                    name="genre"
                    value={genre}
                    checked={formData.genre.includes(genre)}
                    onChange={handleChange}
                    className="form-checkbox"
                  />
                  <span className="ml-2 col-span-2">{genre}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Duration (in minutes)</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Enter movie duration in minutes"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter movie description"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
          Update Movie
        </button>
      </form>
    </div>
  );

};

export default EditMovie;
