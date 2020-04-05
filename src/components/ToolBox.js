import React from 'react';
import Card from 'react-bootstrap/Card';
import pencilIcon from '.././images/pencil.svg';
import erasorIcon from '.././images/erasor.svg';
import cursorIcon from '.././images/cursor.svg';
import imageIcon from '.././images/image.svg';
import pointerIcon from '.././images/pointer.svg';
import '.././css/ToolBox.css';
import { connect } from 'react-redux';

const ToolBox = (props) => {

  const toggleHandler = (e) => {
    const newState = {
      newId: e.target.id, newIsActive: 1
    }
    props.toggleFn(newState)
  }

  return (
    <div className="w-10 d-flex flex-row" style={{ "position":"absolute","zIndex":"3","paddingTop": "200px" }}>
      <Card className="ml-3 toolbox">
        <Card.Body>
          <div className={"mb-2 " + (props.stateFromStore.buttonData[1].isActive === 1? 'tool-active':'tool')}>
            <img id="1" src={pencilIcon} alt="" onClick={toggleHandler} />
          </div>
          <div className={"mb-2 " + (props.stateFromStore.buttonData[2].isActive === 1? 'tool-active':'tool')}>
            <img id="2" src={erasorIcon} alt="" onClick={toggleHandler} />
          </div>
          <div className={"mb-2 " + (props.stateFromStore.buttonData[3].isActive === 1? 'tool-active':'tool')}>
            <img id="3" src={cursorIcon} alt="" onClick={toggleHandler} />
          </div>
          <div className={"mb-2 " + (props.stateFromStore.buttonData[4].isActive === 1? 'tool-active':'tool')}>
            <img id="4" src={imageIcon} alt="" onClick={toggleHandler} />
          </div>
          <div className={(props.stateFromStore.buttonData[5].isActive === 1? 'tool-active':'tool')}>
            <img id="5" src={pointerIcon} alt="" onClick={toggleHandler} />
          </div>
        </Card.Body>
      </Card>
      {props.stateFromStore.buttonData[1].isActive === 1 ? 
      <Card className="ml-2 pen-panel">
        <Card.Body>
          <div className="d-flex flex-row">
            <div id="11" className = {(props.stateFromStore.color === 1 ? "color-1-active" : "color-1")
            } onClick={toggleHandler}/>
            <div id="12" className = {"ml-3 " + (props.stateFromStore.color === 2 ? "color-2-active" : "color-2")
            } onClick={toggleHandler}/>
            <div id="13" className = {"ml-3 " + (props.stateFromStore.color === 3 ? "color-3-active" : "color-3")
            } onClick={toggleHandler}/>
            <div id="14" className = {"ml-3 " + (props.stateFromStore.color === 4 ? "color-4-active" : "color-4")
            } onClick={toggleHandler}/>
          </div>
        </Card.Body>
      </Card> : <div />}
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
    toggleFn: (changedState) => {
      return dispatch({ type: 'TOGGLE_BUTTON', payload: changedState });
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ToolBox);