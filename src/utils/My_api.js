import axios from 'axios';

const BASE_URL = 'http://localhost:3000';
// const BASE_URL = 'http://10.10.53.35:3000';

export {LoginSubmit, register, getInventoryData, setToken, 
  getGamebyID, deleteGamebyID, updateGame, addGame, getUserInfo};
  
  function setToken(token){
    debugger;
    if (token) {
      axios.defaults.headers.common['Authorization'] = token;
    } else {
      axios.defaults.headers.common['Authorization'] = null;
      /*if setting null does not remove `Authorization` header then try     
      delete axios.defaults.headers.common['Authorization'];
      */
    }
  }

  let getter = (url) => {
    let JWToken =  localStorage.getItem("jwt");
    if(JWToken)
    axios.defaults.headers.common['Authorization'] = JWToken;
    return axios.get(url).then(
      response => response.data
    ).catch(function (error){
      debugger;
      if(error.response.status === 401){
        let RefreshToken =  localStorage.getItem("refreshtoken");
        let uid =  localStorage.getItem("uid");
        axios.defaults.headers.common['refreshtoken'] = `${uid} ${RefreshToken}`;
        return axios.get(`${BASE_URL}/token`).then(response=>{
          let token = response.data.token;
          let role = response.data.role;
          if(token){
            localStorage.setItem("jwt",token);
            localStorage.setItem("authed",role);
            axios.defaults.headers.common['Authorization'] = token;
            return axios.get(url).then(
              response => response.data
            ).catch(function (error){
              if(error) throw error;
            })
          }
        })

      }else throw error;
    });
  }
  let poster = (url,content) => {
    let JWToken =  localStorage.getItem("jwt");
    if(JWToken)
    axios.defaults.headers.common['Authorization'] = JWToken;
    return axios.post(url,content).then(
      response => response.data
    ).catch(function (error){
      debugger;
      if(error.response.status === 401){
        let RefreshToken =  localStorage.getItem("refreshtoken");
        let uid =  localStorage.getItem("uid");
        axios.defaults.headers.common['refreshtoken'] = `${uid} ${RefreshToken}`;
        return axios.get(`${BASE_URL}/token`).then(response=>{
          let token = response.data.token;
          let role = response.data.role;
          if(token){
            localStorage.setItem("jwt",token);
            localStorage.setItem("authed",role);
            axios.defaults.headers.common['Authorization'] = token;
            return axios.post(url,content).then(
              response => response.data
            ).catch(function (error){
              if(error) throw error;
            })
          }
        })

      }else throw error;
    });
  }
  function getInventoryData(sort_rule){
    const url = `${BASE_URL}/api/inventory?sortby=${sort_rule}`;
    return getter(url);
  }
  function getGamebyID(id){
    const url = `${BASE_URL}/api/get_game?id=${id}`;
    return getter(url);
  }
  function deleteGamebyID(id){
    const url = `${BASE_URL}/api/delete_game?id=${id}`;
    return getter(url);
  }
  function LoginSubmit(state) {
    const url = `${BASE_URL}/login`;
    let sendObj = {
      email: state.email,
      password: state.password
    };
    return poster(url,sendObj);
  }
  
  function register(state) {
    const url = `${BASE_URL}/register`;
    let sendObj = {
      firstname: state.firstname,
      lastname: state.lastname,
      password: state.password,
      email: state.email,
      phone: state.telephone,
      address: state.address,
      city: state.city,
      zipcode: state.zipcode
    }
    return poster(url,sendObj);
  }
  function updateGame(state) {
    const url = `${BASE_URL}/api/edit_game`;
    const formData = new FormData();
    formData.append('idinventory', state.gameid);
    formData.append('ProductName', state.gamename);
    formData.append('Quantity', state.quantity);
    formData.append('Category', state.category);
    formData.append('Description', state.description);
    formData.append('Price', state.price);
    formData.append('imagename', state.selectedFile, state.selectedFile.name);
    return poster(url,formData);
  }
  function addGame(state) {
    const url = `${BASE_URL}/api/add_game`;
    const formData = new FormData();
    formData.append('ProductName', state.gamename);
    formData.append('Quantity', state.quantity);
    formData.append('Category', state.category);
    formData.append('Description', state.description);
    formData.append('Price', state.price);
    formData.append('imagename', state.selectedFile, state.selectedFile.name);
    return poster(url,formData);
  }
  function getUserInfo(){
    const url = `${BASE_URL}/api/my_info?user_info=999`;

    return getter(url);
  }