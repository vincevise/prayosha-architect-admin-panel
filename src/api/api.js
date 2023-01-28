import axios from 'axios'

const axiosInstance = axios.create({
    baseURL:'https://ruby-snail-kit.cyclic.app/api'
})

export const createProject = async (data) => {
    const response = await axiosInstance.post('/project',data)
    return response
}

export const getCategories = async() => {
    const response = await axiosInstance.get('/category')
    // return response
    return response.data
}


// export const deleteGarbageImages = async(data) => {
//     const response = await axiosInstance.post('/imagekit/delete-images',data)
//     return response
// }



export const deleteGarbageImages = async(data) => {

    let result = []
     
    const endpoints = data.map(x=> `https://ruby-snail-kit.cyclic.app/api/imagekit/${x.fileId}`)
    console.log(endpoints)

    for (let index = 0; index < endpoints.length; index++) {
        const response = await axios.delete(endpoints[index])
        result.push(response)
    }
    console.log(result)
}

export const getProjects = async() =>{
    const response = await axiosInstance.get('/project')
    console.log(response.data)
    return response.data
}

export const getProjectDetails = async(id) => {
    const response = await axiosInstance.get(`/project/${id}`)
    return response.data
}

export const updateProject = async(data)=>{
    const response = await axiosInstance.put(`/project/${data.id}`,data)
    return response
}

export const deleteProject = async(id)=>{
    const response = await axiosInstance.delete(`/project/${id}`)
    return response
}

export const getCategoryProjects = async(id)=>{
    const response = await axiosInstance.get(`/project/type/${id}`)
    return response.data
}