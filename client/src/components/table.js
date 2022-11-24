import React from 'react'
import axios from 'axios'
const Table= (props)=>{
    const{data}=props
    let token = localStorage.getItem("token")
    

    const Delete =(e)=>{
        
        let info=e.target.parentElement.parentElement.children[0].innerText

        const config= {
            headers: {
                "Content-Type": "application/json",
                "authorization": token
            }
        }
       const body={}

        const data = axios.post(`http://localhost:8080/delete/${info}`,body,
        config).then((res) => alert(res.data.res));
        
    }
  return (
    <>
    <table className='main'>
        <tbody>
            <tr>
            <td>ID</td>
                <td>NAME</td>
                <td>EDUCATION</td>
                <td>ACTION</td>
            </tr>
            {
                data.map((data , key)=>{
                    return (
                        <tr key={data._id}>
                             <td>{data._id}</td>
                            <td>{data.name}</td>
                            <td>{data.education}</td>
                            <td><button type='button' className='tableButton' onClick={Delete}>delete</button></td>
                        </tr>
                    )
                })
            }
        </tbody>
    </table>
    </>
  )
}

export default Table