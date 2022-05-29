import React, {useState, useEffect} from 'react'
import Camera from '../components/SVG/Camera'
import Trash from '../components/SVG/Trash'
import Img from "../samip.JPG"
import "./Profile.css"
import { storage, db, auth } from '../firebase'
import {ref, getDownloadURL, uploadBytes, deleteObject} from 'firebase/storage'
import { getDoc, doc, updateDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const [image, setImage] = useState("");
    const [user, setUser] = useState();
    const navigate = useNavigate();
    
    useEffect(()=>{
        
        getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
            if (docSnap.exists) {
              setUser(docSnap.data());
            }
          });
        if (image){
            const upload =  async () =>{
            
                const imgRef = ref(storage, `avatar/${new Date().getTime()} - ${image.name}`);
                try{
                    if(user.avatarPath){
                        await deleteObject(ref(storage, user.avatarPath))
                    }
                    const snap = await uploadBytes(imgRef, image);
                    
                    const url = await getDownloadURL(ref(storage, snap.ref.fullPath));
                    await updateDoc(doc(db, 'users', auth.currentUser.uid),{
                        avatar:url,
                        avatarPath:snap.ref.fullPath,
                       
                    
                    });
                    setImage("");
                    
        
                }catch(err){
                    console.log(err.message);
                }
                
                
            }
            upload();

    }

    }, [image])

    const deleteImage = async()=>{
        console.log("Hello");
        try{
            const confirm = window.confirm('Delete Avatar?');
            if (confirm){
                await deleteObject(ref(storage, user.avatarPath));
                await updateDoc(doc(db, 'users', auth.currentUser.uid),{
                    avatar:"",
                    avatarPath:"",
                });
                navigate("/");
            }
        }catch(err){
            console.log(err.message);
        }
    }
  return user?(
    <section>
        <div className="profile_container">
            <div className="img_container">
                <img src={user.avatar||Img} alt="avatar" />
                <div className='overlay'>
                    <div>
                        <label htmlFor="photo"><Camera/></label>
                        {user.avatarPath? <Trash deleteImage={deleteImage}/>:null}
                        <input type="file" accept='image/*' id="photo" style = {{
                            display:"none"
                            
                        }}
                        onChange = {e=>setImage(e.target.files[0])} />
                    </div>
                </div>
            </div>
            <div className="text_container">
                <h3> {user.name}</h3>
                <p>{user.email}</p>
                <hr />
                <small>Joined on: {user.createdAt.toDate().toDateString()}</small>
            </div>
        </div>
    </section>
  ):null;
}

export default Profile