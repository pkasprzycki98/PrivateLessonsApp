const dataReducer = (state = {PersonList: [], NoteList: [], TimeList: []},action) =>{
    switch(action.type) {
        case 'PERSON':
        {
            return {...state, PersonList: action.payload.PersonList}
        }
        case 'NOTE':
            {
                return {...state, NoteList: action.payload.NoteList}
            }
        case 'TIME':
            {
                return {...state, TimeList: action.payload.TimeList}
            }
        default:
        {
             return state;
        }
    }
}
export default dataReducer;