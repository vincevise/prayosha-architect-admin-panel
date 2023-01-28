import React, { memo, useContext, useState } from 'react'
import { useEffect } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { dumpGarbageImages } from '../helper/helperFunction'

const GalleryImage = ({data,state,disabled}) => {
  const [dropDown,setDropDown] = useState(false)
  const [isVisible,setIsVisible] = useState(false)

  const {project,setProject} = state

  // const {project,setProject } = useContext(ProjectContext)
  useEffect(()=>{
    const handleClick = (e) => {
      if(e.target.getAttribute('data-position')!='three-dots' && e.target.nodeName != 'svg')
      {
        setDropDown(false)
      }
    }
    window.addEventListener('click',handleClick)
    return () => removeEventListener('click',handleClick)
  },[])

  const handleDelete = () => {
    setProject({...project,gallery:[...project.gallery.filter((x)=>x.fileId !== data.fileId)]})
  }

  return (
    <div  className='relative w-48 h-28 overflow-hidden rounded-md' onMouseOver={()=>setIsVisible(true)} onMouseLeave={()=>{setIsVisible(false); setDropDown(false)}}>
       
        {disabled ? '' :
        
          (isVisible && 
            <span className='absolute z-20 right-1 top-1 bg-white active:bg-slate-200 cursor-pointer p-1 rounded-full' onClick={()=>setDropDown(!dropDown)} data-position="three-dots">
                <BsThreeDots color={'#4b5563'} size={14}/>
            </span>  
            )
        }
        {dropDown && 
        <span className='right-1 top-7 absolute w-30 h-30 bg-white flex flex-col [&_span]:px-2 [&_span]:flex [&_span]:items-center [&_span]:justify-center rounded-md [&_span]:text-normal [&_span]:py-[1.5px] [&_span]:font-semibold cursor-pointer overflow-hidden'>
            <a href={data.url}>
              <span className='active:bg-slate-400  hover:bg-slate-100'>Expand</span>
            </a>
            <span className='text-red-600 active:bg-slate-400   hover:bg-slate-100' onClick={handleDelete}>Delete</span>
        </span>
        }
        <img src={data.url} className='w-full h-full object-cover'/>
                
    </div>
  )
}

export default memo(GalleryImage)