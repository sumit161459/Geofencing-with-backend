import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import GoogleButton from 'react-google-button';
      
const clientId = "379871539878-29c4642ag3par13e480hueralo0td1fn.apps.googleusercontent.com";

function Login({setLoggedIn}) {
    const [showloginButton, setShowloginButton] = useState(true);
    const [showlogoutButton, setShowlogoutButton] = useState(false);
    const onLoginSuccess = (res) => {
        setShowloginButton(false);
        setShowlogoutButton(true);
        setLoggedIn(true);
    };

    const onLoginFailure = (res) => {
        console.log(res);
    };

    const onSignoutSuccess = () => {
        console.clear();
        setShowloginButton(true);
        setShowlogoutButton(false);
        setLoggedIn(false);
    };

    return (
        <div style={{marginTop:'30px',display:'flex',justifyContent:'center'}}>
            { showloginButton ?
                <GoogleLogin
                    clientId={clientId}
                    render={renderProps => (
                        <GoogleButton onClick={renderProps.onClick} disabled={renderProps.disabled}/>
                      )}
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                /> : null}

            { showlogoutButton ?
                <GoogleLogout
                    clientId={clientId}
                    buttonText="Sign Out"
                    onLogoutSuccess={onSignoutSuccess}
                >
                </GoogleLogout> : null
            }
        </div>
    );
}
export default Login;