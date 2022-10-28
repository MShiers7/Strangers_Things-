const BASEURL = "https://strangers-things.herokuapp.com/api/2207-FTB-ET-WEB-PT";

const makeHeaders = (token) => {
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

const callAPI = async (endpointPath, defaultOptions = {}) => {
  const { token, method, body } = defaultOptions;
  const options = {
    headers: makeHeaders(token),
  };
  if (method) {
    options.method = method;
  }
  if (body) {
    options.body = JSON.stringify(body);
  }
  const response = await fetch(`${BASEURL}${endpointPath}`, options);
  const result = await response.json();
  return result;
};

export const fetchPosts = async (token) => {
  try {
    const { success, error, data } = await callAPI("/posts", {
      token: token,
    });

    if (success) {
      return {
        error: null,
        posts: data.posts,
      };
    } else {
      return {
        error: error.message,
        posts: [],
      };
    }
  } catch (error) {
    console.error("There was an error fetching posts", error);

    return {
      error: "Failed to load Posts",
      posts: [],
    };
  }
};

export const fetchUsers = async (username, password) => {
  try {
    const { success, error, data } = await callAPI("/users/register", {
      method: "POST",
      body: {
        user: {
          username,
          password,
        },
      },
    });
    console.log("DATA", data);
    if (success) {
      return {
        error: null,
        token: data.token,
        message: data.message,
      };
    } else {
      return {
        error: error.message,
        token: null,
        message: null,
      };
    }
  } catch (error) {
    console.error("There was an error fetching the user", error);

    return {
      error: "Registration Failed.",
      token: null,
      message: null,
    };
  }
};

export const userLogin = async (username, password) => {
  try {
    const { success, error, data } = await callAPI("/users/login", {
      method: "POST",
      body: {
        user: {
          username,
          password,
        },
      },
    });
    if (success) {
      return {
        error: null,
        token: data.token,
        message: data.message,
      };
    } else {
      return {
        error: error.message,
        token: null,
        message: null,
      };
    }
  } catch (error) {
    console.error("There was an error logging in the user", error);

    return {
      error: "Log In failed",
      token: null,
      message: null,
    };
  }
};

export const fetchUserToken = async (token) => {
  try {
    const { success, error, data } = await callAPI("/users/me", {
      token: token,
    });

    if (success) {
      return {
        error: null,
        username: data.username,
      };
    } else {
      return {
        error: error.message,
        username: null,
      };
    }
  } catch (error) {
    console.error("Failed to fetch user", error);

    return {
      error: "Failed to load User Information",
      username: null,
    };
  }
};

export const createPosts = async (
  token,
  title,
  description,
  price,
  location,
  willDeliver
) => {
  try {
    const post = {
      title: title,
      description: description,
      price: price,
    };

    if (location) {
      post.location = location;
    }
    if (willDeliver) {
      post.willDeliver = willDeliver;
    }

    const { success, error, data } = await callAPI("/posts", {
      token: token,
      method: "POST",
      body: {
        post: post,
      },
    });
    if (success) {
      return {
        error: null,
        post: data.post,
      };
    } else {
      return {
        error: error.message,
        post: null,
      };
    }
  } catch (error) {
    console.error("POST /posts failed", error);

    return {
      error: "Failed to create post",
      post: null,
    };
  }
};

export const deletePost = async (token, postId) => {
  try {
    await fetch(`${BASEURL}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("DELETE /posts/postsId failed:", error);
  }
};

export const addMessage = async (token, postId, message) => {
  try {
    const { success, error, data } = await callAPI(
      `/posts/${postId}/messages`,
      {
        token: token,
        method: "POST",
        body: {
          message: {
            content: message,
          },
        },
      }
    );

    if (success) {
      return {
        success: success,
        error: null,
        messages: data.messages,
      };
    } else {
      return {
        success: success,
        error: error.message,
        message: null,
      };
    }
  } catch (error) {
    console.error(`POST/posts/${postId}/messages failed:`, error);
    return {
      success: false,
      error: "Failed to create message for post",
      comment: null,
    };
  }
};
