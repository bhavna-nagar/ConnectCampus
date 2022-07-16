import React from 'react';
import {Box,TextField,Button, Typography, styled,RadioGroup,FormControlLabel,Radio} from '@mui/material';
import  { useState, useEffect, useContext } from 'react';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import { useNavigate } from 'react-router-dom';




const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;



const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);
    color: #fff;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`

const Image = styled(Box)`
    width: 100%;
    height: 20vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgb(238,174,202);
    background: linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);
`;

const Heading = styled(Typography)`
    font-size: 40px;
    color: #FFFFFF;
    line-height: 1
`;

const loginInitialValues = {
    email: '',
    password: ''
};

const signupInitialValues = {
    name: '',
    accounttype: '',
    email:'',
    password: '',
};

const Login=({isUserAuthenticated})=>{
    const imageURL = 'logo.png';

    const [account,toggleAccount]=useState('login');
    const [login, setLogin] = useState(loginInitialValues);
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, showError] = useState('');
    const {setAccount}=useContext(DataContext);

    const navigate=useNavigate();

    const toggleSignup=()=>{
        account==='login'?toggleAccount('signup'):toggleAccount('login');
    }

    const onInputChange=(e)=>{
        setSignup({...signup,[e.target.name]:e.target.value});
    }

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const signupUser=async()=>{
        console.log("hello");
        let response = await API.userSignup(signup);
        console.log(response);
        if (response.isSuccess) {
            showError('');
            setSignup(signupInitialValues);
            toggleAccount('login');
        } else {
            showError('Something went wrong! please try again later');
        }
    }


    const loginUser = async () => {
        let response = await API.userLogin(login);
        if (response.isSuccess) {
            showError('');

            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            setAccount({ name: response.data.name, email: response.data.email });
            
            isUserAuthenticated(true)
            navigate('/');
            setLogin(loginInitialValues);
           
        } else {
            showError('Something went wrong! please try again later');
        }
    }


  return (
    <Component>
    <Box>
    
        <Image>
            <Heading >HACKCAMPUS</Heading>
        </Image>

     {account==='login'?
        <Wrapper>
                            <TextField variant="standard" value={login.email} name='email' label='Enter Email' onChange={(e) => onValueChange(e)} />
                            <TextField variant="standard" value={login.password} name='password' label='Enter Password' onChange={(e) => onValueChange(e)} />
                            {error && <Error>{error}</Error>}
                            <LoginButton variant="contained" onClick={()=>loginUser()} >Login</LoginButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <SignupButton  style={{ marginBottom: 50 }} onClick={()=>toggleSignup()}>Create an account</SignupButton>
        </Wrapper>
        :
       <Wrapper>
                            <TextField variant="standard"  name='name' label='Enter Name' onChange={(e) => onInputChange(e)} />
                            <Text style={{ textAlign: 'left',fontSize:15 }}>Account Type</Text>

                            <RadioGroup aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="accounttype" 
                                        onChange={(e) => onInputChange(e)}
                                        >
                                      <FormControlLabel value="organization" control={<Radio />} label="Organization" />
                                      <FormControlLabel value="other" control={<Radio />} label="Other" />
                            </RadioGroup>

                            <TextField variant="standard" name='email' label='Enter Email' onChange={(e) => onInputChange(e)} />

                            <TextField variant="standard"  name='password' label='Enter Password' onChange={(e) => onInputChange(e)}/>
                            {error && <Error>{error}</Error>}
                            <SignupButton  onClick={()=>signupUser()}>Signup</SignupButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <LoginButton variant="contained" onClick={()=>toggleSignup()}>Already have an account</LoginButton>
      </Wrapper>
    }
    </Box>
    </Component>
  );
}

export default Login;