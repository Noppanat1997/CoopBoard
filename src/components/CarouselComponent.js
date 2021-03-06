import React from 'react';
import Canvas from './Canvas.js';
import { connect } from 'react-redux';
import Carousel from 'react-bootstrap/Carousel';
import '.././css/CarouselComponent.css';

const CarouselComponent = (props) => {
  let boardIndex
  for (let i = 0; i < props.stateFromStore.boardData.length; i++) {
    if (props.stateFromStore.boardData[i].id === props.board) {
      boardIndex = i
    }
  }
  const mapAllPages = props.stateFromStore.lineData[boardIndex].data.map((item, index, arr) => (
    <Carousel.Item key={item.id} className="text-center">
      <Canvas board={props.board} page={item.id} />
    </Carousel.Item>
  ));
  return (
    <Carousel
      activeIndex={ props.stateFromStore.curPage - 1}
      controls={false}
      indicators={false}
      onSelect={() => { }}
      className="mt-4"
      style={{ position: "relative" }}
    >
      {mapAllPages}
    </Carousel>
  );
}
const mapStateToProps = state => {
  return {
    stateFromStore: state
  }
}
export default connect(mapStateToProps, null)(CarouselComponent);