import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_DOMAIN;
const withCredentialsConfig = { withCredentials: true };

//* Función para manejar errores uniformemente
const handleApiError = (error) => {
    console.error(error);
    const errorStatus = error.response.status;
    if (errorStatus === 403 || errorStatus === 401) {
        window.location.href = "/login";
    }

    throw error;
};

//* Funciones de Sesión
export async function login(data) {
    try {
        const response = await axios.post(`${API_BASE_URL}/session`, data, withCredentialsConfig);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function logout() {
    try {
        const response = await axios.delete(`${API_BASE_URL}/session`);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
}

//* Funciones de Usuario
export async function register(data) {
    try {
        const response = await axios.post(`${API_BASE_URL}/user`, data, withCredentialsConfig);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function passwordResetToken(params = {}) {
    try {
        const response = await axios.get(`${API_BASE_URL}/user/passwordReset`, { params, ...withCredentialsConfig });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function passwordReset(data) {
    try {
        const response = await axios.patch(`${API_BASE_URL}/user/passwordReset`, data, withCredentialsConfig);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
}

//! Funciones de Insumos
export async function createItem(dataCollection, data) {
    try {
        const response = await axios.post(`${API_BASE_URL}/${dataCollection}`, data, withCredentialsConfig);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function getAllItems(dataCollection) {
    try {
        const response = await axios.get(`${API_BASE_URL}/${dataCollection}`, withCredentialsConfig);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function updateItem(dataCollection, data) {
    try {
        const response = await axios.put(`${API_BASE_URL}/${dataCollection}/${data._id}`, data, withCredentialsConfig);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function deleteItem(dataCollection, idItem) {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${dataCollection}/${idItem}`);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
}

//! Funcion de Gráficos
//* chartType indica el nombre del grafico espesifico que la api traera 
//* Existen las occiones=(generalGraphics, product, cattle, supplie).
export async function bringChartData(chartType) {  
    try {
        const response = await axios.get(`${API_BASE_URL}/chart/${chartType}`, withCredentialsConfig);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
}
