const initialState = {
  curPage: 1,
  //[{start: {offsetX: 325, offsetY: 180},stop: {offsetX: 340, offsetY: 180}}]
  data: [
    { id: 1, line: [], marker: []},
    { id: 2, line: [[{start: {offsetX: 325, offsetY: 180},stop: {offsetX: 340, offsetY: 180}}]], marker: []},
    { id: 3, line: [], marker: []},
    { id: 4, line: [[{start: {offsetX: 325, offsetY: 180},stop: {offsetX: 450, offsetY: 180}}]], marker: []}
  ],
  buttonData: {
    1: { isActive: 0 },
    2: { isActive: 0 },
    3: { isActive: 1 },
    4: { isActive: 0 },
    5: { isActive: 0 }
  },
  isHolding: false,
  onDropArea: false,
  cardData: {
    1: { onFormSetting: 0,name: 'Post-It', data: {} },
    2: { onFormSetting: 0,name: 'To-Do-Lists', data: {} },
    3: { onFormSetting: 0,name: 'Calendar', data: {} },
    4: { onFormSetting: 0,name: 'Map', data: {} },
    5: { onFormSetting: 0,name: 'Table', data: {} },
    6: { onFormSetting: 0,name: 'Url', data: {} },
    7: { onFormSetting: 0,name: 'Code', data: {} },
    8: { onFormSetting: 0,name: 'Video', data: {} }
  }
}
const reducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case 'CHANGE_PAGE':
      const changedPage = { curPage: action.payload.curPage }
      newState.curPage = changedPage.curPage;
      if (action.payload.curPage > state.data.length - 1) {
        newState.data.push({ id: action.payload.curPage, line: [] , marker: []})
      }
      console.log(newState)
      return newState

    //case 'ADD_LINE':
    //  const { id, line: newLine } = action.payload;
    //  newState.data[id].line.push(newLine)
    //  return newState;
      
    case 'UPDATE_LINE':
      const {id, data: updatedLineData , mode} = action.payload;
      if(mode == 1){
        newState.data[id].line.push(updatedLineData)
      }
      else if(mode == 2){
        for(var i = updatedLineData.length; i > 0;i--){
          const t = updatedLineData.pop();
          newState.data[id].line.splice(t,1);
        }
      }
      else if(mode == 3){
        if(updatedLineData.length == 0){
          newState.data[id].marker = [];
        }
        else{
          newState.data[id].marker.push(updatedLineData)
        }
      }
      return newState;
    case 'TOGGLE_BUTTON':
      const { newId, newIsActive } = action.payload;
      const newbuttonData = {
        1: { isActive: 0 },
        2: { isActive: 0 },
        3: { isActive: 0 },
        4: { isActive: 0 },
        5: { isActive: 0 }
      }
      newbuttonData[newId].isActive = newIsActive
      return {
        ...state,
        buttonData: newbuttonData
      }
    case 'UPDATE_ON_DROP_AREA':
      const { onDropArea, isHolding } = action.payload
      console.log(action.payload)
      return {
        ...state,
        isHolding: isHolding,
        onDropArea: onDropArea
      }
    case 'UPDATE_ON_FORM_SETTING':{
      const cardId = action.payload
      let newOnFormSetting = state.cardData
      Object.keys(newOnFormSetting).map((key)=> newOnFormSetting[key].onFormSetting = 0)
      newOnFormSetting[cardId].onFormSetting = 1
      return {
        ...state,
        cardData : newOnFormSetting
      }}
    default:
      break;
  }
  return state;
}
export default reducer;