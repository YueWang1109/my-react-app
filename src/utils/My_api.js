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

  function getInventoryData(sort_rule){
    const url = `${BASE_URL}/api/inventory?sortby=${sort_rule}`;
    debugger;
    let JWToken =  localStorage.getItem("jwt");
    if(JWToken)
    axios.defaults.headers.common['Authorization'] = JWToken;
    //axios.defaults.headers.common['Authorization'] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImlhdCI6MTUyODE2NzI4NywiZXhwIjoxNTI4MTY5MDg3fQ.g3xNgihfzDH0k0CLgRGb3Go0X04DV_IkFO7RX5hRmYk"
    return axios.get(url).then(
      response => response.data
    ).catch(function (error){
      if (error) throw error;
    });
  }
  function getGamebyID(id){
    const url = `${BASE_URL}/api/get_game?id=${id}`;
    debugger;
    let JWToken =  localStorage.getItem("jwt");
    if(JWToken)
    axios.defaults.headers.common['Authorization'] = JWToken;
    //axios.defaults.headers.common['Authorization'] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImlhdCI6MTUyODE2NzI4NywiZXhwIjoxNTI4MTY5MDg3fQ.g3xNgihfzDH0k0CLgRGb3Go0X04DV_IkFO7RX5hRmYk"
    return axios.get(url).then(
      response => response.data
    ).catch(function (error){
      if (error) throw error;
    });
  }
  function deleteGamebyID(id){
    const url = `${BASE_URL}/api/delete_game?id=${id}`;
    debugger;
    let JWToken =  localStorage.getItem("jwt");
    if(JWToken)
    axios.defaults.headers.common['Authorization'] = JWToken;
    //axios.defaults.headers.common['Authorization'] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImlhdCI6MTUyODE2NzI4NywiZXhwIjoxNTI4MTY5MDg3fQ.g3xNgihfzDH0k0CLgRGb3Go0X04DV_IkFO7RX5hRmYk"
    return axios.get(url).then(
      response => response.data
    ).catch(function (error){
      if (error) throw error;
    });
  }
  function LoginSubmit(state) {
    const url = `${BASE_URL}/login`;
    let sendObj = {
      email: state.email,
      password: state.password
    };
    console.log(`the input login ${sendObj.email}`);
    return axios.post(url,sendObj).then(
      response => response.data
    ).catch(function (error){
      if (error) throw error;
    });
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
    return axios.post(url,sendObj).then(
      response => response.data
    ).catch(function (error){
      if (error) throw error;
    });
  }
  function updateGame(state) {
    const url = `${BASE_URL}/api/edit_game`;
    // let sendObj = {
    //   gameid: state.gameid,
    //   gamename: state.gamename,
    //   quantity: state.quantity,
    //   category: state.category,
    //   description: state.description,
    //   price: state.price
    // }
    const formData = new FormData();
    formData.append('idinventory', state.gameid);
    formData.append('ProductName', state.gamename);
    formData.append('Quantity', state.quantity);
    formData.append('Category', state.category);
    formData.append('Description', state.description);
    formData.append('Price', state.price);
    formData.append('imagename', state.selectedFile, state.selectedFile.name);
    let JWToken =  localStorage.getItem("jwt");
    if(JWToken)
    axios.defaults.headers.common['Authorization'] = JWToken;
    return axios.post(url,formData).then(
      response => response.data
    ).catch(function (error){
      if (error) throw error;
    });
  }
  function addGame(state) {
    const url = `${BASE_URL}/api/add_game`;
    // let sendObj = {
    //   gamename: state.gamename,
    //   quantity: state.quantity,
    //   category: state.category,
    //   description: state.description,
    //   price: state.price
    // }
    const formData = new FormData();
    formData.append('ProductName', state.gamename);
    formData.append('Quantity', state.quantity);
    formData.append('Category', state.category);
    formData.append('Description', state.description);
    formData.append('Price', state.price);
    formData.append('imagename', state.selectedFile, state.selectedFile.name);
    let JWToken =  localStorage.getItem("jwt");
    if(JWToken)
    axios.defaults.headers.common['Authorization'] = JWToken;
    return axios.post(url,formData).then(
      response => response.data
    ).catch(function (error){
      if (error) throw error;
    });
  }
  function getUserInfo(){
    const url = `${BASE_URL}/api/my_info?user_info=999`;

    let JWToken =  localStorage.getItem("jwt");
    if(JWToken)
    axios.defaults.headers.common['Authorization'] = JWToken;
    //axios.defaults.headers.common['Authorization'] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImlhdCI6MTUyODE2NzI4NywiZXhwIjoxNTI4MTY5MDg3fQ.g3xNgihfzDH0k0CLgRGb3Go0X04DV_IkFO7RX5hRmYk"
    return axios.get(url).then(
      response => response.data
    ).catch(function (error){
      if (error) throw error;
    });
  }