
import React, { useState, useEffect, useContext } from 'react';

import { styled, Box, TextareaAutosize, Button, InputBase, FormControl,Radio,RadioGroup,FormControlLabel ,FormLabel } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`;

const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`;

const Textarea = styled(TextareaAutosize)`
    width: 100%;
    border: none;
    margin-top: 50px;
    font-size: 18px;
    &:focus-visible {
        outline: none;
    }
`;

const initialPost = {
    title: '',
    description: '',
    picture: '',
    name:'',
    email: '',
    likes:[],
    categorie: '',
    createdDate: new Date()
}

const CreatePost = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const { account } = useContext(DataContext);
   
    const url = post.picture ? post.picture:'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    const savePost = async () => {
        const response=await API.createPost(post);
            setFile('');
            navigate('/');
        
    }

    useEffect(()=>{
        const getImage=async ()=>{
            const data = new FormData();
            data.append("name", file.name);
            data.append("file", file);
            const response = await API.uploadFile(data);
            post.picture = response.data;
        }
        getImage();
           post.name = account.name;
           post.email=account.email;
        
    },[file]);

    return (
        <Container>
            <Image src={url}  />

            <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add fontSize="large" color="action" />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <InputTextField  onChange={(e) => handleChange(e)} name='title' placeholder="Title" />
                <Button onClick={() => savePost()} variant="contained" color="primary">Publish</Button>
            </StyledFormControl>
            <RadioGroup aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="categorie"
                                        onChange={(e) => handleChange(e)}
                                        >
                                       Choose Category
                                      <FormControlLabel value="Workshop" control={<Radio />} label="Workshop" />
                                      <FormControlLabel value="Hackathon" control={<Radio />} label="Hackathon" />
                                      <FormControlLabel value="College Festival" control={<Radio />} label="College Festival" />
                                      <FormControlLabel value="All" control={<Radio />} label="All" />
            </RadioGroup>

            <Textarea
                rowsMin={5}
                placeholder="Tell your story..."
                onChange={(e) => handleChange(e)} 
                name='description' 
            />
        </Container>
    )
}

export default CreatePost;
