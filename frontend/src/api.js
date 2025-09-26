import axios from "axios";
const URL = "http://localhost:3000"

//Requests
export async function getRequests() {
    const response = await axios.get(`${URL}/requests`)
    if(response.status ===200){
        return response.data
    } else {
        return 'data not found'
    }
}
export async function getSingleRequest(id) {
    const response = await axios.get(`${URL}/requests/${id}`)
    if(response.status ===200){
        return response.data
    } else {
        return 'data not found'
    }
}
export async function createRequest(req) {
    const response = await axios.post(`${URL}/requests`, req)
        return response
}
export async function updateRequest(id, req) {
    const response = await axios.put(`${URL}/requests/${id}`, req)
        return response
}


export async function deleteRequest(id) {
        const response = await axios.delete(`${URL}/requests/${id}`)
        return response
}

//  Points

export async function getPoints() {
    const response = await axios.get(`${URL}/points`)
    if(response.status ===200){
        return response.data
    } else {
        return 'data not found'
    }
}
export async function getSinglePoint(id) {
    const response = await axios.get(`${URL}/points/${id}`)
    if(response.status ===200){
        return response.data
    } else {
        return 'data not found'
    }
}
export async function createPoints(req) {
    const response = await axios.post(`${URL}/points`, req)
        return response
}
export async function updatePoints(id, req) {
    const response = await axios.put(`${URL}/points/${id}`, req)
        return response
}


export async function deletePoints(id) {
        const response = await axios.delete(`${URL}/points/${id}`)
        return response
}