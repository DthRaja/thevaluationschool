import Image from 'next/image'
import React from 'react'

const Banner = () => {
  return (
    <div className="alumni-section">
  <div className="container">
    <div className="alumni-container">
      <div className="alumni-heading">
        <h3 id="i457">They came. They saw. They conquered.</h3>
        <p>
          At The Valuation School, we’re proud to see our students excel and
          secure placements in top companies. With dedication and the right
          guidance, they’ve turned their hard work into real-world success. Our
          alumni are a testament to what’s possible when you combine
          determination with expert mentoring. Join us, put in the effort, and
          you could be our next success story. Your journey to a successful
          finance career starts here—let’s make it happen together!
        </p>
      </div>
      <div className="banner-image">
        <img
          src="/img/TVS1-alumni-banner.png"
          alt="alumni-banner"
        />
      </div>
    </div>
  </div>
</div>

  )
}

export default Banner