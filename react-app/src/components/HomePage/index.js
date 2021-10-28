import React from 'react';
import DemoButton from '../auth/DemoButton'
import welcome from '../../static/images/welcome.png';
import UniqueEnE from '../../static/images/UniqueEnE.jpg'; 
import Ingestibles from '../../static/images/Ingestibles.jpg';
import './HomePage.css';


const HomePage = () => {
 
    return (
        <>
            <div style={{display:'flex', marginTop:'3%'}}>  
                <img src={welcome} alt='homepageImages' style={{width:'60%', borderRadius:'5px' }}></img>

                <div style={{ width:'40%', textAlign:'center'}}>
           
                    <h2 style={{ color: '#183a1d', margin: '50% 10% 1%  10%' }}>
                        <span style={{ color: '#f0a04b'}}>Join</span> us to send direct message, chat in groups, and share moments.

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
                

                <div style={{ display: 'flex', gap: '5%', flexWrap: 'wrap', width: '50%', marginLeft: '3%'}}>
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
                        <i className="devicon-html5-plain tech">Html</i>
                    </div >

                    <div>
                        <i className="devicon-css3-plain tech">CSS</i>
                    </div >

                    <div>
                        <i className="devicon-flask-original tech" >Flask</i>
                    </div >

                    <div>
                        <i className="devicon-postgresql-plain tech" >Postgresql</i>
                    </div >

                    <div>
                        <i className="devicon-sqlalchemy-plain tech" >Sqlalchemy</i>
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
                
            </div>

            

            <div style={{ margin: '5%', backgroundColor: '#e1eedd'}}>
                <h2 style={{  textAlign: 'center', color: '#f0a04b' }}> My other projects: </h2>
                <div>
                    <a href='https://uniqueene.herokuapp.com/listings' target="_blank" rel='noreferrer' >
                        <img src={UniqueEnE} alt='project_UniqueEnE' style={{width:'45%', height:'600px',   margin:'2% 2%'}}/>
                    </a>
                    <a href='https://ingestibles-app.herokuapp.com/' target="_blank" rel='noreferrer'>
                        <img src={Ingestibles} alt='project_Ingestibles' style={{ width: '45%', height: '600px', margin: '2% 2%' }} />
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
                        </div>
                    </div>
                
                
            </div>
        </>
   
    );
}

export default HomePage;
