import { useContext, useState } from 'react'
import {IKImage,IKContext,IKUpload} from 'imagekitio-react'
import {ClipLoader} from 'react-spinners'
import {BsImage} from 'react-icons/bs'
import { dumpGarbageImages } from '../helper/helperFunction'
import { authenticationEndpoint, publicKey, urlEndpoint } from '../../config/config'


const AddCoverImg = ({data,disabled}) => {

     const {project,setProject}=data

    // const {project,setProject } = useContext(ProjectContext)

    const [imageSrc,setImageSrc] = useState('')
    const [loading,setLoading] = useState(false)
  
    const onError = err => {
        console.log("Error", err);
    };
      
    const onSuccess = res => {
        if(res) setLoading(false)
        const {fileId, url} = res

        dumpGarbageImages({fileId, url})
        
        setProject({...project,poster:{fileId,url}})
    };

    const onUploadProgress = (res) =>{
        // console.log(res)
        if(res)setLoading(true)
    }


    return (
        <div className="flex  items-center justify-center  ">
        <div className={`bg-gray-200 w-full h-[420px] relative cursor-pointer border-2 ${disabled ? 'border-white' : 'border-gray-600 border-dashed'} rounded-md  overflow-hidden`}>
                <div className={`absolute w-full h-[420px] bg-slate-200 z-4 cursor-pointer flex items-center justify-center  ${disabled ? '' : 'pointer-events-none'}`}>
                    {
                        loading ? <div><ClipLoader color="#4b5563" />
                        </div> 
                        :
                        project.poster ==='' ? <div className='flex flex-col items-center '><BsImage size={50} color={'#4b5563'}/>
                         <p className='mt-1 text-gray-600 font-semibold'>Drag and Drop or Browse</p></div> : <img src={project.poster.url} className='w-full h-full object-cover' alt="" />
                    }
                </div>

                <IKContext publicKey={publicKey} urlEndpoint={urlEndpoint} authenticationEndpoint={authenticationEndpoint} >
                    <IKUpload fileName="abc.jpg"  
                        useUniqueFileName={true} 
                        isPrivateFile= {false} 
                        onError={onError}
                        onSuccess={onSuccess}
                        onUploadProgress={onUploadProgress}
                        className=' left-1 w-full h-[400px] '
                    />
                </IKContext>   
            </div>
      </div>
  )
}

export default AddCoverImg