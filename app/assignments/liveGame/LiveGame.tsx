import {useEffect, useState, useCallback, FC} from 'react';
import '../../styles/live-games.scss';

const hash:()=>string = () =>  Math.random().toString(32).slice(-7);

export interface ICell {
  cell: boolean,
  hash: string,
}

export type Area = ICell[];

export const inRange = (low:number, high:number ) => (value:number) => value >= low && value <= high;

export const calcNeighboursDistances:(width:number, height:number) => number[][] = 
  (width:number, height:number) => {
    const neighboursDistance:number[] = [
      -1 -width, -width, +1-width,
      -1, +1,
      -1 +width, +width, +1+width,
    ];

    const leftBorder:number[] = [1,2,4,6,7];
    const rightBorder:number[] = [1,2,4,6,7];

    const amount:number = width * height;
    const isInside:(n:number) => boolean = inRange(0, amount - 1);

    return Array(amount)
      .fill(0)
      .map(
        (_, index:number) => {
          const x:number = index / width | 0;
          return neighboursDistance
            .filter((distance:number, neighbourDistanceIndex) => x === 0 
              ? leftBorder.includes(neighbourDistanceIndex)
              : true
            )
            .filter((distance:number, neighbourDistanceIndex) => x === width-1 
              ? rightBorder.includes(neighbourDistanceIndex)
              : true
            )
            .map((distance:number) => distance + index)
            .filter((distance:number) => isInside(distance))
          ;
        }
      )
    ;
  };
 
export const LiveGame:FC = () => {
  const [area, setArea] = useState<Area>([]);
  const [round, setRound] = useState<number>(0);
  const [width, setWidth] = useState<number>(30);
  const [height, setHeight] = useState<number>(30);

  const neighboursIndex = useCallback(calcNeighboursDistances(width, height), [width, height]);

  useEffect(() => {
    const defaultArea:Area = Array(width * height)
      .fill({cell:false, hash:''})
      .map(cell => ({cell: Math.random() > .75, hash:hash()}))
    setArea(defaultArea);
    setRound(0);
  }, [width, height])
  
  /*

    Any live cell with fewer than two live neighbours dies, as if by underpopulation.
    Any live cell with two or three live neighbours lives on to the next generation.
    Any live cell with more than three live neighbours dies, as if by overpopulation.
    Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

  */

  const countNeighbours = (area:Area) => (position:number) => neighboursIndex[position].reduce(
    (count:number, neighbourIndex:number) => count = area[neighbourIndex] 
      ? count + 1 
      : count
    ,0
  );

  useEffect(() => {
    setArea(parentArea => {
      const amountOfNeighbours:(position:number) => number = countNeighbours(parentArea);
      const mustToDie = (cell:ICell, position:number) => inRange(2,3)(amountOfNeighbours(position)) ;
      const mustToLive = (cell:ICell, position:number) => amountOfNeighbours(position) === 3;
      const dieList = parentArea.filter(mustToDie);
      const liveList = parentArea.filter(mustToLive);
      return parentArea.map(
        ({cell, hash}) => ({cell, hash})
      );
    })
  }, [round, width, height]);

  return (
    <section>
      <h2>Live Game Assigment</h2>
      <p>round: {round}</p><button onClick={() => setRound(r => r+1)}>next step</button>
      <section className="live-area">
        {
          area.map(({cell, hash}) => <div className="cell" key={hash} data-cell={cell}  />)
        }
      </section>
    </section>
  )
}