import React, { memo, useState } from 'react'
import { useEffect } from 'react'
import { createContext } from 'react'
import { useLocation, useNavigate } from 'react-router'
import AddCoverImg from '../component/AddCoverImg'
import AddImagesGallery from '../component/AddImagesGallery'
import AddThumbNail from '../component/AddThumbNail'
import { v4 } from 'uuid' 
import { createProject, deleteGarbageImages, getCategories } from '../api/api'
import { getDifference } from '../helper/helperFunction'
import {useQuery} from 'react-query'
import { updateNotification } from '../App'


export const ProjectContext = createContext()

const AddProject = () => {

    const navigate = useNavigate()
    const [project,setProject] = useState({
        id:v4(),
        name:'',
        location:'',
        area:'',
        date:'',
        description:'',
        poster:'',
        thumbnail:'',
        gallery:[]
    })

    let {data} = useQuery('categories',getCategories)

    const handleChange = (e) => {
        setProject({...project,[e.target.name]:e.target.value})
    }

    const handleSubmit = async() => {
        const garbageImages = await JSON.parse(localStorage.getItem('garbageImages'))
        const usedImages = [project.poster, project.thumbnail, ...project.gallery]
       
        const deleteImages = await getDifference(usedImages,garbageImages) 
       
        const response = await createProject(project)
            .then(()=>{
                if(deleteImages.length!==0){
                    console.log(deleteImages)
                    deleteGarbageImages(deleteImages)
                        .then((res)=>{localStorage.removeItem('garbageImages')})
                        .catch((error)=>{updateNotification(error.message,'error'); console.log(error)})
                }
                localStorage.removeItem('garbageImages')
                updateNotification('Project Created Successfully','success')
                navigate(`/project/${project.id}`)
            })
            .catch((error)=>updateNotification(error.message,'error'))
    }


  return (
    <>  
     
    <div className='px-10 py-16'>
        <div className='flex flex-wrap'>

            <div className='lg:w-3/4 w-full py-2 '>
                <h1 className='mb-2 border-b py-2 px-2 border-slate-300'>Cover Photo</h1>
                <AddCoverImg data={{project,setProject}} />
            </div>
            <div className='flex flex-col lg:w-1/4 w-full py-2 px-4 '>
                <h1 className='mb-2 border-b border-slate-300 py-2 px-2'>Project Details</h1>
                <AddThumbNail data={{project,setProject}} />
                <div className='mt-2 [&_input]:border-slate-400 [&_input]:border-2 [&_input]:rounded-md [&_input]:w-full [&_input]:px-2 [&_input]:bg-white [&_input]:py-1 [&_input]:outline-none [&_input]:my-1 '>

                    <input 
                        type="text" 
                        name='name' 
                        placeholder='Project Name'
                        onChange={handleChange}
                        className='focus:border-2 focus:border-blue-500'
                    />
                    <input 
                        type="text" 
                        name='location' 
                        placeholder='Project Location' 
                        onChange={handleChange}
                        className='focus:border-2 focus:border-blue-500'
                    />
                    <input 
                        type="number" 
                        name='area' 
                        placeholder='Sqft Area' 
                        onChange={handleChange}
                        className='focus:border-2 focus:border-blue-500'
                    />
                    <input 
                        type="date" 
                        name='date' 
                        placeholder='date of Completion'
                        onChange={handleChange}
                        className='focus:border-2 focus:border-blue-500'
                    />
                    <select name="type" id="" className='px-2 py-1 outline-none border-2 border-slate-400 my-1 rounded-md w-full focus:border-blue-500' onChange={handleChange}>
                        <option value="" className='bg-slate-200'>Select Project type</option>
                        {data?.category.map((x)=>(<option key={x.id} value={x.name}>{x.name}</option>))}
                         
                    </select>
                    <textarea className='outline-none focus:border-blue-400 border-slate-400 border-2 w-full rounded-md p-2 mt-1' 
                        type="text" 
                        name='description'       placeholder='Project Description' 
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
        <div className=''>
        <h1 className='border-b border-slate-300 py-2 px-2 mx-4'>
            <p>Gallery</p>
            </h1>
            <AddImagesGallery data={{project,setProject}} />
        </div>
        <div className='w-full py-4 flex justify-center'>
            <button className=' mx-auto bg-blue-400 px-4 py-2 text-white font-semibold rounded-md' onClick={handleSubmit}>ADD PROJECT</button>
        </div>
    </div>
    </>
  )
}

export default memo(AddProject)