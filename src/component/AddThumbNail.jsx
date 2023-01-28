import { useState } from 'react'
import {IKImage,IKContext,IKUpload} from 'imagekitio-react'
import {ClipLoader} from 'react-spinners'
import {BsImage} from 'react-icons/bs'
import { useContext } from 'react'
import { dumpGarbageImages } from '../helper/helperFunction'
import { authenticationEndpoint, publicKey, urlEndpoint } from '../../config/config'

const AddThumbNail = ({data,disabled}) => {
    const {project,setProject} = data
    // const {project,setProject } = useContext(ProjectContext)
    const [loading,setLoading] = useState(false)
  
    const onError = err => {
        console.log("Error", err);
    };
      
    const onSuccess = res => {
        if(res) setLoading(false)
        const {fileId, url} = res

        dumpGarbageImages({fileId, url})
        setProject({...project,thumbnail:{fileId,url}})
    };

    const onUploadProgress = (res) =>{
        if(res)setLoading(true)
    }


    return (
        <div className="flex items-center justify-center ">
        <div className={`bg-gray-100 w-36 h-36 relative cursor-pointer border-2 rounded-md overflow-hidden   ${disabled ? 'border-white': 'border-gray-600 border-dashed'}`}>
                <div className={`absolute w-36 h-36 bg-slate-200 z-4 cursor-pointer flex inset-0 m-auto ${disabled ? '' : 'pointer-events-none'}`}>
                    {
                        loading ? <div className='w-full h-full flex items-center justify-center'><ClipLoader color="#4b5563" />
                        </div> 
                        :
                        (project.thumbnail==='' ? <div className='text-sm px-2 h-full flex items-center justify-center text-center mr-2 flex-col '>
                            <BsImage size={36} color={'#4b5563'}/>
                            <p className='mt-2 font-semibold text-gray-600'>Upload Thumbnail Photo</p>
                            </div> : <img src={project.thumbnail.url} className='w-max-full h-max-full object-cover' alt="" />)
                    }
                </div>

                <IKContext publicKey={publicKey} urlEndpoint={urlEndpoint} authenticationEndpoint={authenticationEndpoint} >
                    <IKUpload 
                        fileName="abc.jpg" 
                        path="/thumbnail/abc.jpg" 
                        useUniqueFileName={true} 
                        isPrivateFile= {false} 
                        onError={onError}
                        onSuccess={onSuccess}
                        onUploadProgress={onUploadProgress}
                        className=' w-36 h-36 '
                    />
                </IKContext>   
            </div>
      </div>
  )
}

export default AddThumbNail