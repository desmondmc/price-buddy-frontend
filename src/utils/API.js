let token = null;

const setAuthToken = (authToken) => {
  token = authToken;
}


const signup = async ({ email, password }) => {
  const userData = {
    email,
    password
  }

  const result = await _post('http://localhost:5000/signup', userData)
  return result;
}

const login = async ({ email, password }) => {
  const userData = {
    email,
    password
  }

  const result = await _post('http://localhost:5000/login', userData)
  return result.auth_token
}

const getUserProducts = async () =>
  _get('http://localhost:5000/products')

const postLink = async (link) => {
  const linkData = {
    link,
  }

  const result = await _post(
    'http://localhost:5000/link',
    linkData,
  );

  return result;
}

const emailAvailable = async (email) => {
  const result = await _post('http://localhost:5000/email-availability', { email })
  return result;
}

export {
  // Utils
  setAuthToken,

  // POSTS
  login,
  signup,
  emailAvailable,
  postLink,

  // GETS
  getUserProducts,
}

const _get = (url) =>
  _commonFetch('GET', url, null)

const _post = (url, data) =>
  _commonFetch('POST', url, data)

const _commonFetch = (method, url, data) =>
  fetch(
    url,
    {
      method,
      body: data ? JSON.stringify(data) : null,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "auth-token": token,
      },
    }
  )
    .then((response) => {
      if (response.status > 299 || response.status < 200) {
        throw new Error('Bad response');
      }

      return response && response.json();
    })
    .then((myJson) => {
      return myJson;
    });
