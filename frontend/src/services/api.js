import axios from "axios";

// const API_URI = "https://pms-hackout23.onrender.com";
const API_URI = "http://localhost:8000";

export const Login = async (data) => {
  try {
    const response = await axios.post(`${API_URI}/login`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log("Error while login", error.message);
  }
};

export const allocateResources = async (event, data) => {
  event.preventDefault();
  const reqData = {
    rCount: data.redCount,
    yCount: data.yellowCount,
    gCount: data.greenCount,
    log: data.longitude,
    lat: data.latitude,
  };
  try {
    const response = await axios.post(
      `${API_URI}/hostpitalAllocation`,
      reqData,
      {
        withCredentials: true,
      }
    );

    console.log(response);
    const response2 = await axios.patch(`${API_URI}/update/hospitals`, { withCredentials: true });
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const allocateLabs = async (event, data) => {
  event.preventDefault();
  const reqData = {
    rCount: data.redCount,
    yCount: data.yellowCount,
    gCount: data.greenCount,
    log: data.longitude,
    lat: data.latitude,
  };

  try {
    const response = await axios.post(`${API_URI}/labsAllocation`, reqData, {
      withCredentials: true,
    });
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}

export const getNearestHospitals = async (event, data) => {
  event.preventDefault();
  const reqData = {
    log: data.longitude,
    lat: data.latitude,
  };

  const response = await axios.post(`${API_URI}/get/nearHospitals`, reqData, { withCredentials: true })

  return response.data.data;
}

export const getMedicalStores = async (event, data) => {
  event.preventDefault();
  const reqData = {
    medicine: data.name,
    count: data.count,
    log: data.longitude,
    lat: data.latitude,
  }
  try {
    const response = await axios.post(`${API_URI}/medicineAllocation`, reqData, { withCredentials: true });
    // console.log(response);
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}


export const getAllHospitals = async () => {
  try {
    const response = await axios.get(`${API_URI}/get/hospitals`);
    return response.data;
  } catch (error) {
    console.log('Error while getting list', error.message);
  }
}

export const addMedicalCenter = async (data) => {
  try {
    console.log(data);
    const response = await axios.post(`${API_URI}/add/medical`, data, { withCredentials: true });
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.message }
  }
}

export const addLaboratory = async (data) => {
  try {
    const response = await axios.post(`${API_URI}/add/lab`, data, { withCredentials: true });
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}

export const addHospitals = async (data) => {
  try {
    console.log(data);
    const response = await axios.post(`${API_URI}/add/hospital`, data, { withCredentials: true });
    console.log(response);
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}

export const graph1 = async () => {
  try {
    const response = await axios.get(`${API_URI}/get/topHospitals`);
    return response.data;
  } catch (error) {
    console.log('Error while getting list', error.message);
  }
}

export const graph2 = async () => {
  try {
    const response = await axios.get(`${API_URI}/get/getPatient`);
    return response.data;
  } catch (error) {
    console.log('Error while getting list', error.message);
  }
}