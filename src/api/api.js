const BASEURL = "https://strangers-things.herokuapp.com/api/2207-FTB-ET-WEB-PT";

export const fetchPosts = async () => {
  try {
    const response = await fetch(`${BASEURL}/posts`);
    console.log("RESPONSE", response);
    const { data } = await response.json();
    console.log("THIS IS DATA", data.posts);
    return data.posts;
  } catch (error) {
    console.error("There was an error fetching posts", error);
  }
};

export const fetchUsers = async (username, password) => {
  try {
    const response = await fetch(`${BASEURL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          password,
        },
      }),
    });
    console.log("RESPONSE", response);
    const data = await response.json();
    console.log("DATA", data);
    return data;
  } catch (error) {
    console.error("There was an error fetching the user", error);
  }
};
