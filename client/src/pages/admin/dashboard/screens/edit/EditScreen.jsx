import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { fetchScreenByIdAPI, updateScreenAPI, fetchMoviesAPI } from '../../../../../utility/api';

const EditScreen = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    movie: '',
    totalSeats: 60,
    showtimes: { date: '', time: '', price: '' }
  });
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScreen = async () => {
      try {
        const { data } = await fetchScreenByIdAPI(id);
        if (data.success) {
          setFormData({
            name: data.screen.name,
            address: data.screen.address,
            movie: data.screen.movie._id,
            totalSeats: data.screen.totalSeats,
            seats: data.screen.seats,
            showtimes: data.screen.showtimes,
          });
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error('Something went wrong');
      }
    };
    fetchScreen();
  }, [id]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await fetchMoviesAPI();
        setMovies(data.movies);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch movies');
      }
    };

    fetchMovies();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    console.log(formData);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleShowtimeChange = (e) => {
    const { name, value } = e.target;
    const showtimes = [...formData.showtimes];
    showtimes[name] = value;
    setFormData((prevData) => ({
      ...prevData,
      showtimes,
    }));
  };

  const validateForm = () => {
    const { name, address, movie, totalSeats, showtimes } = formData;
    if (totalSeats > 200) {
      toast.error("Total Seats should not be more than 200.")
      return;
    }
    if (!name || !address || !movie || !totalSeats || !showtimes.date || !totalSeats) {
      toast.error('All fields are required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const { data } = await updateScreenAPI(id, formData);
        if (data.success) {
          toast.success('Screen updated successfully');
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Screen</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter screen name"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block font-medium">Address</label>
          <input
            type="text"
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter screen address"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block font-medium">Movie</label>
          <select
            name="movie"
            value={formData.movie}
            required
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Select a movie</option>
            {movies.map((movie) => (
              <option key={movie._id} value={movie._id}>
                {movie.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium">Showtimes</label>
          <div className="mt-2 space-y-2">
            <input
              type="date"
              name="date"
              required
              value={formatDate(formData.showtimes.date)}
              onChange={(e) => handleShowtimeChange(e)}
              className="block w-full border border-gray-300 rounded-md p-2"
            />
            <input
              type="time"
              name="time"
              required
              value={formData.showtimes.time}
              onChange={(e) => handleShowtimeChange(e)}
              className="block w-full border border-gray-300 rounded-md p-2"
            />
            <input
              type="number"
              name="price"
              required
              value={formData.showtimes.price}
              onChange={(e) => handleShowtimeChange(e)}
              placeholder="Enter price"
              className="block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>
        <div>
          <label className="block font-medium">Total Seats available</label>
          <div className="mt-2 space-y-2">
            <input
              type="number"
              name="totalSeats"
              required
              value={formData.totalSeats}
              onChange={(e) => handleChange(e)}
              placeholder="Enter total available seats"
              className="block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
          Update Screen
        </button>
      </form>
    </div>
  );
};

export default EditScreen;
