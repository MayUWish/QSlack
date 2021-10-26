import React from 'react';


function CloseModalButton({  setShowModal }) {  
    return ( 
            <button style={{ display: 'inline-block', marginLeft:'90%' }}
                className='smallBtn'
                onClick={e => setShowModal(false)}>
                X</button>
            
    );
}
export default CloseModalButton;