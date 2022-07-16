import { styled, Box, Typography } from '@mui/material';

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
    font-size: 70px;
    color: #FFFFFF;
    line-height: 1
`;

const SubHeading = styled(Typography)`
    font-size: 20px;
    background: #FFFFFF;
`;

const Banner = () => {
    
    return (
        <Image>
            <Heading >HACKCAMPUS</Heading>
            <Typography style={{color:"white"}}>hackathons,workshops and college events of your interest at one click!!</Typography>
        </Image>
    )
}

export default Banner;