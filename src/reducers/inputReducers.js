export const inputReducer = (state, action) => {
    switch (action.type) {
      case 'SET_TWEET':
        return { ...state, tweet: action.payload };
      default:
        throw new Error();
    }
  };
  