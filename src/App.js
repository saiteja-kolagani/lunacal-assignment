import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import img from './assets/image.png'
import './App.css';

const App = () => {
  return (
    <div className="container">
      <div className="left-side"></div>
      <div className="right-side">
        <AboutMeTabs />
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <hr style={{width: "600px", textAlign: "center"}} />
        </div>
        <Gallery />
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <hr style={{width: "600px", textAlign: "center"}} />
        </div>
      </div>
    </div>
  );
};

const AboutMeTabs = () => {
  const [activeTab, setActiveTab] = useState('About Me');

  return (
    <div className="about-me-tabs">
      <div className="tab-buttons">
        {['About Me', 'Experiences', 'Recommended'].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? 'active' : ''}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {activeTab === 'About Me' && (
          <p>
            Hello! I’m Dave, your sales rep here from Salesforce. I’ve been
            working at this awesome company for 3 years now.
          </p>
        )}
        {activeTab === 'Experiences' && (
          <p>
            I was born and raised in Albany, NY & have been living in Santa
            Carla for the past 10 years with my wife Tiffany and my 4-year-old
            twin daughters.
          </p>
        )}
        {activeTab === 'Recommended' && (
          <p>
            I recommend checking out our premium solutions for optimizing your
            sales pipeline.
          </p>
        )}
      </div>
    </div>
  );
};

const Gallery = () => {
  const [images, setImages] = useState([
    img
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleImagesCount = 3;

  const nextSlide = () => {
    if (currentIndex + visibleImagesCount < images.length) {
      setCurrentIndex(currentIndex + visibleImagesCount);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - visibleImagesCount);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prevImages) => [...prevImages, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById('file-input').click();
  };

  return (
    <div className="gallery">
      <div className="gallery-header">
        <button className='gallery-heading'>Gallery</button>
        <div className='arrow-btn-container'>
          <button onClick={triggerFileInput} className='add-image-btn'>+ Add Image</button>
          <div className='arrow-btn-container'>
            <button className='arrow-btn' onClick={prevSlide} disabled={currentIndex === 0}>
              <FaArrowLeft size={18} />
            </button>
            <button className='arrow-btn' onClick={nextSlide} disabled={currentIndex + visibleImagesCount >= images.length}>
              <FaArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
      
      <input
        id="file-input"
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleImageUpload}
      />

      <div className="gallery-images">
        {images.slice(currentIndex, currentIndex + visibleImagesCount).map((image, index) => (
          <img key={index} src={image} alt={`Gallery ${index}`} />
        ))}
      </div>
    </div>
  );
};

export default App;
