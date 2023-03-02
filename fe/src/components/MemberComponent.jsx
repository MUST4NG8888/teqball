import axios from "axios"
import { useEffect, useState } from "react"

import { useParams } from "react-router-dom"



const MemberComponent = ({member,isAdmin}) =>{
        const {id} = useParams()

        const [admin,setAdmin] = useState()

        const data = member.member.find(x => x.teamId == id)

        useEffect(()=>{
            if(data.admin){
                setAdmin(true)
            }
        },[])

      
        const addAdmin =async() =>{
        const token = localStorage.getItem("token")
        console.log(id)
        const userId = member._id
        const addToAdmin = await axios.post("http://localhost:3000/api/user/makeadmin",{userId,id},{
            headers: {Authorization: `Bearer ${token}`},
        })
        setAdmin(true) 
    }

    return(
        <>
        <h1>{member.name}</h1>
        {isAdmin && !admin && <button onClick={addAdmin}>Add admin</button>}
        </>
    )
}

export default MemberComponent