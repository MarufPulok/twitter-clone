const feedReducer = (state, action) => {
  switch (action.type) {
    case "SET_POSTS":
      const newPosts = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      return {
        ...state,
        posts: action.payload,
      };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export default feedReducer;
