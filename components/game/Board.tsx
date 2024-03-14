import { useCallback, useEffect, useMemo, useState } from "react";
import Tile from "./Tile";

import { useAtom, useAtomValue } from "jotai";
import { victory as vic, player as p } from "@/atoms/victory";
type TileType = "x" | "o" | undefined;

const Board: React.FC = () => {
  const player = useAtomValue(p);
  const [victory, setVictory] = useAtom(vic);
  const [computerPlaying, setComputerPlaying] = useState(false);
  const board: TileType[][] = useMemo(
    () => [
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
    ],
    [player]
  );

  useEffect(() => {
    setVictory(undefined)
    board.map((row, i) => {
      board[i] = [undefined, undefined, undefined];
    });
    if(turn != player){
      setTimeout(()=>{
        computerTurn()
      }, 100)
    }
  }, [player, board]);

  const [turn, setTurn] = useState<"x" | "o">("x");

  const checkVictory = useCallback(() => {
    const checker = [0, 1, 2];
    
    const conditions = [
      checker.some((rowIndex) =>
        checker.every((colIndex) => board[colIndex][rowIndex] == turn)
      ),
      checker.some((rowIndex) =>
        checker.every((colIndex) => board[rowIndex][colIndex] == turn)
      ),
      checker.every((rowIndex) => board[rowIndex][rowIndex] == turn),
      checker.every((rowIndex) => board[rowIndex][2 - rowIndex] == turn),
    ];
    const victory = conditions.some((value) => value);

    if (victory) {
      setVictory(turn);
    }
  }, [turn, board, setVictory]);

  const handleTurn = useCallback(() => {
    checkVictory();
    const newTurn = turn == "x" ? "o" : "x";
    
    setTurn(newTurn);

   
  }, [turn, player]);

const checkTie = useCallback(()=>{
  return board.every(row=> row.every(tile=> tile))

}, [board])

  useEffect(()=>{
    const tie = checkTie()
    if(tie){
      setVictory("tie")
      return
    }
    if(turn != player){
      setTimeout(()=>{
        computerTurn()
      }, 100)
    }
  }, [turn])



  const computerTurn = () => {    
    const patternsToFill = [
      [[0, 0], [0, 1], [0, 2]], 
      [[1, 0], [1, 1], [1, 2]], 
      [[2, 0], [2, 1], [2, 2]], 
      [[0, 0], [1, 0], [2, 0]], 
      [[0, 1], [1, 1], [2, 1]], 
      [[0, 2], [1, 2], [2, 2]], 
      [[0, 0], [1, 1], [2, 2]], 
      [[0, 2], [1, 1], [2, 0]], 
    ];
  
    for (const pattern of patternsToFill) {
      const filledCount = pattern.reduce(
        (count, [rowIndex, colIndex]) =>
          count + (board[rowIndex][colIndex] === turn ? 1 : 0),
        0
      );
      if (filledCount === 2) {
        
        const emptyTile = pattern.find(
          ([rowIndex, colIndex]) => !board[rowIndex][colIndex]
        );
        if (emptyTile) {
          const [rowIndex, colIndex] = emptyTile;
          handleClick(rowIndex, colIndex); 
          return;
        }
      }
    }
  
    const availableTiles: { rowIndex: number; colIndex: number }[] = [];
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (!board[i][j]) {
          availableTiles.push({ rowIndex: i, colIndex: j });
        }
      }
    }
    const randomIndex = Math.floor(Math.random() * availableTiles.length);
    const { rowIndex, colIndex } = availableTiles[randomIndex];
    handleClick(rowIndex, colIndex); 
  };

  const handleClick = (rowIndex: number, colIndex: number) => {
    if (victory || board[rowIndex][colIndex]) return;
    
    board[rowIndex][colIndex] = turn;
    handleTurn();
  };

  return (
    <div className="board flex flex-col w-[30vw] mb-40">
      {board && board.length > 0 ? (
        board.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="row flex even:border-b-2 even:border-t-2"
          >
            {row.map((tile, colIndex) => (
              <Tile
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleClick(rowIndex, colIndex)}
                user={board[rowIndex][colIndex] === player}
                checked={board[rowIndex][colIndex]}
              />
            ))}
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default Board;
