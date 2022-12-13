import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap'
import swal from 'sweetalert'




export const ShowImage = () => {
    const [name,setName]=useState("")
     const [file, setFile]= useState("")
     const [filename, setfilename]= useState("")

     

   
    const SubmitHandler=async(e)=>{
      e.preventDefault();
       
      const formData= new FormData();
      formData.append("avatar",file);
      formData.append("filename",filename);
      formData.append("name",name)

   console.log(formData)
        const result= await axios.post('http://localhost:1000/upload',formData);
        console.log(result)
        setApiCall(true)
      
    }
      
       

    const [getImage,setGetImage]=useState([])
    const [apicall,setApiCall]=useState(false)
     

    const fethImage= async()=>{
       const image= await axios.get('http://localhost:1000/upload')
       setGetImage(image.data)
       setApiCall(false)
       console.log(getImage)
    }

    useEffect(()=>{
      fethImage();
    },[apicall])





    const  willDelete=(id)=>{
      
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {

        axios.delete(`http://localhost:1000/upload/${id}`).than((response)=>{
          fethImage();
          console.log(JSON.stringify(response.data))
          console.log("Your imaginary file is safe!")
          console.log("deleted-----------");

          swal(`Poof!   Your imaginary file has been deleted! ${id} `,
        
          {
            icon: "success",
            
  
          });
        }).catch(()=>{
          swal("Your imaginary file is safe!");
          console.log("Your imaginary file is safe!")

        })

      
      } 
    });
    }


    // const deleteImage=async(id)=>{
      
    //   const result= await axios.delete(`http://localhost:1000/upload/${id}`)
    //   if(result.status===204){
    //   fethImage();
    //   }
    //   else{
    //     alert("not delete")
    //   }
    // }


  return (
    <>
    <h1 className='my-3 py-3 bg-success text-center text-white'>Upload Image</h1>
      <Container>
        <Row className='justify-content-center'>
          <Col lg={4}>
          <Form onSubmit={SubmitHandler}>
      <Form.Group className="mb-3" >
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Your Name" value={name} onChange={(e)=>{setName(e.target.value)}} />
       
      </Form.Group>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Upload Your Image</Form.Label>
        <Form.Control type="file" onChange={(e)=>{
          setFile(e.target.files[0])
          setfilename(e.target.files[0].name)
          console.log(e.target.files[0].name+"-----------------------")
          }}/>
      </Form.Group>
    
    
      <Button variant="primary" type="submit" className='mb-5'>
        Submit
      </Button>
    </Form>
          </Col>
        </Row>
      </Container>



      

      <h3 className=' my-2 py-2 bg-danger  text-center text-white'>Employee list</h3>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th> Name</th>
          <th>Images</th>
          <th> Operation </th>
       
        </tr>
      </thead>
      <tbody>
      {getImage.map((item,id)=>{
       const image=(item.avatar).replace("images", "")
        return(
          <>
            <tr>
          <td>{id+1}</td>
          <td>{item.name}</td>
          <td><img src={`http://localhost:1000/${image} `} alt={item.filename} width={150} height={100} /></td >
          {/* <td><div> <Button onClick={()=>{deleteImage(item._id)}}> Delete</Button> </div></td> */}
          <td><div> <Button onClick={()=>{willDelete(item._id)}}> Delete</Button> </div></td>
       
        </tr>
          </>
        )
      })}
      
      </tbody>
    </Table>
    
     

    </>
  )
}
