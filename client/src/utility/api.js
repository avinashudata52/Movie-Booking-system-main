import axios from 'axios';

const api = axios.create({
  withCredentials: true,
});

const apiRequest = async (method, url, data, options) => {
  try {
    const response = await api({
      method,
      url,
      data,
      options
    });
    return response;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
};

export const adminLogin = async (userCredentials) => {
  return apiRequest('post', "/api/users/admin", userCredentials, { withCredentials: true });
};

export const loginAPI = async (userCredentials) => {
  return apiRequest('post', "/api/users/login", userCredentials, { withCredentials: true });
};

export const registerAPI = async (userCredentials) => {
  return apiRequest('post', "/api/users/register", userCredentials, { withCredentials: true });
};

export const getUserAPI = async () => {
  return apiRequest('get', "/api/users");
};

export const logoutAPI = async () => {
  return apiRequest('post', "/api/users/logout");
};

export const getUserIdAPI = async () => {
  return apiRequest('get', `/api/users/id`);
}




// for admin 

export const isAdminUser = async () => {
  return apiRequest('get', `/api/users/admin/verify`);
}


// all item get request 
export const fetchMoviesAPI = async () => {
  return apiRequest('get', `/api/movies`);
}

export const fetchScreensAPI = async () => {
  return apiRequest('get', `/api/screens`);
}

export const fetchFoodItemsAPI = async () => {
  return apiRequest('get', `/api/food-items`);
}


//individual item get request
export const fetchMovieByIdAPI = async (id) => {
  return apiRequest('get', `/api/movies/${id}`);
}

export const fetchScreenByIdAPI = async (id) => {
  return apiRequest('get', `/api/screens/${id}`);
}

export const fetchFoodItemByIdAPI = async (id) => {
  return apiRequest('get', `/api/food-items/${id}`);
}

//all post requests 
export const createMovieAPI = async (movieData) => {
  return apiRequest('post', `/api/movies`, movieData);
}

export const createScreenAPI = async (screenData) => {
  return apiRequest('post', `/api/screens`, screenData);
}

export const createFoodItemAPI = async (foodItemData) => {
  return apiRequest('post', `/api/food-items`, foodItemData);
}




//individual item put request
export const updateMoviesAPI = async (id, updatedMovies) => {
  return apiRequest('put', `/api/movies/${id}`, updatedMovies);
}

export const updateScreenAPI = async (id, updatedScreen) => {
  return apiRequest('put', `/api/screens/${id}`, updatedScreen);
}

export const updateFoodItemsAPI = async (id, updatedFoodItem) => {
  return apiRequest('put', `/api/food-items/${id}`, updatedFoodItem);
}


//individual item delete request
export const deleteByIdAPI = async (type, id) => {
  return apiRequest('delete', `/api/${type}/${id}`);
}







//booking system 

export const bookSeatsAPI = async (screenId, seats, price) => {
  return apiRequest('post', `/api/bookings`, {
    screenId,
    seats,
    price
  });
}
export default api;

// { headers: { Authorization: `Bearer ${token}}}