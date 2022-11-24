import React, { useState } from 'react'
import Header from './header'
import {Modal, ModalBody, ModalHeader} from 'reactstrap'
import axios from "axios"
import Table from './table'


import ("../styles/home.css")
function Home() {
    let token = localStorage.getItem("token")
    const [inputModal , setInputModel] = useState(false)
    const [inputData , setInputData] = useState({ })
    const [data , setData]=useState([]);

    const addData = (e) =>{
        e.preventDefault();
 
        const config= {
            headers: {
                "Content-Type": "application/json",
                "authorization": token
            }
        }

        const data = axios.post("http://localhost:8080/add",
            inputData, config).then((res) => alert(res.data.message));

            setInputModel(!inputModal)

    }

    useState(()=>{
        const config= {
            headers: {
                "Content-Type": "application/json",
                "authorization": token
            }
        }
        
        const data = axios.get("http://localhost:8080/allposts" , config).then((res) => setData(res.data.message));
    },[])
  return (
    <div className='mainholder_loginpage'>

        <div className='header holder'>
            <div>
                TEST APP FOR XHIPMENT
            </div>
        <Header></Header>
        </div>
        <div>
            <Modal
            isOpen={inputModal}
            className='input-modal holder'
            >
                <ModalHeader
                className='modalHeader'
                 >
                   <span className='model-header-span'> ADD INFO</span>
                    <button type='button' className='modelClose' onClick={()=>{setInputModel(!inputModal)}}> close</button>                  
                </ModalHeader>

                <ModalBody
                className='modalBody'
                >
                    <form  className='inputform'>
                       <div className="textinput">
                       <input
                        placeholder='Name'
                        name='name'
                        type='text'
                        
                        className="input"
                        onChange={(e)=>{
                            let t = e.target.value
                            setInputData({...inputData ,name:t})
                        }}
                        >
                        </input>
                       </div>

                       <div>
                       <input
                        placeholder='AGE'
                        name='age'
                        type='Number'
                    
                        className="input"

                        onChange={(e)=>{
                            let t = e.target.value
                            setInputData({...inputData ,age:t})
                        }}
          
                        ></input>

                       </div>
                        <div className="textinput">
                        <lable htmlFor="male">MALE : </lable>
                        <input
                        placeholder='MAlE'
                        name='gender'
                        type='radio'
                        id='male'
                        
                        onChange={(e)=>{
                           
                            setInputData({...inputData ,gender:"male"})
                        }}
                        >
                         
                        </input>
                        <lable htmlFor="female"> FEMALE : </lable>
                        <input
                        placeholder='FEMAlE'
                        name='gender'
                        type='radio'
                        id='female'
                        onChange={(e)=>{
                            setInputData({...inputData ,gender:"female"})
                        }}
                        >
                        </input>
                        </div>
                       <div  className="textinput">
                       <input
                        placeholder='EDUCATION'
                        name='education'
                        type='text'
                      
                        onChange={(e)=>{
                            let t = e.target.value
                            setInputData({...inputData ,education:t})
                        }}
                        className="input"
                      
                        >
                        </input>
                       </div>
                       <div className="textinput">
                        <button type='button' className='addinfo' onClick={addData}>ADD</button>
                       </div>
                    </form>

                </ModalBody>

            </Modal>

        </div>
        <div className='button holder'>
            <button type='button'
            className='buttonelement'

            onClick={()=>{setInputModel(true)}}
            >
                ADD NEW INFO
            </button>
        </div>
        <div className='table holder'>
        <Table data={data}></Table>
        </div>
    </div>
  )
}

export default Home