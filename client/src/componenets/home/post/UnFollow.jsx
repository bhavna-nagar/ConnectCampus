import { styled, Box, Typography } from '@mui/material';
import {useNavigate} from 'react-router-dom'

const Image = styled(Box)`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgb(238,174,202);
    background: linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);
`;

const Heading = styled(Typography)`
    font-size: 70px;
    color: #FFFFFF;
    line-height: 1
`;

const SubHeading = styled(Typography)`
    font-size: 20px;
    background: #FFFFFF;
`;

const UnFollow= () => {
    const navigate=useNavigate();
    
    return (
        <Image>
            <Heading >You UnFollowed an Account!!</Heading>
            <SubHeading onClick={()=>{navigate('/')}}>Click for Go Back TO home</SubHeading>
        </Image>
    )
}

export default UnFollow;