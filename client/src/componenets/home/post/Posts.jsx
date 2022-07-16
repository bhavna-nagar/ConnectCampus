import { useEffect, useState,useContext } from 'react';

import { Grid, Box, getAccordionUtilityClass } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { getAccessToken} from '../../../utils/common-utils.js';

// import { getAllPosts } from '../../../service/api';
import { API } from '../../../service/api';
import Post from './Post';
import { DataContext } from '../../../context/DataProvider';
import axios from 'axios';

const Posts = () => {
    const { account } = useContext(DataContext);
    const [posts, getPosts] = useState([]);
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    const [follow,getFollow]=useState({});
    


    useEffect(()=>{
        const fetchData=async ()=>{
            console.log(category);
            let response=await API.getFollow(account.email);
            if(response.isSuccess){
                getFollow(response.data);
            }
            response = await API.getAllPosts({ category : category || '' });
            console.log(response);
            if (response.isSuccess) {
                getPosts(response.data);
            }
            console.log("posts changed");

        }
        fetchData();
    },[category]);

  

    
    

    return (
        <>
           {
            posts?.length ? posts.map(post => (
                <Grid item lg={3} sm={4} xs={12}>
                   
                        <Post  post={post} follow={follow} />
        
                </Grid>
            )) : <Box style={{color: '878787', margin: '30px 80px', fontSize: 18}}>
                    No data is available for selected category
                </Box>
           }
           
               
        </>
    )
}

export default Posts;