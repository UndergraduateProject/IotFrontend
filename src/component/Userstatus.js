import api from "../utils/api"

function UserStatus() {
    const username = localStorage.getItem('username');
    if (username){
      const handleClick = () =>{
        api.post("user/logout/",{}).then(res => {
          console.log(res);
          localStorage.clear();
          window.location.href = "/";
        })
      }
      return (<div>Hello, {username} <button onClick={handleClick}>logout</button></div>);
    }
    return (null);
  }

  export default UserStatus