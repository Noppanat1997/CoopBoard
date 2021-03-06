import React, { useState } from 'react';
import EachCard from './EachCard.js';
import Draggable from 'react-draggable';
import '.././css/StackCard.css';
import { connect } from 'react-redux';

const StackCard = (props) => {
  const [state, setState] = useState({
    isHolding: false,
    onCard: false
  });
  const onMouseUpHandler = (e) => {
    setState({ ...state, isHolding: false, onCard: false })
    if (state.onCard) {
      onDropAreaHandler()
    }
  }
  const onDropAreaHandler = () => {
    props.onDropAreaFn({ isHolding: false, isDrop: true })
  }
  const onMouseMoveHandler = (e) => {
    //Original
    //if (!state.onCard && e.screenY >= 268 && e.screenY <= 1068 && e.screenX <= 1710 && e.screenX >= 210)
    //SaltAtWork Only
    //if (!state.onCard && e.screenY >= 268 && e.screenY <= 1068 && e.screenX <= 1100 && e.screenX >= 210)
    if (!state.onCard && e.screenY >= 268 && e.screenY <= 1068 && e.screenX <= 1100 && e.screenX >= 210) {
      setState({ ...state, isHolding: false })
      props.onDropAreaFn({ isHolding: false, isDrop: false })
    }
  }
  return (
    <div className={(state.isHolding === true ? 'stack-card-active' : 'stack-card')}
      onMouseEnter={() => { setState({ ...state, isHolding: true }) }}
      onMouseMove={onMouseMoveHandler}
      onMouseLeave={() => { setState({ ...state, isHolding: false }) }}
    >
      <Draggable position={{ x: 0, y: 0 }}
        onMouseDown={() => { props.onDropAreaFn({ isHolding: true, isDrop: false }) }}
        onStart={() => { setState({ ...state, isHolding: true, onCard: true }) }}
        onStop={onMouseUpHandler}
      >
        <div>
          <EachCard id="1" name={"Post-It"} color={"#D4145A"} />
        </div>
      </Draggable>
      <Draggable position={{ x: 0, y: -100 }}
        onMouseDown={() => { props.onDropAreaFn({ isHolding: true, isDrop: false }) }}
        onStart={() => { setState({ ...state, isHolding: true, onCard: true }) }}
        onStop={onMouseUpHandler}
      >
        <div>
          <EachCard id="2" name={"Checklist"} color={"#0071BC"} />
        </div>
      </Draggable>
      <Draggable position={{ x: 0, y: -200 }}
        onMouseDown={() => { props.onDropAreaFn({ isHolding: true, isDrop: false }) }}
        onStart={() => { setState({ ...state, isHolding: true, onCard: true }) }}
        onStop={onMouseUpHandler}
      >
        <div>
          <EachCard id="3" name={"Calendar"} color={"#202C5D"} />
        </div>
      </Draggable>
      <Draggable position={{ x: 0, y: -300 }}
        onMouseDown={() => { props.onDropAreaFn({ isHolding: true, isDrop: false }) }}
        onStart={() => { setState({ ...state, isHolding: true, onCard: true }) }}
        onStop={onMouseUpHandler}
      >
        <div>
          <EachCard id="6" name={"Url"} color={"#D4145A"} />
        </div>
      </Draggable>
      <Draggable position={{ x: 0, y: -400 }}
        onMouseDown={() => { props.onDropAreaFn({ isHolding: true, isDrop: false }) }}
        onStart={() => { setState({ ...state, isHolding: true, onCard: true }) }}
        onStop={onMouseUpHandler}
      >
        <div>
          <EachCard id="7" name={"Code"} color={"#0071BC"} />
        </div>
      </Draggable>
      <Draggable position={{ x: 0, y: -500 }}
        onMouseDown={() => { props.onDropAreaFn({ isHolding: true, isDrop: false }) }}
        onStart={() => { setState({ ...state, isHolding: true, onCard: true }) }}
        onStop={onMouseUpHandler}
      >
        <div>
          <EachCard id="8" name={"Video"} color={"#202C5D"} />
        </div>
      </Draggable>
    </div>

  );
}
const mapStateToProps = state => {
  return {
    stateFromStore: state
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onDropAreaFn: (onDropArea) => {
      return dispatch({ type: 'UPDATE_ON_DROP_AREA', payload: onDropArea });
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(StackCard);