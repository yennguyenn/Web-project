import React from 'react'
 const Banner = () => {
    return(
        <div id='carouselExampleCaptions' className='carousel carousel-dark slide w-100 mx-auto' data-bs-ride='carousel'>
            <div className='carousel-indicators'>
                <button type='button' data-bs-target='#carouselExampleCaptions' data-bs-slide-to='0' className='active btn btn-black' aria-current='true' aria-label='Slide 1'></button>
                <button type='button' data-bs-target='#carouselExampleCaptions' data-bs-slide-to='1' aria-label='Slide 2'></button>
                <button type='button' data-bs-target='#carouselExampleCaptions' data-bs-slide-to='2' aria-label='Slide 3'></button>
            </div>
            <div className='carousel-inner'>
                <div className='carousel-item active justify-content-center'>
                    <img src={`${process.env.PUBLIC_URL}/Banner_1.png`} className='d-block img-fluid mx-auto opacity-75' alt='1'/>
                    <a href='#bestSeller' className='btn btn-outline-dark position-absolute text-uppercase' style={{bottom: '25%', left: '23.5%', border: '2px solid #333', fontSize: '25px'}}>Shop Now</a>
                </div>
                <div className='carousel-item justify-content-center'>
                    <img src={`${process.env.PUBLIC_URL}/Banner_2.png`} className='d-block img-fluid mx-auto' alt='2'/>
                </div>
                <div className='carousel-item justify-content-center'>
                    <img src={`${process.env.PUBLIC_URL}/Banner_3.png`}className='d-block img-fluid mx-auto' style={{height: '90vh'}} alt='3'/>
                </div>
            </div>
            <button className='carousel-control-prev' type='button' data-bs-target='#carouselExampleCaptions' data-bs-slide='prev'>
                <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                <span className='visually-hidden'>Previous</span>
            </button>
            <button className='carousel-control-next' type='button' data-bs-target='#carouselExampleCaptions' data-bs-slide='next'>
                <span className='carousel-control-next-icon' aria-hidden='true'></span>
                <span className='visually-hidden'>Next</span>
            </button>
</div>
    )
 }

 export default Banner