import React from 'react';
import DemoButton from '.././Auth/DemoButton'
import welcome from '../../static/images/welcome.png';
import UniqueEnE from '../../static/images/UniqueEnE.jpg'; 
import Ingestibles from '../../static/images/Ingestibles.jpg';
import './HomePage.css';


const HomePage = () => {
 
    return (
        <>
            <div style={{display:'flex', marginTop:'7%'}}>  
                <img src={welcome} alt='homepageImages' style={{width:'60%', borderRadius:'5px' }}></img>

                <div style={{ width:'40%', textAlign:'center'}}>
           
                    <h2 style={{ color: '#183a1d', margin: '55% 10% 1%  10%' }}>
                        <span style={{ color: '#f0a04b'}}>Join</span> us to send direct message, chat in groups, and share moments.

                    </h2>
                    <DemoButton info={'TRY A FREE DEMO'} style={{width:'150px'}}/>

                </div>

            </div>
            <div style={{ margin: '5%' }}>
                <div style={{ margin: '3%' }}>
                    <h1 style={{ color: '#f0a04b' }}>
                        {'Technologies & Frameworks:'}
                    </h1>
                    
                </div>
                

                <div style={{display:'flex', gap:'5%', flexWrap:'wrap', width: '50%', marginLeft:'30%'}}>
                    <i className="fab fa-python fa-2x tech" >Python</i>


                    <i className="fab fa-js-square fa-2x tech" >JavaScript</i>


                    <i className="fab fa-react fa-2x tech" >React</i>

                    <i className="devicon-redux-original tech" style={{ fontSize: '40px', color: '#183a1d' }}>Redux</i>

                    <i className="fab fa-html5 fa-2x tech" >Html</i>

                    <i className="fab fa-css3-alt fa-2x tech" >CSS</i>


                    <i className="fab fa-docker fa-2x tech" >Docker</i>

                    <i className="fab fa-aws fa-2x tech" >AWS</i>

                    <i className="devicon-socketio-original tech" style={{ fontSize: '40px', color: '#183a1d' }}>WebSocket</i>

                    <i className="devicon-flask-original" style={{ fontSize: '40px', color: '#183a1d', marginRight: '12%' }}>Flask</i>

                    <i className="devicon-postgresql-plain tech" style={{ fontSize: '40px', color: '#183a1d' }}>Postgresql</i>

                    <i className="devicon-sqlalchemy-plain tech" style={{ fontSize: '40px', color: '#183a1d' }}>Sqlalchemy</i>


                </div>
            </div>

            

            <div style={{ margin: '10% 5%'}}>
                <h1 style={{  textAlign: 'center', color: '#f0a04b' }}> My other projects: </h1>
                <div>
                    <a href='https://uniqueene.herokuapp.com/listings' target="_blank" rel='noreferrer' >
                        <img src={UniqueEnE} alt='project_UniqueEnE' style={{width:'45%', height:'600px',   marginRight:'5%'}}/>
                    </a>
                    <a href='https://ingestibles-app.herokuapp.com/' target="_blank" rel='noreferrer'>
                        <img src={Ingestibles} alt='project_Ingestibles' style={{ width: '45%', height:     '600px' }} />
                    </a>
                </div>
                
            </div>

            <div style={{ textAlign: 'center', color:'#183a1d'}}>
                <h1 style={{ color: '#f0a04b'}}> Contact Me: </h1>
                <h2>
                    <div style={{display:'flex', gap:'2%', justifyContent:'center'}}>
                    Meitong Qu
            
                    <a href='https://github.com/MayUWish' target="_blank" rel='noreferrer' style={{textDecoration:'none'}}>
                        <i className="fab fa-github fa-1x tech" ></i>
                    </a>
                    <a href='https://www.linkedin.com/in/meitongqu/' target="_blank" rel='noreferrer' style={{ textDecoration: 'none' }}>
                        <i className="fab fa-linkedin fa-1x tech" ></i>
                    </a>
                    </div>
                </h2>
                
            </div>
        </>
   
    );
}

export default HomePage;
