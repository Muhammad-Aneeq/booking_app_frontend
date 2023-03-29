import {createContext,useContext,useEffect, useReducer} from 'react'



const initialState = {
  city:undefined,
  date:[],
  options:{
    adult:undefined,
    children:undefined,
    room:undefined
  }

}

export const SearchContext = createContext(initialState)

const searchReducer = (state,action) => {
 switch (action.type) {
  case "NEW_SEARCH":
  return  action.payload
   case "RESET_SEARCH":
    return initialState
 
  default:
   return state;
 }
}

export const SearchContextProvider = ({children}) => {
  const [state,dispatch] = useReducer(searchReducer,initialState)
  return(
    <SearchContext.Provider value={{
      city:state.city,
      date:state.date,
      options:state.options,
      dispatch
    }}>
      {children}
    </SearchContext.Provider>
  )
  
}

export const useSearchContext = ()=>{
  return useContext(SearchContext)
}