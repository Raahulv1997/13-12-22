import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap'

import{Link, NavLink, useNavigate} from 'react-router-dom'

import Modal from 'react-bootstrap/Modal';

export const Home = () => {

  const [getUser,setGetuser]=useState([]);
  const [deleteId,setdeleteId]=useState('');
  const [city,setcity]=useState('');
  const [name,setName]=useState('');
  const [apicall,setapicall]=useState(false);
  

const navigate=useNavigate();

  // delete aler-------------------------------------------

  const [show, setShow] = useState(false);
 

  const handleShow = (id) =>{ 
    
    setdeleteId(id)
    setShow(true)
  }
  console.log("--deleteId-"+deleteId)

  const OnSearch = () => {
    setapicall(true)
  }

  
    const handleClose = () => {
    setShow(false)};
    // delete aler-------------------------------------------
  // const Navigation=useNavigate("")
    
  // const fetchUser= async()=>{
  //   const result=await axios.get('http://localhost:1000/user')
  //    setGetuser(result.data)
  // }
  useEffect(()=>{
    searchHendler()
  },[apicall])


  const deleteUser=async()=>{
    // console.log("-apiu--"+deleteId)
    const result= await axios.delete(`http://localhost:1000/user/${deleteId}`)
    if(result.status===204){
      searchHendler()
      setShow(false);
    }
    else{
      alert("not delete")
    }
  }
  const onButtonClick=(id)=>{
localStorage.setItem("userid", id)
navigate(`/adduser/${id}`)
  }
  const AddUserItem=()=>{
    localStorage.removeItem("userid")
    navigate(`/adduser/:userid`)
      }


      const searchHendler =async (e)=>{
    
       let result;

       if(name==='' || city===''){
       result= await axios.get(`http://localhost:1000/search`)
       }
       else{
        result= await axios.get(`http://localhost:1000/search?name=${name}&city=${city}`)

       }
  
           setGetuser(result.data)
           setapicall(false)
    //     }
    //    }
    //    else{
    //  searchHendler()
    //    }
      
      }



    //   const selectHanlder = async(e)=>{
    //    const field= e.target.value;
    //    const result= await axios.get(`http://localhost:1000/search/${field}`)
       
    //    if(result.data){
    //     setGetuser(result.data)
    //  }

    //  else{
    //   fetchUser()
    //  }

       
       
    //   }
  return (
    <>
    <h1 className='py-3 my-3 bg-success text-center text-white'>User Management System</h1>

     <Button onClick={()=>AddUserItem()} className='btn btn-primary' >Add user</Button>

      <Container>
        <Row className='justify-content-center'>
          <Col lg={6}>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e)=>{setName(e.target.value)}}
              // onKeyUp={alert("kk")}
             
            />
            <Button variant="outline-success" onClick={OnSearch}>Search</Button>

            <Form.Select aria-label="Default select example" className='ms-4' onChange={(e)=>{setcity(e.target.value)}}>
            <option>select</option>
            <option value={'indore'}>Indore</option>
            <option value={'bhopal'}>Bhopal</option>
            <option value={'gwalior'}>Gwalior</option>
    </Form.Select>
          </Form>
          </Col>
        </Row>
      </Container>

     <Table striped bordered hover className='mt-3'>
      <thead className='table-dark'>
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>GENDER</th>
          <th>CITY</th>
          <th>OPERATIONS</th>

        </tr>
      </thead>
      <tbody>
        {  
       getUser.length>0 ? getUser.map((item, id)=>{
          return(
            <>
             <tr>
          <td>{id+1}</td>
          <td>{item.name}</td>
          <td>{item.gender}</td>
          <td>{item.city}</td>
          <td>
           <div className='justify-content-between d-flex button_box' style={{width:50}}>
           <Link to={`/view/${item._id}`}><Button>Views</Button></Link>
     
            <Button className='mx-2' onClick={(e)=>{onButtonClick(item._id)}} >Edit </Button>
            {/* </Link> */}
      
           <Link ><Button onClick={()=>{handleShow(item._id) }}>Delete</Button></Link>


       
        
           </div>
          </td>
        </tr>
            </>
          )
        })
        :
         
          <h1 className='text-center ' style={{marginLeft:400 ,marginTop:100}}>No Result Found</h1>
     
        }
        
       
      </tbody>
    </Table>

{/* 
    <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you Sure Delete  You Data!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={deleteUser}>
            Yes
          </Button>
          <Button variant="primary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}
