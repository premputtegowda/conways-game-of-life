import React, {useState, useEffect}from "react";


function Grid(){

    const [outerLen, setOuterLen] = useState(10)
    const [innerLen, setInnerLen] = useState(10);
    const [grid, setGrid] = useState(null)
    
    function createGrid() {
        const outerArr = []
        const innerArr = []
        for(let i = 0; i < outerLen; i++){
            
            for(let j=0; j < innerLen; j++ ){
                innerArr[j] = 0; 
                
        }
        outerArr.push(innerArr)
       
        
    }
    setGrid(outerArr)
}
    useEffect(()=>{
        createGrid()
    },[])
    console.log("grid: ", !grid)

    if(!grid){
        return (
            <div>
                Loading grid...
            </div>
        )
    } else {
        return (
            <div className='grid'>
                {grid.map((outer,index) => (
                    outer.map((inner,index)=> (
                        <div style = {{width:20, height:20,
                        border:"1px dotted black",
                        backgroundColor: inner[index]===1 ? 'green':'blue'}}>

                        </div>
                    ))
                ))}
            </div>
        )
    }
    
}

export default Grid;