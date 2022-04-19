import React from 'react'
import GameDetails from '../Game/GameDetails'
import { useParams } from 'react-router-dom'

const GameView = () => {

  const { id } = useParams();

  return (
    <div className='container'>
      <GameDetails gameId={id}/>
    </div>
  )
}

export default GameView