import api from '../../utils/api'; // import api function which contains "GET","POST","DELETE","PATCH" methods

function Userstatus() {
    const username = localStorage.getItem('username');
    if (username){
      const handleClick = () =>{
        api.post("auth/logout/",{}).then(res => {
          console.log(res);
          localStorage.clear();
          window.location.href = "/";
        })
      }
      return (<div>Hello, {username} <button onClick={handleClick}>logout</button></div>);
    }
    return (null);
  }

  export default Userstatus