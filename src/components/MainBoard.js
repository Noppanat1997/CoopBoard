import React from 'react';
import CarouselComponent from './CarouselComponent.js';
import StackCard from './StackCard.js';
import ToolBox from './ToolBox.js';
import ChatBox from './ChatBox.js';

const MainBoard = (props) => {
  return (
    <div>
      <ChatBox board={props.board} page={props.page}/>
      <ToolBox board={props.board} page={props.page}/>
      <StackCard />
      <CarouselComponent board={props.board} page={props.page} />

    </div>
  );
}

export default MainBoard;