import { deleteGarbageImages } from "../api/api"

export const dumpGarbageImages = (data) => {
    if(data!=='') {
        if(localStorage.getItem('garbageImages')!==null){
            localStorage.setItem('garbageImages',JSON.stringify([...JSON.parse(localStorage.getItem('garbageImages')),data]))      
        }else{
            localStorage.setItem('garbageImages',JSON.stringify([data]))
        }
    }
}

export const getDifference = async(array2, array1)=>{
    if(!array2 || !array2) return []
    return array1.filter(object1 => {
        return !array2.some(object2 => {
          return object1.url === object2.url;
        });
      });
}

export const deleteImagesFn = (deleteImages) => {
    if(deleteImages.length!==0){
        console.log(deleteImages)
        deleteGarbageImages(deleteImages)
            .then(()=>{localStorage.removeItem('garbageImages')})
            .catch((error)=>{updateNotification(error.message,'error'); console.log(error)})
    }
}
  