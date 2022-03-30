const dataReducer = (state = [], action) => {
  switch (action.type) {
    case "DATA_RECEIVED":
      console.log("inside reducer");
      return (state = [action.payload]);

    default:
      return state;
  }
};

export default dataReducer;
