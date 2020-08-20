import axios from "axios";
import { Nutrition } from "../../types/types";

const API_URL = "http://localhost:3000";

axios.create({
    headers: {
        get: {
        "Content-Type": "application/json",
        Accept: "application/json",
        },
        post: {
        // "content-type": "multipart/form-data",
        "Content-Type": "application/json",
        Accept: "application/json",
        },
    },
});

export function getOnebyID(id: string) {
    return new Promise((resolve, reject) => {
        axios
        .get(`${API_URL}/get/${id}`)
        .then((response) => {
            response.status === 200 ? resolve() : reject()
        })
        .catch((err) => {
            reject()    
        });
    });
}

export function getAll() {
    return new Promise((resolve, reject) => {
        axios
        .get(`${API_URL}/all`)
        .then((response) => {
            response.status === 200 ? resolve(response.data) : reject();
            return response.data;
        })
        .catch((err) => {
            reject()    
        });
    });
}

export function create(nutrition: Nutrition) {
    return new Promise((resolve, reject) => {
        console.log(`${API_URL}/save`, nutrition);
        axios
        .post(`${API_URL}/save`, nutrition)
        .then((response) => {
            response.status === 200 ? resolve({success: "created successfully"}) : reject({error: "creating failed"});
        })
        .catch((err) => {
            reject()    
        });
    });
}

export function deletebyID(id: string) {
    return new Promise((resolve, reject) => {
        axios
        .get(`${API_URL}/delete/${id}`)
        .then((response) => {
            response.status === 200 ? resolve({success: "success!!!"}) : reject({error: "error!!!"})
        })
        .catch((err) => {
            reject()    
        });
    });
}

export function reset() {
    return new Promise((resolve, reject) => {
        axios
        .get(`${API_URL}/reset`)
        .then((response) => {
            response.status === 200 ? resolve({success: "success!!!"}) : reject({error: "error!!!"})
        })
        .catch((err) => {
            reject()    
        });
    });
}