import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'


export const UpdateUser = () => {
    const {id} =useParams("")
    console.log(id)


    const [getUser,setGetuser]=useState([]);
    const [getgender, setGetgender]= useState("")
    
  const fetchUser= async()=>{
    const result=await axios.get(`http://localhost:1000/user/${id}`)
     setGetuser(result.data)
      console.log(getUser.dob)
      setGetgender(getUser.gender)
      console.log(getgender);
      
  }
  useEffect(()=>{
    fetchUser();
  },[])


  



    const valueHandler=(e)=>{
        // setFormData({...formdata,[e.target.name]:e.target.value})
      }

      const submitHandler=async (e)=>{
        // e.preventDefault();
        //  const data= await axios.post('http://localhost:1000/user',formdata)
        //     if(data.status===200){
        //      Navigation('/')
        //     }
        //     else{
        //       alert("not added user")
        //     }
      }
    
  return (
    <>
      <h1 className=' my-3 py-3 bg-success text-white text-center'>Update user</h1>
     <Container>
      <Row className="justify-content-center">
        <Col lg={4}>
        <Form className='mt-3' onSubmit={submitHandler}>
      <Form.Group className="mb-3" >
        <Form.Label>Name:</Form.Label>
        <Form.Control type="text" placeholder="Enter name" name="name" value={getUser.name} onChange={valueHandler} />
     
      </Form.Group>
      
      <Form.Group className="mb-3" >
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" placeholder="Enter Your Email" value={getUser.email} name="email" onChange={valueHandler} />
     
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Mobile:</Form.Label>
        <Form.Control type="text" placeholder="Enter Your  Mobile No." value={getUser.mobile} name="mobile" onChange={valueHandler} />
     
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Date of Birth:</Form.Label>
        <Form.Control type="date" name="dob"  value={getUser.dob} onChange={valueHandler} />
     
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Gender:</Form.Label>
        {[ 'radio'].map((type) => (
        <div key={`inline-${type}`} className="mb-3">
          <Form.Check
            inline
            label="male"
            name="gender"
            checked={getgender==='male'}
            //  value={getgender.}
            onChange={valueHandler}
           
            type={type}
            id={`inline-${type}-1`}
          />
          <Form.Check
            inline
            label="female"
            name="gender"
            onChange={valueHandler}
            
            type={type}
            id={`inline-${type}-1`}
          />
       
   
        </div>
      ))}
     
      </Form.Group>

    
    

      <Form.Group className="mb-3" >
        <Form.Label>City:</Form.Label>
        <Form.Select aria-label="Default select example" name="city" value={getUser.city} onChange={valueHandler}>
      <option>Select your city</option>
      <option value="indore">Indore</option>
      <option value="gwalior">Gwalior</option>
      <option value="bhopal">Bhopal</option>
      <option value="shivpuri">Shivpuri</option>
    </Form.Select>
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Descriptions </Form.Label>
        <Form.Control as="textarea" rows={3} name="desc" value={getUser.desc} onChange={valueHandler} />
      </Form.Group>
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
