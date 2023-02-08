import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { getCategories, getCategoryProjects, getProjects } from '../api/api'
import { AiOutlinePlus } from 'react-icons/ai'



const Projects = () => {
  const [category,setCategory] = useState('')
  const [type,setType] = useState('all')


  const {data, isFetched, isFetching, isLoading,refetch} = useQuery(type,()=>getCategoryProjects(type))
 
 
  useEffect(()=>{
    getCategories().then((res)=>{setCategory(res);console.log(res,'category')})
    refetch()
  },[])
  // console.log(data)

  return (
    <div className='px-10 py-20'>
        <Link to={'/addproject'} className='flex items-center gap-2 w-fit px-4 py-2 bg-green-500 rounded-md text-white font-semibold'><AiOutlinePlus size={20} color={'white'}/>Add Project</Link>
        <h2 className='mb-2 mt-2 font-semibold py-2 text-slate-800'>PROJECTS</h2>
        <div className='flex [&_span]:px-3 [&_span]:py-1 [&_span]:border [&_span]:border-blue-400 [&_span]:rounded-full gap-4 [&_span]:font-semibold [&_span]:cursor-pointer pb-6 border-b border-slate-400'>
          
          <span onClick={()=>setType('all')} className={  type === 'all'? 'bg-blue-400 text-white' : ''} >All</span>
          
          {category && category?.map((x)=>{
            return (<span key={x.id} onClick={()=>setType(x.name)} className={x.name === type ? 'bg-blue-400 text-white' : ''}>{x.name}</span>)
          })}
        </div>
        <div className='pt-6 flex flex-wrap gap-3'>
          {data?.map((x)=>{
             return(
              <div className='border w-48 h-48 cursor-pointer' key={x.id}>
                <Link to={`/project/${x.id}`}>
                  <img src={x.thumbnail?.url} alt="" />
                </Link>
              </div>) 
            })}
            
        </div>
    </div>
  )
}

export default Projects