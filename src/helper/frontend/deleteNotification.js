const deleteNotification = async (id, sender) => {
    console.log(id, sender);
    const requestOptions = { method: "DELETE", redirect: "follow" };
  
    try {
      const response = await fetch(
        `http://localhost:3000/api/v2/users/getNotification?id=${id}&sender=${sender}`,
        requestOptions
      );
      if (!response.ok) {
        return { statue: false };
      }
      const result = await response.json();
      if (result == "Notifications deleted successfully") {
        return { statue: true };
      }
    } catch (error) {
      console.log(error);
      return { status: false };
    }
  };
  
  export default deleteNotification;
  