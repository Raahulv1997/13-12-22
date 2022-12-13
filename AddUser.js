import axios from 'axios'
import moment from 'moment/moment'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'

import { useNavigate } from 'react-router-dom'

export const AddUser = () => {
    

const userId = localStorage.getItem("userid")

  const [userdata, setuserData ]= useState([]) 
  const [file,setFile]=useState("")
  const [filename,setFileName]=useState("")
  const [checkState, setCheckstate]=useState([])


  const Navigation= useNavigate("")

const fetchUser= async()=>{
  const result=await axios.get(`http://localhost:1000/user/${userId}`)
  setuserData(result.data)
  setCheckstate(result.data.hobbies)

    
}

  useEffect(()=>{
    fetchUser()
  },[])

  

  const checkHandler=(e)=>{
    
  // let data= checkState
  // data.push(e.target.value)
  // setCheckstate(data)
  
  console.log(`${JSON.stringify(userdata)}`)

  
  const {value, checked} = e.target
  if(checked){
    setCheckstate([...checkState,value])
    console.log(`${value} is ${checked}`)

  }
  else{
    setCheckstate(checkState.filter((e)=>e !== value))
    console.log(`${value} is ${checked}`)

  }
  }

  const valueHandler=(e)=>{
    setuserData({...userdata,[e.target.name]:e.target.value})

  }

  const submitHandler=async(e)=>{
    e.preventDefault();
  
    console.log(e+"---------------addd")
   
    

      const formdata= new FormData();
      formdata.append("name",userdata.name)
      formdata.append("dob",userdata.dob)
      formdata.append("city",userdata.city)
      formdata.append("gender",userdata.gender)
      formdata.append("email",userdata.email)
      formdata.append("desc",userdata.desc)
      formdata.append("mobile",userdata.mobile)
      formdata.append("hobbies",checkState)
      formdata.append("userimage", file)
      formdata.append("filename",filename)
      
     
      console.log(formdata)

      const data= await axios.post('http://localhost:1000/user',formdata)
      console.log(data.status)
      if(data.status===200){
        
       Navigation('/')
      }
      else{
        alert("not added user")
      }
     


  }
  const updateHandler=async(e)=>{
    e.preventDefault()
    console.log(e+"---------------update")
     const formdata= new FormData();
            formdata.append("name",userdata.name)
            formdata.append("dob",userdata.dob)
            formdata.append("city",userdata.city)
            formdata.append("gender",userdata.gender)
            formdata.append("email",userdata.email)
            formdata.append("desc",userdata.desc)
            formdata.append("mobile",userdata.mobile)
            formdata.append("hobbies",checkState)
            formdata.append("userimage", file)
            formdata.append("filename",filename)
           
            console.log(formdata)

            const update= await axios.put(`http://localhost:1000/user/${userId}`,formdata)
          
            if(update.status===200){
              Navigation('/')
             }
             else{
               alert("not Updated user")
             }

           }

  console.log("---------"+JSON.stringify(checkState))
  const imgsrc=`http://localhost:1000/${userdata.userimage}`
  
  return (
    <>
     <h1 className=' my-3 py-3 bg-success text-white text-center'>Add user</h1>
     <Container>
      <Row className="justify-content-center">
        <Col lg={4}>
        <Form className='mt-3' onSubmit={userId ? (e)=>updateHandler(e) :(e)=> submitHandler(e)}>
      <Form.Group className="mb-3" >
        <Form.Label>Name:</Form.Label>
        <Form.Control type="text" placeholder="Enter name" name="name" value={userdata.name} onChange={valueHandler} />
     
      </Form.Group>
      
      <Form.Group className="mb-3" >
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" placeholder="Enter Your Email"  value={userdata.email} name="email" onChange={valueHandler} />
     
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Mobile:</Form.Label>
        <Form.Control type="text" placeholder="Enter Your  Mobile No."  value={userdata.mobile} name="mobile" onChange={valueHandler} />
     
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Date of Birth:</Form.Label>
        <Form.Control type="date" name="dob"  onChange={valueHandler} value={moment(userdata.dob).format('YYYY-MM-DD')}  placeholder="YYYY-MM-DD" />
        {/* value={moment(userdata.dob).format('YYYY-MM-DD')} */}
     
      </Form.Group>

      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Upload your profile picture:</Form.Label>
        <Form.Control type="file" onChange={(e)=>{
           setFile(e.target.files[0] )
           setFileName(e.target.files[0].name)
           console.log("jjkljljljlk-------"+e.target.files[0].name)
           }} name="userimage"  />



{imgsrc === 'http://localhost:1000/undefined' ? null:
 <span><img src={imgsrc} height={100} style={{marginTop:10}}/></span>
                  }        </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>City:</Form.Label>
        <Form.Select aria-label="Default select example" name="city" value={userdata.city} onChange={valueHandler}>
      <option>Select your city</option>
      <option value="indore">Indore</option>
      <option value="gwalior">Gwalior</option>
      <option value="bhopal">Bhopal</option>
      <option value="shivpuri">Shivpuri</option>
    </Form.Select>
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Descriptions </Form.Label>
        <Form.Control as="textarea" rows={3} name="desc" value={userdata.desc} onChange={valueHandler} />
      </Form.Group>
      <Form.Label>Gender: </Form.Label>
        <div  className="mb-3">
          <Form.Check
            inline
            label="Male"
            name="gender"
            value={'male'}
            checked={userdata.gender==='male'? true:false}
            onChange={valueHandler}
            type={'radio'}
          />
          <Form.Check
            inline
            label="Female"
            value={'female'}
            onChange={valueHandler}
            checked={userdata.gender==='female'? true:false}
            name="gender"
            type={'radio'}
          />
          <Form.Check
            inline
            label="Other"
            value={'other'}
            onChange={valueHandler}
            checked={userdata.gender==='other'? true:false}
            name="gender"
            type={'radio'}
          />
        
        </div>

  <Form.Label>Hobbies: </Form.Label>
        <div key={`inline-checkbox`} className="mb-3">
          <Form.Check
            inline
            label="Cricket"
            value={'Cricket'}
            checked={(checkState) ? (checkState).includes('Cricket') ? true : false : false}
            onChange={checkHandler}
             name="hobbies"
            type="checkbox"
            
          />
          <Form.Check
            inline
            label="Football"
            name="hobbies"
            value={'Football'}
            checked={(checkState) ? (checkState).includes('Football') ? true : false : false}
            onChange={checkHandler}

            
            type="checkbox"
          
          />
          <Form.Check
            inline
            label="Hockey"
            name="hobbies"
            value={'Hockey'}
            checked={(checkState) ? (checkState).includes('Hockey') ? true : false : false}
            onChange={checkHandler}
            type="checkbox"
           
          />
          <Form.Check
            inline
            label="Table Tannis"
            value={'Table Tannis'}
            checked={(checkState) ? (checkState).includes('Table Tannis') ? true : false : false}
            onChange={checkHandler}


            
            name="hobbies"
            type="checkbox"
           
          />
       
        
        </div>

       
      <Button variant="primary" type="submit">
        Add Users
      </Button>
    </Form>
        </Col>
      </Row>
       
     </Container>
    </>
  )
}
