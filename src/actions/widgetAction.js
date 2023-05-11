export const handleFollow = async (userId, isFollowed, index, session, randomUsers, setRandomUsers) => {
    const res = await fetch(`/api/followUser?id=${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentUserId: session.user.id,
      }),
    });
  
    const data = await res.json();
    console.log(data);
  
    const updatedRandomUsers = [...randomUsers];
    updatedRandomUsers[index].isFollowed = !isFollowed;
    setRandomUsers(updatedRandomUsers);
  };
  