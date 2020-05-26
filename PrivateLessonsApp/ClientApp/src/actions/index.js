export  const Logged = (token,username,userId) => {
    return {
        type: 'SIGN_IN',
        payload:
        {
            token: token,
            username: username,
            userId: userId
        }

        
    }
}
export const PersonList = (PersonList) =>{
    return {
        type: 'PERSON',
        payload
        :{
            PersonList: PersonList
        }
    }
}
export const NoteList = (NoteList) => {
    return{
        type:'NOTE',
        payload:{
            NoteList:NoteList
        }
    }
}
export const TimeList = (TimeList) =>{
    return{
        type: "TIME",
        payload:{
            TimeList: TimeList
        }
    }
}