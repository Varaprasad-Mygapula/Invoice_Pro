// import React, { createElement, useState } from "react";
// import axios from "axios";
// import * as Components from "./Components";
// import Navbar from "./nav";

// function Login() {
//   const [signIn, toggle] = useState(true);
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const userObj = {
//       username,
//       password,
//     };

//     try {
//       const response = await axios.post("http://localhost:5000/login", userObj);
//       if (response.status === 200) {
//         alert("Login success");
//         console.log(response.data);
//         localStorage.setItem("username", response.data.user[0].username);
//         console.log(response.data);
//         window.location.href = "/invoice"; // You can redirect or perform any other action here
//       }
//     } catch (error) {
//       alert("Invalid credentials");
//     }
//   };

//   return (<>
//     <React.Fragment>
// 			<Navbar/>
// 		</React.Fragment>
//     <center><Components.Container style={{marginTop:'150px',display:'flex'}}>
//       {signIn ? (
//         <Components.SignInContainer signinIn={signIn}>
//           <Components.Form onSubmit={handleLogin}>
//             <Components.Title>Sign in</Components.Title>
//             <Components.Input
//               type="text"
//               placeholder="username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//             <Components.Input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <Components.Anchor href="#">
//               Forgot your password?
//             </Components.Anchor>
//             <Components.Button type="submit">Sign In</Components.Button>
//           </Components.Form>
//         </Components.SignInContainer>
//       ) : (
//         <Components.SignUpContainer signinIn={signIn}>
//           <Components.Form>
//             <Components.Title>Create Account</Components.Title>
//             <Components.Input
//               type="text"
//               placeholder="Name"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//             <Components.Input
//               type="email"
//               placeholder="Email"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//             <Components.Input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <Components.Button onClick={() => alert("Sign Up clicked")}>
//               Sign Up
//             </Components.Button>
//           </Components.Form>
//         </Components.SignUpContainer>
//       )}

//       <Components.OverlayContainer signinIn={signIn}>
//         <Components.Overlay signinIn={signIn}>
//           <Components.LeftOverlayPanel signinIn={signIn}>
//             <Components.Title>Welcome Back!</Components.Title>
//             <Components.Paragraph>
//               To keep connected with us please login with your personal info
//             </Components.Paragraph>
//             <Components.GhostButton onClick={() => toggle(true)}>
//               Sign In
//             </Components.GhostButton>
//           </Components.LeftOverlayPanel>

//           <Components.RightOverlayPanel signinIn={signIn}>
//             <Components.Title>Hello, Friend!</Components.Title>
//             <Components.Paragraph>
//               Enter Your personal details and start journey with us
//             </Components.Paragraph>
//             <Components.GhostButton onClick={() => toggle(false)}>
//               Sigin Up
//             </Components.GhostButton>
//           </Components.RightOverlayPanel>
//         </Components.Overlay>
//       </Components.OverlayContainer>
//     </Components.Container></center></>
//   );
// }

// export default Login;

import React, { useState } from "react";
import axios from "axios";
import * as Components from "./Components";
import Navbar from "./nav";

function Login() {
  const [signIn, toggle] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [employeename, setEmployeename] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const userObj = {
      username,
      password,
    };

    try {
      const response = await axios.post("http://localhost:5000/login", userObj);
      if (response.status === 200) {
        alert("Login success");
        console.log(response.data);
        localStorage.setItem("username", response.data.user[0].username);
        console.log(response.data);
        window.location.href = "/"; // You can redirect or perform any other action here
      }
    } catch (error) {
      alert(" 😢 Invalid credentials");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const userObj = {
      username,
      password,
      employeename,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/register",
        userObj
      );
      if (response.status === 201) {
        alert("Registration success");
        console.log(response.data);
        window.location.href = "/login";
        // You can redirect or perform any other action here
      }
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <>
      <React.Fragment>
        <Navbar />
      </React.Fragment>
      <center>
        <Components.Container style={{ marginTop: "100px" }}>
          {signIn ? (
            <Components.SignInContainer signinIn={signIn}>
              <Components.Form onSubmit={handleLogin}>
                <Components.Title>
                  Welcome🙏!
                  <br />
                  Sign in
                </Components.Title>
                <Components.Input
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <Components.Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Components.Anchor href="#">
                  Forgot your password?
                </Components.Anchor>
                <Components.Button type="submit">Sign In</Components.Button>
              </Components.Form>
            </Components.SignInContainer>
          ) : (
            <Components.SignUpContainer signinIn={signIn}>
              <Components.Form onSubmit={handleRegister}>
                <Components.Title>Create Account☻!</Components.Title>
                <Components.Input
                  type="text"
                  placeholder="Name of employee"
                  value={employeename}
                  onChange={(e) => setEmployeename(e.target.value)}
                  required
                />
                <Components.Input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <Components.Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Components.Button type="submit">Sign Up</Components.Button>
              </Components.Form>
            </Components.SignUpContainer>
          )}

          <Components.OverlayContainer signinIn={signIn}>
            <Components.Overlay signinIn={signIn}>
              <Components.LeftOverlayPanel signinIn={signIn}>
                <Components.Title>Welcome Back!</Components.Title>
                <Components.Paragraph>
                  To keep connected with us please login with your credentials
                </Components.Paragraph>
                <Components.GhostButton onClick={() => toggle(true)}>
                  Sign In
                </Components.GhostButton>
              </Components.LeftOverlayPanel>

              <Components.RightOverlayPanel signinIn={signIn}>
                <Components.Title>Hello, Employee☻!</Components.Title>
                <Components.Paragraph>
                  New to the Company?
                  <br />
                  Create an account to continue.
                </Components.Paragraph>
                <Components.GhostButton onClick={() => toggle(false)}>
                  Sign Up
                </Components.GhostButton>
              </Components.RightOverlayPanel>
            </Components.Overlay>
          </Components.OverlayContainer>
        </Components.Container>
      </center>
    </>
  );
}

export default Login;
