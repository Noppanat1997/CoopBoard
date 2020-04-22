import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Logo from '.././images/logo.svg';
import html2canvas from 'html2canvas';
import history from '.././history';
import '.././css/Header.css';
import {UncontrolledPopover, PopoverHeader, PopoverBody} from 'reactstrap';

import * as action from '../actions'

class Header extends Component {
  constructor(props) {
    super(props);
    this.togglePresent = this.togglePresent.bind(this);
    let boardIndex
    // console.log(this.props.board)
    for (let i = 0; i < this.props.stateFromStore.boardData.length; i++) {
      if(this.props.stateFromStore.boardData[i].id === this.props.board){
        boardIndex = i
        break;
      }
    }
    let pageIndex
    // console.log(this.props.stateFromStore.cardData)
    // if(this.props.path != "list")
    if(this.props.stateFromStore.cardData[boardIndex] !== null && this.props.path != "list")
    for (let i = 0; i < this.props.stateFromStore.cardData[boardIndex].data.length; i++) {
      if(this.props.stateFromStore.cardData[boardIndex].data[i].id === this.props.page){
        pageIndex = i
        break;
      }
    }
    // if(this.props.path != "list")
    // console.log(this.props.stateFromStore.boardData,boardIndex,this.props.board)
    this.state = {
      boardName: this.props.path != "list" ? this.props.stateFromStore.boardData[boardIndex].name : "",
      pageIndex: pageIndex,
      boardIndex: boardIndex,
      Email : '',
      str: "",
      memberList: []
    }
  }
  onInputChange(event) {
    this.setState({
      [event.target.name] : event.target.value
    })
  }
  onInviteSubmit(event) {
    // console.log(this.state)
    const payloadData = {
      memberData : this.state.Email,
      boardId : this.props.board,
      color : this.randomBackground()
    }
    this.props.inviteMember(payloadData)
  }
//NOTE
  pageChangeHandler(newPage) {
    if (newPage < 1) newPage = 1;
    const newData = { boardId: this.props.board, curPage: newPage };
    this.props.setNewPage(newData);
    history.push('/list/' + 
    this.props.board + '/' + 
    (this.props.stateFromStore.cardData[this.state.boardIndex].data[this.props.stateFromStore.curPage].id));
  }
  togglePresent(e) {
    const payloadData = { present: 1 };
    this.props.changePresent(payloadData);
  }
  randomBackground() {
    var r = Math.floor(Math.random() * 4);
    switch (r) {
      case 0: return 1;
      case 1: return 2;
      case 2: return 3;
      case 3: return 4;
    }
  }
  onKick(e) {
    let i = parseInt(e.target.id.charAt(6));
    const payloadData = {
      boardId : this.props.board,
      memberId : i
    }
    this.props.kickMember(payloadData);
  }
  renderMember() {
    let boardmemberList = this.props.stateFromStore.memberData[this.state.boardIndex].member;
    this.state.memberList = [];
    for (let i = 0; i < boardmemberList.length; i++) {
      let idtype = "member" + i
      this.state.memberList.push(<div>
        <div id={idtype} className={"mt-1 memberBackground-" + boardmemberList[i].color}>
        {boardmemberList[i].memberName.charAt(0)}</div>
        <UncontrolledPopover trigger="legacy" placement="bottom" target={idtype}>
        <PopoverHeader>Manage Member</PopoverHeader>
        <PopoverBody>
          <button id={idtype} class="btn btn-danger" onClick={this.onKick}>
            Kick
          </button>
        </PopoverBody>
        </UncontrolledPopover>  
      </div>
      );
    }
    return this.state.memberList
  }
  componentWillMount() {
    if(this.props.stateFromStore.userData.Color == 0){
      let c = this.randomBackground()
      this.state.str = "userBackground-" + c
      const colorData = { color: c }
      this.props.updateUserColor(colorData);
    }
    else{
      this.state.str = "userBackground-" + this.props.stateFromStore.userData.Color
    }
  }
  screenShot() {
    html2canvas(document.body).then((canvas) => {

      let croppedCanvas = document.createElement('canvas')
      let croppedCanvasContext = croppedCanvas.getContext('2d')

      croppedCanvas.width = 1500;
      croppedCanvas.height = 800;

      croppedCanvasContext.drawImage(canvas, 210, 130, 1500, 800, 0, 0, 1500, 800);

      let base64image = croppedCanvas.toDataURL("image/png");
      this.props.changeBoardImgFn({
        board: this.props.board,
        img: base64image
      });

      this.props.addRecentBoardDataFn({
        board: this.props.board
      })
    });
  }
  deleteFrameHandler() {
    let pageLength = this.props.stateFromStore.lineData[this.state.boardIndex].data.length
    if (this.props.page === pageLength) {
      this.pageChangeHandler(this.props.page - 1)
      history.push('/list/' + this.props.board + '/' + (this.props.page - 1));
    }
    this.props.deletePageFn({
      board: this.props.board,
      page: this.props.page
    })
  }
  clearFrameHandler() {
    this.props.clearFrameFn({
      board: this.props.board,
      page: this.props.page
    })
  }

  testCallAction(message) {
    console.log(`>> ${message}`)
    this.props.callAction(message)
  }

  logout() {
    fire.auth().signOut();
  }

