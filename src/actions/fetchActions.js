const fetchPostByIdAction = async (id) => {
    try {
      const response = await fetch(`/api/users/getPostById?id=${id}`);
      const data = await response.json();
      return data.tweet.text;
    } catch (error) {
      console.error(error);
      return '';
    }
  };
  
  export default fetchPostByIdAction;
  