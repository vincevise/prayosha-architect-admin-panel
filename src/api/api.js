import axios from 'axios'

// const baseURL = 'https://prayosha-architect-backend.onrender.com/api'
const baseURL = 'https://dark-rose-brown-bear-yoke.cyclic.app/api'


// const baseURL = 'http://localhost:8000/api'

const axiosInstance = axios.create({
    baseURL:baseURL
})

export const createProject = async (data) => {
    const response = await axiosInstance.post('/v3/project',data)
    return response
}

export const getCategories = async() => {
    const response = await axiosInstance.get('/v3/category')
    // return response
    return response.data
}


 



export const deleteGarbageImages = async(data) => {

    let result = []
     
    const endpoints = data.map(x=> `${baseURL}/imagekit/delete-image/${x.fileId}`)
    // const endpoints = data.map(x=> `http://localhost:8000/api/imagekit/${x.fileId}`)

    console.log(endpoints)

    for (let index = 0; index < endpoints.length; index++) {
        const response = await axios.delete(endpoints[index])
        console.log(response)
        result.push(response)
    }
    console.log(result)
}

export const getProjects = async() =>{
    const response = await axiosInstance.get('/v3/project')
    console.log(response.data)
    return response.data
}

export const getProjectDetails = async(id) => {
    const response = await axiosInstance.get(`/v3/project/${id}`)
    return response.data
}

export const updateProject = async(data)=>{
    const response = await axiosInstance.put(`/v3/project/${data.id}`,data)
    return response
}

export const deleteProject = async(id)=>{
    const response = await axiosInstance.delete(`/v3/project/${id}`)
    return response
}

export const getCategoryProjects = async(id)=>{
    const response = await axiosInstance.get(`/project/type/${id}`)
    return response.data
}