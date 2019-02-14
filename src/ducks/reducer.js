const initialState = {
    user: {
        id: 0,
        username: ''
    }
};

const UPDATE_USER = 'UPDATE_USER'


export default function reducer(state = initialState, action){
    const { type, payload } = action;
    switch(type) {
        case UPDATE_USER:
        const { id, username } = payload;
        return {...state, id, username }
        default:
        return state;
    }
    
}

export function updateUser(userObj){
    return {
        type: UPDATE_USER,
        payload: userObj
    }
}