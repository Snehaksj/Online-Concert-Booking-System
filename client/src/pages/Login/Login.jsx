  import "./styles.module.css";
  import axios from "axios";
  import React, { useState, useEffect } from "react";
  import {Container, ErrorPara, SignUpContainer, Title, SignInContainer, Form, Input, LoginButton, SignupButton, OverlayContainer, Anchor, LeftOverlayPanel, RightOverlayPanel, Paragraph, GhostButton, Overlay} from '../../Components';

  function Login() {
      const logininitialValues = {username:"", password:""};
      const signupinitialValues = {name:"", username:"", password:""};
      const [signIn, toggle] = React.useState(true);
      const [loginformValues, setloginFormValues ] = React.useState(logininitialValues);
      const [signupformValues, setsignupFormValues] = React.useState(signupinitialValues);
      const [loginformerrors, setloginFormErrors ] = React.useState([]);
      const [signupformerrors, setsignupFormErrors ] = React.useState([]);

      const handleloginChange = (e)=>{
          const {name ,value} =e.target;
          setloginFormValues({...loginformValues,[name]:value});
          console.log(loginformValues);
      };

      const handleloginusernameBlur = () => {
        const errors = usernamevalidation(loginformValues);
        setloginFormErrors(prevErrors => ({
          ...prevErrors,
          username: errors.username || '',
      }));
    };
    const handleloginpasswordBlur = () => {
      const errors=passwordvalidation(loginformValues);
      setloginFormErrors(prevErrors => ({
        ...prevErrors,
        password: errors.password || '',
    }));
  };

  const handlesignupusernameBlur = () => {
    const errors = usernamevalidation(signupformValues);
    setsignupFormErrors(prevErrors => ({
        ...prevErrors,
        username: errors.username || '',
    }));
  };

  const handlesignuppasswordBlur = () => {
    const errors = passwordvalidation(signupformValues);
    setsignupFormErrors(prevErrors => ({
        ...prevErrors,
        password: errors.password || '',
    }));
  };

  const handlesignupnameBlur = () => {
    const errors = namevalidation(signupformValues);
    setsignupFormErrors(prevErrors => ({
        ...prevErrors,
        name: errors.name || '',
    }));
  };


      const handlesignupChange = (e)=>{
        const {name ,value} =e.target;
        setsignupFormValues({...signupformValues,[name]:value});
        console.log(signupformValues);
    };

    const handleloginSubmit = (e) =>{
      e.preventDefault();
      const usernameErrors = usernamevalidation(loginformValues);
      const passwordErrors = passwordvalidation(loginformValues);
    
      setloginFormErrors({
        username: usernameErrors.username || '',
        password: passwordErrors.password || '',
      });
  };
    const handlesignupSubmit = (e) =>{
        e.preventDefault();
        const nameErrors = namevalidation(signupformValues);
        const usernameErrors = usernamevalidation(signupformValues);
        const passwordErrors = passwordvalidation(signupformValues);
    
      setsignupFormErrors({
        name: nameErrors.name || '',
        username: usernameErrors.username || '',
        password: passwordErrors.password || '',
      });
      if(Object.keys(nameErrors).length === 0 &&
      Object.keys(usernameErrors).length === 0 &&
      Object.keys(passwordErrors).length === 0){
        console.log("It entering here");
        const name=signupformValues.name;
        const username=signupformValues.username;
        const password=signupformValues.password;
        axios.post('http://localhost:3001/login',{name,username,password})
        .then(result => console.log(result))
        .catch(err=>console.log(err))
      }
    };
    const usernamevalidation = (values) =>{
      const errors={};
      const usernameregex =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(!values.username){
          errors.username = "Username is required";
        }
        else if(!usernameregex.test(values.username)){
          errors.username = "Invalid Username";
        }
      return errors;
    };
    const passwordvalidation = (values) =>{
      const errors={};
      if(!values.password){
        errors.password = "Password is required";
      }
      else if(values.password.length<8){
        errors.password = "Password must be minimum 8 characters";
      }
      return errors;
    };
    const namevalidation = (values) =>{
      const errors={};
        if(!values.name){
          errors.name = "Name is required";
        }
      return errors;
    };
    return(
          <Container>
              <SignUpContainer signinIn={signIn}>
                  <Form onSubmit={handlesignupSubmit}>
                      <Title>Sign Up</Title>
                      <br></br>
                      <Input name="name" type='text' placeholder='Name' value={signupformValues.name} onChange={handlesignupChange} onBlur={() =>
                              handlesignupnameBlur()}/>
                      <ErrorPara>{signupformerrors.name}</ErrorPara>
                      <Input name="username" placeholder='Email' value={signupformValues.username} onChange={handlesignupChange} onBlur={() =>
                              handlesignupusernameBlur()}/>
                      <ErrorPara>{signupformerrors.username}</ErrorPara>
                      <Input name="password" type='password' placeholder='Password' value={signupformValues.password} onChange={handlesignupChange} onBlur={() =>
                              handlesignuppasswordBlur()}/>
                      <ErrorPara>{signupformerrors.password}</ErrorPara>
                      <br></br>
                      <SignupButton>Sign Up</SignupButton>
                  </Form>
              </SignUpContainer>

              <SignInContainer signinIn={signIn}>
                    <Form onSubmit={handleloginSubmit}>
                        <Title>Login</Title>
                        <br></br>
                        <Input name="username" placeholder='Username' value = {loginformValues.username} onChange={handleloginChange} onBlur={() =>
                              handleloginusernameBlur()}/>
                        <ErrorPara>{loginformerrors.username}</ErrorPara>
                        <Input name="password" type='password' placeholder='Password' value = {loginformValues.password} onChange={handleloginChange} onBlur={() =>
                              handleloginpasswordBlur()}/>
                        <ErrorPara>{loginformerrors.password}</ErrorPara>
                        <Anchor href='#'>Forgot your password?</Anchor>
                        <LoginButton>Login</LoginButton>
                    </Form>
              </SignInContainer>

              <OverlayContainer signinIn={signIn}>
                  <Overlay signinIn={signIn}>

                  <LeftOverlayPanel signinIn={signIn}>
                      <Title>Already have an account?</Title>
                      <Paragraph>
                          Login to continue browsing
                      </Paragraph>
                      <GhostButton onClick={() => toggle(true)}>
                          Login
                      </GhostButton>
                      </LeftOverlayPanel>

                      <RightOverlayPanel signinIn={signIn}>
                        <Title>Don't have an Account?</Title>
                        <Paragraph>
                            Sign up now for an unforgettable experience
                        </Paragraph>
                            <GhostButton onClick={() => toggle(false)}>
                                Sign Up
                            </GhostButton> 
                      </RightOverlayPanel>
  
                  </Overlay>
              </OverlayContainer>

          </Container>
      )
  }

  export default Login;