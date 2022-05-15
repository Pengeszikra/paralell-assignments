import {useEffect, useState, useCallback, FC} from 'react';
import '../../styles/live-games.scss';

const cellSize = 22;
const gridWidth = 15;
const gridHeight = 15;

const hash:()=>string = () =>  Math.random().toString(32).slice(-7);

export interface ICell {
  cell: boolean,
  hash: string,
}

export type TArea = ICell[];

export const inRange = (low:number, high:number ) => (value:number) => value >= low && value <= high;

export const calcNeighboursDistances:(width:number, height:number) => number[][] = 
  (width:number, height:number) => {
    const neighboursDistance:number[] = [
      -1 -width, -width, +1-width,
      -1, +1,
      -1 +width, +width, +1+width,
    ];

    const leftBorder:number[] = [1, 2, 4, 6, 7];
    const rightBorder:number[] = [0, 1, 3, 5, 6];

    const withoutLeftBorder:(x:number) => (d:number, n:number) => boolean = 
      (x:number) => (distance:number, neighbourDistanceIndex:number) => x === 0 
        ? leftBorder.includes(neighbourDistanceIndex)
        : true
      ;

    const withoutRightBorder:(x:number) => (d:number, n:number) => boolean = 
      (x:number) => (distance:number, neighbourDistanceIndex) => x === width-1 
        ? rightBorder.includes(neighbourDistanceIndex)
        : true
      ;

    const amount:number = width * height;
    const isInside:(n:number) => boolean = inRange(0, amount - 1);

    return Array(amount)
      .fill(0)
      .map(
        (_, index:number) => {
          const x:number = index % width;
          return neighboursDistance
            .filter(withoutLeftBorder(x))
            .filter(withoutRightBorder(x))
            .map((distance:number) => distance + index)
            .filter((distance:number) => isInside(distance))
          ;
        }
      )
    ;
  };
 
export const LiveGame:FC = () => {
  const [area, setArea] = useState<TArea>([]);
  const [debugNh, setDebugNh] = useState<number[]>([]);
  const [round, setRound] = useState<number>(0);
  const [countOfPlay, setCountOfPlay] = useState<number>(0);
  const [width, setWidth] = useState<number>(gridWidth);
  const [height, setHeight] = useState<number>(gridHeight);

  const neighboursIndex:number[][] = useCallback(calcNeighboursDistances(width, height), [width, height]);

  useEffect(() => console.log(neighboursIndex), [neighboursIndex]);

  useEffect(() => {
    const defaultArea:TArea = Array(width * height)
      .fill({cell:false, hash:''})
      .map(_ => ({cell: Math.random() > .75, hash:hash()}))
    setArea(defaultArea);
    setRound(0);
    const amountOfNeighbours:(position:number) => number = countNeighbours(defaultArea);
    setDebugNh(defaultArea.map((_,i) => amountOfNeighbours(i)));

  }, [countOfPlay])
  
  /*

    Any live cell with fewer than two live neighbours dies, as if by underpopulation.
    Any live cell with two or three live neighbours lives on to the next generation.
    Any live cell with more than three live neighbours dies, as if by overpopulation.
    Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

  */

  const countNeighbours = (area:TArea) => (position:number) => neighboursIndex[position].reduce(
    (count:number, neighbourIndex:number) => count = area[neighbourIndex].cell
      ? count + 1
      : count
    ,0
  );

  const nextGeneration:(old:TArea) => TArea = parentArea => {
    const amountOfNeighbours:(position:number) => number = countNeighbours(parentArea);
    
    const mustDie = (acu:Object ,cell:ICell, position:number) => !inRange(2,3)(amountOfNeighbours(position)) 
      ? {...acu, [cell.hash]:true}
      : acu
    ;
    const mustBorn = (acu:Object, cell:ICell, position:number) => amountOfNeighbours(position) === 3
      ? {...acu, [cell.hash]:true}
      : acu
    ;

    const dieHashes:{} = parentArea.reduce(mustDie, {});
    const bornHashes:{} = parentArea.reduce(mustBorn, {});

    const dieProgress = ({cell, hash}:ICell) => ({
      cell: dieHashes?.[hash] ? false : cell, 
      hash
    });

    const bornProgress = ({cell, hash}:ICell) => ({
      cell: bornHashes?.[hash] ? true : cell, 
      hash
    });


    return parentArea
      .map(dieProgress)
      .map(bornProgress)
    ;
  }


  useEffect(() => {
    if (round === 0) return null;
    const newGeneration = nextGeneration(area);
    setArea(newGeneration);
    const amountOfNeighbours:(position:number) => number = countNeighbours(newGeneration);
    setDebugNh(newGeneration.map((_,i) => amountOfNeighbours(i)));
  }, [round, width, height]);

  return (
    <section>
      <h2>Live Game Assigment</h2>
      <p>round: {round}</p>
      <button onClick={() => setRound(r => r+1)}>next step</button>
      <button onClick={() => setCountOfPlay(r => r + 1)}>random</button>
      <section className="live-area" style={{gridTemplate: `repeat(${height}, ${cellSize}px) / repeat(${width}, ${cellSize}px)`}}>
        {
          area.map(({cell, hash}, index) => (
            <div className="cell" key={hash} data-cell={cell}>{debugNh?.[index]}</div>
          ))
        }
      </section>
    </section>
  )
}