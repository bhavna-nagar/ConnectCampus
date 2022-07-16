import { styled, Box, Typography,Button } from '@mui/material';
import {Link,useNavigate} from 'react-router-dom';
import { useState,useContext } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useEffect } from 'react';
import { DataContext } from '../../../context/DataProvider';
import { API } from '../../../service/api';




const Container = styled(Box)`
    border: 1px solid #d3cede;
    border-radius: 10px;
    margin: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    & > img, & > p {
        padding: 0 5px 5px 5px;
    }
`;

const Holder=styled(Box)`
display: flex;
align-items: flex-start;
flex-direction: row;
width:80%;

`;

const Image = styled('img')({
    width: '100%',
    objectFit: 'cover',
   
    height: 150
});

const Text = styled(Typography)`
    font-size: 12px;
`;

const Heading = styled(Typography)`
    font-size: 18px;
    font-weight: 600
`;

const Details = styled(Typography)`
    font-size: 14px;
    word-break: break-word;
    color:#708090;
`;

const StyledButton = styled(Button)`
    margin: 10px;
    background: blue;
    color: #fff;
    text-decoration: none;
`;
const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;


const Post = ({ post,follow,handleToggle}) => {
    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1550537687-c91072c4792d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGF0dGVybnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60';
    
    const addEllipsis = (str, limit) => {
        return str.length > limit ? str.substring(0, limit) + '...' : str;
    }
    console.log("in post");
    console.log(follow);
    const { account } = useContext(DataContext);
    const [likes,setLikes]=useState(post.likes);
    const [likestatus,setLikeStatus]=useState(post.likes.find((email)=>account.email===email));
    const [likecount,setLikeCount]=useState(post.likes.length);
    const [followstatus,setFollowStatus]=useState(follow.following.find((email)=>post.email===email))
      
   
    useEffect(()=>{
        const helper=async()=>{
            post={...post,likes:likes};
            console.log(post);
            const response=await API.updatePost(post);
            if (response.isSuccess) {
                setLikeCount(post.likes.length);    
            }
        }
        helper();
    },[likestatus])


    const handleLike=()=>{
        let arr=likes;
        arr.push(account.email);
        setLikes(arr);
        setLikeStatus(true);
    }
    const handleUnLike=()=>{
        let arr=likes.filter(email=>email!==account.email);
        setLikes(arr);
        setLikeStatus(false);
    }

    const handleFollow=async()=>{
        let response;
        console.log("newFollow");
        if(followstatus){
            let arr=follow.following.filter(email=>email!==post.email);
            const newFollow={...follow,following:arr};
            console.log(newFollow);
            response=await API.updateFollow(newFollow); 
        }
        else{
            let arr=follow.following;
            arr.push(post.email);
            const newFollow={...follow,following:arr};
            console.log(newFollow);
            response=await API.updateFollow(newFollow);
        }
        if(response.isSuccess){
           handleToggle(post.id);
        }
    }


    return (
        <Container>
            <Holder >
            <Text style={{marginRight:10,marginTop:10,fontSize:20,fontFamily:'Century Gothic'}}> {post.name}</Text>
             {
                post.email===account.email?<Text></Text>:
                followstatus?
              <Link to={'/unfollow'}> 
               <Text onClick={()=>handleFollow()} style={{marginLeft:10,marginTop:10,fontSize:15,fontFamily:'Century Gothic'}}>Unfollow  {post.name}</Text>
               </Link>
              :
               <Link to={'/follow'}>
                <Text onClick={()=>handleFollow()}  style={{marginLeft:10,marginTop:10,fontSize:15,fontFamily:'Century Gothic'}}>follow  {post.name}</Text> 
                </Link>          
            }
            </Holder>
            
            <Image src={url} alt="post" />
            <Holder style={{flexDirection:'column',padding:'10px',textAlign:'left'}}>
            <Text style={{color: '#a9a9a9'}}>{new Date(post.createdDate).toDateString()}</Text>
            <Text style={{color: '#a9a9a9'}}>Category : {post.categorie}</Text>
            <Heading>{addEllipsis(post.title, 20)}</Heading>
            <Details>{addEllipsis(post.description, 50)}</Details>
           
            {likestatus?<FavoriteIcon style={{fontSize:'35px',color:'red'}} onClick={()=>handleUnLike()}/> 
              :
                 <FavoriteBorderIcon style={{fontSize:'35px',color:'black'}} onClick={()=>handleLike()}/>}
               <Text style={{color:'#a9a9a9'}}>{likecount} likes</Text>  
               <Link style={{textDecoration: 'none', color: 'inherit'}} to={`details/${post._id}`}>
                        <Text style={{fontSize:'20px',color:'#fb607f',textDecoration:'underline'}}>View the Post</Text>
                </Link>
            </Holder>       
        </Container>
    )
}

export default Post;