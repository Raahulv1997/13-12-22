import React from 'react'
import { Carousel } from 'react-bootstrap';
import Banner1 from '../Image/Banner1.jpg'
import Banner2 from '../Image/Banner2.jpg'
import Banner3 from '../Image/Banner3.jpg'
import '../../src/style.css'

export const Banner = () => {
  return (
    <>
    <Carousel indicators={false} nextIcon={false} prevIcon={false}>
      <Carousel.Item >
        <img
          className="d-block w-100"
          src={Banner1}
          alt="First slide" style={{height:600, width:700}}
        />
        <Carousel.Caption  className='text_controller'>
          <h1> We2 Code To Grow our Business</h1>
        
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Banner2}
          alt="Second slide" style={{height:600, width:700}}
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Banner3}
          alt="Third slide" style={{height:600, width:700}}
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
   

    </>
  )
}
