
//const axios = require('axios');
const getToken = () => localStorage.getItem('token');

const baseUrl = 'http://localhost:3000/'

const register = (newUser) => {
    return fetch(baseUrl + "user/register", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newUser),
    }).then(handleResponse)
}

const login = (user) => {
    return fetch(baseUrl + "user/", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user),
    }).then(handleResponse)
}

const getFolderContent = (path) => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
    };
    return fetch(baseUrl + "file/dir-list/" + path,{
        method: 'GET',
        headers,
    }).then(handleResponse)   
}

const addFolder = (path) => {
    
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
    };
    return fetch(`${baseUrl}file/add-folder`, {
        method: 'POST',
        headers,
        body: JSON.stringify({path})
    }).then(handleResponse)
}

const deleteItem = (path) => {
    
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
    };
    return fetch(baseUrl + "file/delete-item/" +  path, {
        method: 'DELETE',
        headers,
    }).then(handleResponse)
}

const uploadFile = (path, formData) => {
    
    const headers = {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getToken()}`
    }
    const url = baseUrl + "file/upload-file/" + path;
    
    return fetch(url, {
        method: 'POST',
        body: formData,
        //body: JSON.stringify(formData),
        headers
    }).then(handleResponse)
}

const handleResponse = (response) => {
    if (!response.ok) {
        throw response
    }
    return response.json();
};

export default { login, register, getFolderContent, addFolder, deleteItem, uploadFile }
