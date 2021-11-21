import React from 'react';
import DemoButton from '../auth/DemoButton'
import Carousel from "react-responsive-carousel/lib/js/components/Carousel/index";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import homeImg0 from '../../static/images/homeImg0.jpeg';
import homeImg1 from '../../static/images/homeImg1.jpeg';
import homeImg2 from '../../static/images/homeImg2.jpeg';
import homeImg3 from '../../static/images/homeImg3.jpeg';
import homeImg4 from '../../static/images/homeImg4.jpeg';
import homeImg5 from '../../static/images/homeImg5.jpeg';
import homeImg6 from '../../static/images/homeImg6.jpeg';
import app from '../../static/images/app.jpg';
import UniqueEnE from '../../static/images/UniqueEnE.jpg'; 
import Ingestibles from '../../static/images/Ingestibles.jpg';
import './HomePage.css';


const HomePage = () => {
 
    return (
        <>
            <div style={{display:'flex', marginTop:'3%'}}>  

                <div style={{ width: '60%'}}>
                    <Carousel infiniteLoop={true} autoPlay={true} interval={2800} showArrows={false}   showIndicators={true} showStatus={false} showThumbs={false}>
                        <div>
                            <img className="homeImage" alt="homeImage1" src={homeImg0} />
                        </div>
                        <div>
                            <img className="homeImage" alt="homeImage2" src={homeImg1} />
                        </div>
                        <div>
                            <img className="homeImage" alt="homeImage3" src={homeImg2} />
                        </div>
                        <div>
                            <img className="homeImage" alt="homeImage4" src={homeImg3} />
                        </div>
                        <div>
                            <img className="homeImage" alt="homeImage5" src={homeImg4} />
                        </div>
                        <div>
                            <img className="homeImage" alt="homeImage6" src={homeImg5} />
                        </div>
                        <div>
                            <img className="homeImage" alt="homeImage6" src={homeImg6} />
                        </div>

                    </Carousel>
                </div>
                <div style={{ width:'40%', textAlign:'center'}}>
           
                    <h2 style={{ color: '#183a1d', margin: '50% 10% 1%  10%' }}>
                        <span style={{ color: '#f0a04b'}}>Join</span> us to send direct messages, chat in groups, and share moments.

                    </h2>
                    <DemoButton info={'TRY A FREE DEMO'} style={{width:'150px'}}/>

                </div>

            </div>
            <div style={{ margin: '5%'}}>
                <div>
                    <h2 style={{ color: '#f0a04b' }}>
                        {'Technologies & Frameworks:'}
                    </h2>
                    
                </div>
                
                <div style={{ display: 'flex'}}>
                    <div style={{ display: 'flex', gap: '5%', flexWrap: 'wrap', width: '50%', marginLeft:   '1%'}}>
                        <div>
                            <i className="devicon-python-plain tech">Python</i>
                        </div>

                        <div>
                            <i className="devicon-javascript-plain tech">JavaScript</i>
                        </div>

                        <div>
                            <i className="devicon-react-original tech">React</i>
                        </div>

                        <div>
                            <i className="devicon-redux-original tech" >Redux</i>
                        </div>

                        <div>
                            <i className="devicon-html5-plain tech">HTML</i>
                        </div >

                        <div>
                            <i className="devicon-css3-plain tech">CSS</i>
                        </div >

                        <div>
                            <i className="devicon-flask-original tech" >Flask</i>
                        </div >

                        <div>
                            <i className="devicon-postgresql-plain tech" >PostgreSQL</i>
                        </div >

                        <div>
                            <i className="devicon-sqlalchemy-plain tech" >SQLAlchemy</i>
                        </div >

                        <div>
                            <i className="devicon-socketio-original tech" >WebSocket</i>
                        </div >

                        <div>
                            <i className="devicon-docker-plain tech">Docker</i>
                        </div >

                        <div>
                            <i className="fab fa-aws fa-2x tech" >AWS</i>
                        </div >

                    </div>

                    <div style={{display:'flex', alignItems:'center'}}>
                        <img src={app} alt='qslack' style={{ width: '100%'}} />
                    </div>
                    

                </div>
                
            </div>

            

            <div style={{ margin: '5%', backgroundColor: '#e1eedd'}}>
                <h2 style={{  textAlign: 'center', color: '#f0a04b' }}> My other projects: </h2>
                <div>
                    <a href='https://uniqueene.herokuapp.com/listings' target="_blank" rel='noreferrer' >
                        <img src={UniqueEnE} alt='project_UniqueEnE' style={{ width: '40%', height: '350px', margin: '2% 5%', cursor: 'pointer', borderRadius:'5px'}}/>
                    </a>
                    <a href='https://ingestibles-app.herokuapp.com/' target="_blank" rel='noreferrer'>
                        <img src={Ingestibles} alt='project_Ingestibles' style={{ width: '40%', height: '350px', margin: '2% 5%', cursor: 'pointer', borderRadius: '5px'}} />
                    </a>
                    
                </div>
                
            </div>

            <div style={{ textAlign: 'center', color: '#183a1d'}}>
                <h2 style={{ color: '#f0a04b', margin:'0'}}> Contact: </h2>
                
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems:'center'}}>
                        <h2>Meitong Qu</h2>
                    
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <a href='https://github.com/MayUWish' target="_blank" rel='noreferrer' style={  {textDecoration:'none'}}>
                                <i className="fab fa-github fa-1x tech2" ></i>
                            </a>

                            <a href='https://www.linkedin.com/in/meitongqu/' target="_blank" rel='noreferrer' style={{  textDecoration: 'none' }}>
                             <i className="fab fa-linkedin fa-1x tech2" ></i>
                            </a>

                            <a href="https://mayuwish.github.io/" rel="noreferrer" target="_blank" style={{ textDecoration: 'none' }}>
                                <i className="fas fa-address-card tech2" ></i>
                            </a>
                        </div>
                    </div>
                
                
            </div>
        </>
   
    );
}

export default HomePage;
