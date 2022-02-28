import { useCallback, useState, useRef, useEffect } from "react";

export const useStateWithCallback = (initial) => {
   const [state, setState] = useState(initial);
   const cbRef = useRef();
   const updateState = useCallback((newState, cb) => { //read abt this
        cbRef.current = cb;

        setState((prev) => {
            return typeof newState === 'function' ? newState(prev) : newState;
        })
   },
   []
   );
   useEffect(() => {
       if(cbRef.current){
            cbRef.current(state);
            cbRef.current = null;
       }
    
   }, [state])
   return [state, updateState];
};