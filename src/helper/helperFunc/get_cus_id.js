const get_cus_id = (sender, receiver) => {
    return sender >= receiver ? sender + receiver : receiver + sender;
  };
  
  export default get_cus_id;
  