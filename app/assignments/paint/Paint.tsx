import {useEffect, useState, FC} from 'react';
import {Button} from 'react-bootstrap';

export const jlog = p => JSON.stringify(p);

export const Paint:FC = ({width = window.innerWidth, height = window.innerHeight}) => {
  const [points, setPoints] = useState([]);
  const [draw, setDraw] = useState([]);

  const viewBox = `0 0 ${width} ${height}`;
  const interactions = {
    onMouseDown : ({clientX, clientY}) => setDraw([clientX, clientY]),
    onMouseUp   : ({clientX, clientY}) => {
      if (draw.length >= 4) setPoints(p => [...p, [...draw]]);
      setDraw([])
    },
    onMouseMove : ({clientX, clientY}) => draw.length >= 2 && setDraw(([x,y]) => [x, y, clientX, clientY]),
  }

  const handleClear = event => {
    event.preventDefault();
    console.log('handleClear')
    setPoints([]);
    setDraw([]);
  };

  const handleUndo = event => {
    event.preventDefault();
    console.log('handleUndo')
    setPoints(pts => pts.slice(0, pts.length - 1));
    setDraw([]);
  };

  return (
    <main style={{height}}>
      { true && (
        <pre className="debug-panel absolute">
          {`
            draw: ${jlog(draw)}
          points: ${jlog(points.slice(-3))}
          `}
        </pre>
      )}
      <svg viewBox={viewBox} style={{position:'absolute', zIndex:1, margin:0, padding:0, display:'block', top:0, left:0}} {...interactions} >
        <g stroke="#000" fill="none">
          {points.map( (line, key) => <polygon points={line} key={key} />)}
          {draw.length >= 4 && <polygon points={draw} strokeDasharray={[1,8]}/>}
        </g>
      </svg>
      <pre className="absolute" style={{bottom: 200, zIndex:10, position:'absolute', display:'block'}}>
        <Button onClick={handleClear} variant="secondary" size="sm">clear</Button>
        <Button onClick={handleUndo} variant="secondary" size="sm">undo</Button>
      </pre>
    </main>
  )
}