const login = async ({ email, password }) => {
  const userData = {
    email,
    password
  }

  const result = await _post('http://localhost:5000/login', userData)
  return result.auth_token
}

const postLink = async (link) => {
  const linkData = {
    link,
  }

  const result = await _post('http://localhost:5000/link', linkData);
}

export {
  login,
  postLink,
}

const _post = (url, data) => fetch(
  url,
  {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  }
)
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    return myJson;
  });
