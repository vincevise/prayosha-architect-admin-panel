import { memo, useContext, useState } from 'react'
import {IKImage,IKContext,IKUpload} from 'imagekitio-react'
import {BiImageAdd} from 'react-icons/bi'
import {BsThreeDots} from 'react-icons/bs'
import { ClipLoader } from 'react-spinners'
import GalleryImage from './GalleryImage'
import { dumpGarbageImages } from '../helper/helperFunction'
import { authenticationEndpoint, publicKey, urlEndpoint } from '../../config/config'

const AddImagesGallery = ({data,disabled}) => {
    console.log(disabled)
    const {project, setProject} = data
    const [loading,setLoading] = useState(false)

    const onError = err => {
        console.log("Error", err);
      };
      
    const onSuccess = res => {
        console.log("Success", res);
        if(res) setLoading(false)
        const {url} = res
        const {fileId} = res
        dumpGarbageImages({fileId,url})

        setProject({...project,gallery:[...project.gallery,{fileId, url}]})
    };

    const onUploadProgress = (res) =>{
        // console.log(res)
        if(res)setLoading(true)
    }


    return (<>
   
        
        <div className="flex flex-wrap gap-4 py-2 px-4 ">
            
          {  project.gallery?.map((x,i)=>(
             <GalleryImage data={x} state={{project,setProject}} key={x.fileId} disabled={disabled}/>
            ))  }

        {loading ? <div className='w-48 h-[109px] flex items-center justify-center'><ClipLoader color="#36d7b7"/></div> : ''}
        {disabled ? '' : 
            <div className='bg-gray-200 w-48 h-28 relative cursor-pointer border-2 overflow-hidden border-dashed rounded-md '>
            
                <div className='absolute w-48 h-24 bg-slate-200 z-4 cursor-pointer pointer-events-none  flex items-center justify-center'>
                    <BiImageAdd size={40}/>
                </div>

                <IKContext publicKey={publicKey} urlEndpoint={urlEndpoint} authenticationEndpoint={authenticationEndpoint} >
                    <IKUpload fileName="abc.jpg"  
                        useUniqueFileName={true} 
                        isPrivateFile= {false} 
                        onError={onError}
                        onSuccess={onSuccess}
                        onUploadProgress={onUploadProgress}
                        className='w-48 h-24 '
                    />
                </IKContext>     
            </div>
        }
            
      </div>
      </>
  )
}

export default memo(AddImagesGallery)