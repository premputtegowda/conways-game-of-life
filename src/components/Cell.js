import React from 'react';


function Cell(props) {
    const {outerIndex, innerIndex, grid, handleClick} = props;

  return (
    <div 
        className = {`grid-cell${grid[outerIndex][innerIndex] === 1 ? ' grid-cell-alive':''}`}
        onClick={()=> {(handleClick(outerIndex,innerIndex))}}
    >
        {grid[outerIndex][innerIndex]}
        
        
    </div>
  );
}

export default Cell;



