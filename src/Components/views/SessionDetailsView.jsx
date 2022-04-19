import React from 'react'
import GameDetails from '../Game/GameDetails'
import { useParams } from 'react-router-dom'

const SessionDetailsView = () => {

  const { id } = useParams();

  return (
    <div className='container'>
      <h2>game view</h2>
      <GameDetails gameId={id}/>
    </div>
  )
} 

export default SessionDetailsView