import React, { useState, useEffect, useRef } from "react";
import Cell from "./Cell";

function Grid() {
    const [grid, setGrid] = useState([]);
    const [go, setGo] = useState(0)
    const [randomGen, setRandomGen] = useState(false)
    const [size, setSize] = useState({xDimension:10, yDimension:10, })
    const [speed, setSpeed] = useState(5)
    const [stopAlgo,setStopAlgo] = useState(false)
    const intervalRef = useRef(null);
    

    function arrayMaker() {
      let xArr = []
      for(let x=0; x < Number(size.xDimension); x++ ){
        let yArr = []
        for(let y=0; y < Number(size.yDimension);y++){
          if (randomGen) {
            yArr[y]=Math.round(Math.random()*1)
          } else {
            yArr[y]=0
          }
        }
        xArr.push(yArr);
      }
      setGrid([...xArr])
    }


  useEffect(()=>{
    arrayMaker();
    
  },[size.xDimension, size.yDimension, randomGen])

  useEffect(() => {
    if (stopAlgo===true){

        stop()

    }
    if( go !== 0 ){
        algo()
    } 
  }, [go,stopAlgo, speed])

    function algo() {
        let flag = true
        let clone = []
        clone = JSON.parse(JSON.stringify(grid));
       

      
      for (let x = 0; x < size.xDimension; x++) {
        for (let y = 0; y < size.yDimension; y++) {
          let checks2 = [
            grid[(size.xDimension + (x - 1)) % size.xDimension][
              (size.yDimension + (y - 1)) % size.yDimension
            ],
            grid[(size.xDimension + (x + 0)) % size.xDimension][
              (size.yDimension + (y - 1)) % size.yDimension
            ],
            grid[(size.xDimension + (x + 1)) % size.xDimension][
              (size.yDimension + (y - 1)) % size.yDimension
            ],
            grid[(size.xDimension + (x + 1)) % size.xDimension][
              (size.yDimension + (y + 0)) % size.yDimension
            ],
            grid[(size.xDimension + (x - 1)) % size.xDimension][
              (size.yDimension + (y + 0)) % size.yDimension
            ],
            grid[(size.xDimension + (x - 1)) % size.xDimension][
              (size.yDimension + (y + 1)) % size.yDimension
            ],
            grid[(size.xDimension + (x + 0)) % size.xDimension][
              (size.yDimension + (y + 1)) % size.yDimension
            ],
            grid[(size.xDimension + (x + 1)) % size.xDimension][
              (size.yDimension + (y + 1)) % size.yDimension
            ],
          ];
          
          let count = checks2.reduce((acc, curr) => acc + curr);
          // if the current grid value = 1 and count = 2 or 3 don't do anything
          // if the current gird value =1 and the count > 3 or  < 2 change the value to 0
          // if current grid value is 0 and the count == 3 then change the value 1
          if (grid[x][y] === 1 && (count > 3 || count < 2)) {
            clone[x][y] = 0;
            flag = false;
            // console.log("this is true 1", clone[x][y] === grid[x][y])
          } else if (grid[x][y] === 0 && count === 3) {
            clone[x][y] = 1;
            flag = false;
          }
          else {
              clone[x][y] = grid[x][y]
          };
        }
        
      }
        setStopAlgo(flag);
        
    
         setGrid([...clone])
    }
    
    const start = () => {
      if (intervalRef.current !== null) {
        return;
      }
      intervalRef.current = setInterval(() =>{
        setGo(go => go + 1);
        
      },  speed*200);
    };
    const stop = () => {
      if (intervalRef.current === null) {
        return;
      }
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };

    const reset = () => {
        stop();
        setGo(0);
        setRandomGen(false)
        setStopAlgo(false)
        arrayMaker()
        
    
    }
    function handleChange(e){
      e.preventDefault()
      setSize({...size,[e.target.name]:Number(e.target.value)})
    }
    function handleSpeed(e){
      e.preventDefault()
      setSpeed(e.target.value)
      stop()
     
     if(go !== 0){
         start()
     }
      
    }
    console.log('random', randomGen)
    return (
      <div className='grid-container'>
        <div className="btn">
            <button onClick={start} disabled={stopAlgo}>Start</button>
            <button onClick={stop} disabled={stopAlgo}> Stop </button>
            <button onClick={reset}> Clear </button>
            <button onClick={() => 
            {
               
                setRandomGen(true)
                
            }
        }
            disabled={stopAlgo}>Random</button>

        </div>
        <div className="slider-container" >
            <label> Speed: {speed*200} milli seconds
            <input className='slider'name="speed" type="range" min="1" max="10"  value={speed} onChange={handleSpeed} />
            </label>
        </div>
        
        <form>
          <div>
            
            <label>
            Rows:
              <input type="text" value={size.xDimension} name='xDimension' onChange={handleChange} />
              </label>
              <label>
              Columns:
              <input type="text" value={size.yDimension} name='yDimension' onChange={handleChange} />
              </label>
              
            </div>
        </form>
        <div > <span className='generations'>Generations:</span> {stopAlgo ? go-1: go} </div>       
        <div className='warning'>{stopAlgo ? "All cells stopped reproducing or died. Please clear and start over":""}</div>
            
     
        
        <div className="grid" 
        style = {{"--cols":`${size.yDimension}`}}
        
        >
          {grid.map((x, ind1) =>
            x.map((y, ind2) => (
              <div
                onClick={() => {
                  // setCellStatus(!cellStatus)
                  const newGrid = [...grid];
                  newGrid[ind1][ind2] = grid[ind1][ind2] ? 0 : 1;
                  setGrid(newGrid);
                }}
                className = {`grid-cell${grid[ind1][ind2] === 1 ? ' grid-cell-alive':''}`}
                style={{"--cols":`${size.yDimension}`}}
              />
            ))
          )}
          
          
        </div>
    </div>  
    );
}

export default Grid;
