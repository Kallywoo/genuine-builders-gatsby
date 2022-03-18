export const reducer = (state, action) => {

    if (action.type === "INITIATE") {
        // console.log("INITIATE:");
        // console.log(state);
        return {
            ...state,
            sliding: true,
            duration: action.payload.duration
        };
    };

    if (action.type === "SET_ACTIVE") {
        // console.log("SET_ACTIVE:");
        // console.log(state);
        return {
            ...state,
            active: action.payload.active
        };
    };

    if (action.type === "CHANGE_SLIDES") {
        // console.log("CHANGE_SLIDES:");
        // console.log(state);
        return {
            ...state,
            previous: action.payload.previous,
            current: action.payload.current,
            next: action.payload.next,
            sliding: false,
            switched: false,
            direction: "right",
            swiped: false,
        };
    };

    if (action.type === "FORCE_SLIDES") {
        // console.log("FORCE_SLIDES:");
        // console.log(state);
        return {
            ...state,
            active: true,
            direction: action.payload.direction,
            duration: 0,
        };
    };

    if (action.type === "FORCE_SWIPE") {
        // console.log("FORCE_SWIPE:");
        // console.log(state);
        return {
            ...state,
            active: true,
            direction: action.payload.direction,
            swiped: true,
            duration: 0,
        };
    };

    if (action.type === "FORCE_TO_INDEX") {
        // console.log("FORCE_TO_INDEX:");
        // console.log(state);
        return {
            ...state,
            switched: true,
            active: true,
            previous: action.payload.previous,
            next: action.payload.next,
            direction: action.payload.direction,
            duration: 0,
        };
    };

    return state;
};