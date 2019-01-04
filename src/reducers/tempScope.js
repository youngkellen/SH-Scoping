import {
    TEMPSCOPE_DOWNLOAD,
    TEMPSCOPE_SELECT,
    TEMPSCOPE_TREE,
    TEMPSCOPE_SELECTED_FEATURES,
    TEMPSCOPE_ADD,
    TEMPSCOPE_SCOPE_REMOVE,
    TEMPSCOPE_SCOPE_EDIT,
    TEMPSCOPE_TREE_REMOVE
  } from '../constants/actionTypes';
  
  const defaultState = {
    tempScope: [],
    tempSelected: {},
    tempTree: {},
    tempFeatures: []
  }
  
  export default (state = defaultState, action) => {
    switch (action.type) {
      case TEMPSCOPE_DOWNLOAD:
        return { ...state, tempScope: action.payload };
      case TEMPSCOPE_SELECT:
        return { ...state, tempSelected: action.payload };
      case TEMPSCOPE_TREE: {
        return { ...state, tempTree: action.payload };
      }
      case TEMPSCOPE_SELECTED_FEATURES: {
        return { ...state, tempFeatures: action.payload };
      }
      case TEMPSCOPE_ADD: {
        return { ...state, tempScope: [...state.tempScope, action.payload] };
      }
      case TEMPSCOPE_SCOPE_REMOVE: {
        // let fsCount = 0;
        // // if (state.tempScope.length === 1 && state.tempScope[0].SOURCE === action.payload.SOURCE) {
        // //   return { ...state, tempTree: []};
        // // }
        // let newTempScope = state.tempScope.filter(t => {
        //   if (t["Feature set"] === action.payload["Feature set"]) {
        //     fsCount += 1
        //   }
        //   if (t.Feature !== action.payload.Feature){
        //     return t
        //   }
        //   if (t.id !== action.payload.id){
        //     return t
        //   }
        // })
        // console.log(fsCount, "fs count")

        // if (fsCount === 2 ){
        //   newTempScope = newTempScope.filter(t => {
        //     if (t.SOURCE !== action.payload.SOURCE && !t["Feature set"]) {
        //       return t
        //     }
        //   })
        // }

        // if (fsCount === 1 ) {
        //   newTempScope = newTempScope.filter(t => {
        //     if (t.SOURCE !== action.payload.SOURCE ) {
        //       return t
        //     }
        //   })
        // }


        return { ...state, tempScope: action.payload};
      }
      case TEMPSCOPE_SCOPE_EDIT:
      return { ...state, tempScope: state.tempScope.map(t => {
        if (t.id === action.payload.id) {
          t[action.payload.prop] = action.payload.value;
        }
        return t
        })
      }
      default:
        return state;
    }
};
  