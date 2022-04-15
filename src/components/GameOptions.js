import React from 'react';
import PropTypes from 'prop-types'

const Gameoptions = ({gameoptions,handlerFn}) => {
    if (!gameoptions?.length) throw alert('Invalid options parameter')
    
    return (
        <div className="flex m-auto">
           { gameoptions.map((opt,index)=>(<button key={index} className="p-3 border m-2 hover:bg-blue-200" onClick={()=>handlerFn(opt)}>{opt}</button>))}
        </div>
    );
}

Gameoptions.propTypes = {
   gameoptions: PropTypes.array,
   handlerFn: PropTypes.func
  }

export default Gameoptions;
