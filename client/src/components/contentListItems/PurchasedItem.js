import React,{useState} from "react";
import tokens from "../../styles/tokens.json";
import { styled } from "styled-components";
import arrowDown from "../../assets/images/icons/arrow/subscribe_arrow_down.svg";
import arrowUp from "../../assets/images/icons/arrow/subscribe_arrow_up.svg";
import HorizonItem from "./HorizonItem";

const globalTokens = tokens.global;

const ItemBody = styled.div`
    width: 100%;
    padding: ${globalTokens.Spacing28.value}px;
    gap: ${globalTokens.Spacing8.value}px;
    border: 1px lightgray solid;
    border-radius: ${globalTokens.RegularRadius.value}px;
    display: flex;
    flex-direction: column;
`
const ProfileContainer = styled.div`
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;   
    gap: ${globalTokens.Spacing8.value}px;
`
const ProfileImg = styled.img`
    max-height: 50px;
    height: auto;
    width: auto;
`
const ImgContainer = styled.span`
    width: 50px;
    height: 50px;
    border-radius: ${globalTokens.CircleRadius.value}px;
    background-color: ${globalTokens.White.value};
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid lightgray;
    overflow: hidden;
`
const TextInfor = styled.div`
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const AuthorName = styled.div`
    font-size: ${globalTokens.Heading5.value}px;
    font-weight: ${globalTokens.Bold.value};
`
const Subscribers = styled.div`
    font-size: ${globalTokens.BodyText.value}px;
`
const ContentContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 12px 0;
`
const TopContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
const LectureCount = styled.div`
    font-size: ${globalTokens.BodyText.value}px;
    display: flex;
`
const CountNum = styled.div`
    font-weight: ${globalTokens.Bold.value};
`
const AccordionButton = styled.button`
    width: 40px;
    height: 20px;
`
const AccordionArrow = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`
const HorizonItemContainer = styled.ul`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${globalTokens.Spacing16.value}px;
    margin-bottom: ${globalTokens.Spacing28.value}px;
    max-height: ${(props)=>props.isOpen?'10000px':'0px'};
    overflow: hidden;
    transition: 500ms;
`


export default function PurchasedItem() {
    const [isOpen, setIsOpen] = useState(false)
    const a = {
            "videoId": 1,
            "videoName": "촛불로 공부하기",
            "thumbnailUrl": "https://d2ouhv9pc4idoe.cloudfront.net/4/videos/1/video1.png",
            "views": 1266,
            "price": 0,
            "star": 0.0,
            "isPurchased": false,
            "description": "test 영상입니다.",
            "categories": [
                {
                    "categoryId": 1,
                    "categoryName": "React"
                },
                {
                    "categoryId": 2,
                    "categoryName": "Redux"
                }
            ],
            "channel": {
                "memberId": 4,
                "channelName": "andygugu",
                "subscribes": 3,
                "isSubscribed": false,
                "imageUrl": "https://d2ouhv9pc4idoe.cloudfront.net/4/profile/test22.png"
            },
            "createdDate": "2023-09-04T00:00:00"
        }
    return (
        <ItemBody>
            <ProfileContainer>
            <ImgContainer>
                <ProfileImg src="https://d2ouhv9pc4idoe.cloudfront.net/4/profile/test22.png" />
            </ImgContainer>
            <TextInfor>
                <AuthorName>andygugu</AuthorName>
                <Subscribers>구독자 3명</Subscribers>
            </TextInfor>
            </ProfileContainer>
            <TopContainer> 
                <LectureCount><CountNum>3</CountNum>개의 강의</LectureCount>
                <AccordionButton onClick={() => setIsOpen(!isOpen)} ><AccordionArrow src={isOpen?arrowUp:arrowDown} /></AccordionButton>
            </TopContainer>
            <ContentContainer >
                <HorizonItemContainer isOpen={isOpen}>
                    <HorizonItem lecture={a}/><HorizonItem lecture={a}/><HorizonItem lecture={a}/></HorizonItemContainer>
            </ContentContainer>
        </ItemBody>
    )
}