  render() {
    return (
      <div className="roboto" style={{ backgroundColor: 'white', width: "100%" }}>
        <Container className="m-0 p-0" style={{ "max-width": "100%", "width": "100%" }}>
          <Row className="justify-content-center m-0 w-100">
            <Col xs={4} style={{ fontSize: '35px' }}>
              {
                this.props.path != "list" ?
                  <input
                    type="text"
                    className="form-control board-name ml-4 mt-3 pl-0"
                    style={{ width: '100%' }}
                    maxlength="24"
                    onBlur={() => {
                      this.props.changeBoardNameFn({
                        board: this.props.board,
                        name: this.state.boardName
                      })
                    }}
                    onChange={(e) => this.setState({
                      ...this.state,
                      boardName: e.target.value
                    })}
                    value={this.state.boardName}
                  ></input>
                  : <div></div>
              }
            </Col>
            <Col xs={4} className="text-center">
              <Link to='/list'>
                <img
                  src={Logo}
                  width="60"
                  height="60"
                  alt="CoopBoard"
                  onClick={() => { 
                    this.testCallAction('hello');
                    if (this.props.path != "list") this.screenShot();
                  }}
                />
              </Link>
            </Col>
            <Col style={{ textAlign: 'right' }}></Col>
            <Col>
              <div id="profile" className={"ml-5 mt-1 " + this.state.str}>
                <div className="pt-2">
                  {(this.props.stateFromStore.userData.Name.charAt(0) + this.props.stateFromStore.userData.Surname.charAt(0))}
                </div>
              </div>
              <UncontrolledPopover trigger="legacy" placement="bottom" target="profile">
                <PopoverHeader>Profile</PopoverHeader>
                <PopoverBody>
                  {/* // NOTE */}
                  <div>
                    <button class="btn btn-danger"
                      onClick={()=>{
                        this.logout
                        history.push('/login')
                      }}
                    >
                      Logout
                    </button>
                  </div>
                </PopoverBody>
              </UncontrolledPopover>
            </Col>
          </Row>
          {this.props.path != "list" ?
            <Row className="justify-content-center m-0 w-100 border-top">
              <Col xs={4}>
                <button
                  className="btn button-page mt-1 ml-3 btn-sm border-right"
                  style={{ fontSize: '16px' }}
                  onClick={this.deleteFrameHandler}
                >
                  Delete frame
                </button>
                <button
                  className="btn button-page mt-1 btn-sm"
                  style={{ fontSize: '16px' }}
                  onClick={this.clearFrameHandler}
                >
                  Clear frame
                </button>
              </Col>
              <Col xs={4} className="d-flex ot-1 flex-wrap flex-row justify-content-center">
                  <button
                    className="btn button-page mt-1 pt-0 btn-sm"
                    onClick={() => this.pageChangeHandler(this.props.stateFromStore.curPage - 1)}
                    style={{ "width": "50px", height: '32px', fontSize: '20px' }}
                  >&#60;</button>
                <div
                  className="text-center mt-1 mb-1 border-right border-left btn-sm"
                  style={{ "width": "70px", fontSize: '16px' }}
                >{this.state.pageIndex + 1}</div>
                  <button
                    className="btn button-page mt-1 pt-0 btn-sm"
                    onClick={() => this.pageChangeHandler(this.props.stateFromStore.curPage + 1)}
                    style={{ "width": "50px", height: '32px', fontSize: '20px' }}
                  >&#62;</button>
              </Col>
              <Col style={{ textAlign: 'right' }}>
                <div className="d-flex flex-row">
                  {this.renderMember()}
                </div>
              </Col>
              <Col style={{ textAlign: 'right' }}>
                <button id="invite" className="invite-button">
                  +
                </button>
                <UncontrolledPopover trigger="legacy" placement="bottom" target="invite">
                <PopoverHeader>Invite Member</PopoverHeader>
                <PopoverBody>
                  <form>
                    <div className="form-group">
                      <label for="EmailInput">Send Invite to</label>
                      <input type="text" class="form-control" id="Email" name="Email" aria-describedby="emailHelp" placeholder="Enter email"
                      onChange={this.onInputChange}></input>
                    </div>
                  </form>
                  <button type="submit" className="btn-primary" onClick={this.onInviteSubmit}>
                    Send Invite
                  </button>
                </PopoverBody>
              </UncontrolledPopover>
                <button className={"mt-1 ml-1 " + (this.props.stateFromStore.isPresent ? "btn-danger" : "btn-primary")}
                  onClick={this.togglePresent}>
                  {this.props.stateFromStore.isPresent ? "Stop Presentation" : "Start Presentation"}
                </button>
              </Col>
            </Row> : <div />}
        </Container>
      </div >
    );
  }
}

const mapStateToProps = state => {
  return {
    stateFromStore: state
  }
}
const mapDispatchToProps = dispatch => {
  return {
    changePresent: (newPresent) => {
      return dispatch({ type: 'CHANGE_PRESENT', payload: newPresent });
    },
    setNewPage: (newId) => {
      return dispatch({ type: 'CHANGE_PAGE', payload: newId });
    },
    inviteMember: (newMember) => {
      return dispatch({ type: 'INVITE_MEMBER', payload: newMember });
    },
    changeBoardImgFn: (data) => {
      return dispatch({ type: 'CHANGE_BOARD_IMG', payload: data });
    },
    addRecentBoardDataFn: (data) => {
      return dispatch({ type: 'ADD_RECENT_BOARD', payload: data });
    },
    deletePageFn: (data) => {
      return dispatch({ type: 'DELETE_PAGE', payload: data });
    },
    clearFrameFn: (data) => {
      return dispatch({ type: 'CLEAR_FRAME', payload: data });
    },
    changeBoardNameFn: (data) => {
      return dispatch({ type: 'CHANGE_BOARD_NAME', payload: data });
    },
    updateUserColor: (newColor) => {
      return dispatch({ type: 'CHANGE_USER_COLOR', payload: newColor});
    },
    kickMember: (newMember) => {
      return dispatch({ type: 'KICK_MEMBER', payload: newMember});
    },

    //  test api
    callAction: message => dispatch(action.testAction(message))
    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
