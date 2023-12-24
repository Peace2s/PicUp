import React, {useState} from 'react';
import { Avatar,Button, Paper, Grid, Typography, Container } from '@material-ui/core';

import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import useStyle from './style';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import {signin, signup} from '../../actions/auth';

const initialState = { firstName: '', lastName: '',email: '', password: '', confirmPassword: ''};

const Auth = () => {
    const classes = useStyle();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
 

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleSubmit = (e) =>{
        e.preventDefault();
        if (formData.email === 'admin@gmail.com' && formData.password=='admin') {
            // Navigate to admin page
            navigate('/admin');
        }else{
            if(isSignup) {
                dispatch(signup(formData,navigate))
            }else {
                dispatch(signin(formData,navigate))
            }
        }
        

    }
    const handleChange = (e) =>{
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const switchMode = () =>{
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    }

  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon></LockOutlinedIcon>
            </Avatar>
            <Typography variant='h5'>{isSignup ? 'Đăng ký':'Đăng nhập'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {   isSignup && (
                        <>
                            
                            <Input name='firstName' label="Họ" handleChange={handleChange} autoFocus half/>
                           
                            <Input name='lastName' label="Tên" handleChange={handleChange} half/>
                            
                        </>
                    )}
                    <Input name="email" label="Email" handleChange={handleChange} type="email"/>
                    <Input name="password" label="Mật khẩu" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                    {isSignup && <Input name='confirmPassword' label={"Nhập lại mật khẩu"} handleChange={handleChange} type="password"/>}
                </Grid>
                <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                    {isSignup ? 'Đăng ký' : 'Đăng nhập'}
                </Button>
                <Grid container justify='flex-end'>
                    <Grid item>
                        <Button onClick={switchMode}>
                            {isSignup ? 'Bạn đã có tài khoản? | Đăng nhập' : 'Chưa có tài khoản? | Đăng ký'}
                        </Button>
                    </Grid>

                </Grid>
            </form>
        </Paper>

    </Container>
  )
}

export default Auth