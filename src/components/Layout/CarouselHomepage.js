import { Carousel } from "react-bootstrap";
import './CarouselHomepage.css'
import purple from '../../assets/Images/purple.png'




const CarouselHomepage = () => {
  return (
    <Carousel id="carouselItem">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={purple}
          alt="First slide"
        />
        <Carousel.Caption id="slideText">
          <p>Welcome to Sport Together</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={purple}
          alt="Second slide"
        />
        <Carousel.Caption id="slideText">
          <p>Create an account and meet different people, play your favourite sports</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={purple}
          alt="Third slide"
        />
        <Carousel.Caption id="slideText">
        
          <p>
            SOME TEXT AGAIN
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselHomepage;