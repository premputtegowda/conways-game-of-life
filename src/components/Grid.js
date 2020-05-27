import React, { useState, useEffect, useRef } from "react";
import Cell from "./Cell";

function Grid() {
    const [grid, setGrid] = useState([]);
    const [go, setGo] = useState(0)
    const [randomGen, setRandomGen] = useState(false)
    const [size, setSize] = useState({xDimension:10, yDimension:10})
    const [speed, setSpeed] = useState(5)
    const intervalRef = useRef(null);
    console.log('state', grid)
    console.log("x", size.xDimension)
    console.log("y", size.yDimension)
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
    function algo() {
        let clone = []
        clone = JSON.parse(JSON.stringify(grid));
      //  console.log('grid', grid)
      //  console.log('this is clone',clone)
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
          // checks2.forEach(r => console.log("value: ", r))
          let count = checks2.reduce((acc, curr) => acc + curr);
          // if the current grid value = 1 and count = 2 or 3 don't do anything
          // if the current gird value =1 and the count > 3 or  < 2 change the value to 0
          // if current grid value is 0 and the count == 3 then change the value 1
          if (grid[x][y] === 1 && (count > 3 || count < 2)) {
            clone[x][y] = 0;
            // console.log("this is true 1", clone[x][y] === grid[x][y])
          } else if (grid[x][y] === 0 && count === 3) {
            clone[x][y] = 1;
            // console.log("this is true 2", clone[x][y] === grid[x][y])
          }
          else console.log('');
        }
      }
      console.log(grid)
      setGrid((grid) =>  grid = JSON.parse(JSON.stringify(clone)));
    }
    useEffect(() => {
      if( go === 0){
        console.log('zero')
      } else {
        algo()
      }
    }, [go])
    const start = () => {
      if (intervalRef.current !== null) {
        return;
      }
      intervalRef.current = setInterval(() =>{
        setGo(go => go + 1);
      }, speed*200);
    };
    const stop = () => {
      if (intervalRef.current === null) {
        return;
      }
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
    function handleChange(e){
      e.preventDefault()
      setSize({...size,[e.target.name]:Number(e.target.value)})
    }
    function handleSpeed(e){
      e.preventDefault()
      setSpeed(e.target.value)
      stop()
      start()
    }
    console.log('random', randomGen)
    return (
      <>
        <button onClick={start}>Start</button>
        <button onClick={stop}> Stop </button>
        <button onClick={() => setRandomGen(!randomGen)}
        >Random</button>
        <form>
          <div>
            <div>
            <input name="speed" type="range" min="1" max="10" step="1" value={speed} onChange={handleSpeed} />
          </div>
            <label>
            xDimension:
              <input type="text" value={size.xDimension} name='xDimension' onChange={handleChange} />
              </label>
              <label>
              yDimension:
              <input type="text" value={size.yDimension} name='yDimension' onChange={handleChange} />
              </label>
            </div>
        </form>
        <div className="grid" style={{ gridTemplateColumns: `repeat(${size.yDimension}, 20px)`}} >
          {grid.map((x, ind1) =>
            x.map((y, ind2) => (
              <div
                onClick={() => {
                  // setCellStatus(!cellStatus)
                  const newGrid = [...grid];
                  newGrid[ind1][ind2] = grid[ind1][ind2] ? 0 : 1;
                  setGrid(newGrid);
                }}
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: grid[ind1][ind2] === 1 ? "blue" : "green",
                  border: "solid 1px black",
                }}
              />
            ))
          )}
        </div>
      </>
    );
}

export default Grid;
