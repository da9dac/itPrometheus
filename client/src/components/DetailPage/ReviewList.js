import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import Stars from "../contentListItems/Stars";
import tokens from "../../styles/tokens.json";
import {
  NegativeTextButton,
  PositiveTextButton,
} from "../../atoms/buttons/Buttons";
import {
  BodyTextTypo,
  SmallTextTypo,
} from "../../atoms/typographys/Typographys";
import { RegularInput } from "../../atoms/inputs/Inputs";
import { ConfirmModal } from "../../atoms/modal/Modal";

const globalTokens = tokens.global;

const ReviewList = ({ el, getReview }) => {
  const isDark = useSelector((state) => state.uiSetting.isDark);
  const myId = useSelector((state) => state.loginInfo.myid);
  const token = useSelector((state) => state.loginInfo.accessToken);
  const [isEditMode, setEditMode] = useState(false);
  const [editReply, setEditReply] = useState({
    content: el.content,
    star: 0,
  });
  const [saveReview, setSaveReview] = useState(false);
  const [delReview, setDelReview] = useState(false);

  const patchReview = (replyId) => {
    return axios
      .patch(`https://api.itprometheus.net/replies/${replyId}`, editReply, {
        headers: { Authorization: token.authorization },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 204) {
          getReview();
        }
      })
      .catch((err) => console.log(err));
  };

  const deleteReview = (replyId) => {
    return axios
      .delete(`https://api.itprometheus.net/replies/${replyId}`, {
        headers: { Authorization: token.authorization },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 204) {
          getReview();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <ReList isDark={isDark}>
        {myId === el.member.memberId && (
          <>
            {isEditMode ? (
              <ReviewPatch
                isDark={isDark}
                onClick={() => {
                  setSaveReview(true);
                  // if (window.confirm("댓글을 저장 하시겠습니까?")) {
                  //   setEditMode(false);
                  //   patchReview(el.replyId);
                  // }
                }}
              >
                저장
              </ReviewPatch>
            ) : (
              <ReviewPatch
                isDark={isDark}
                onClick={() => {
                  setEditMode(true);
                  setEditReply({ ...editReply, star: el.star });
                }}
              >
                수정
              </ReviewPatch>
            )}
            <ReviewDelete
              isDark={isDark}
              onClick={() => {
                setDelReview(true);
                // if (window.confirm("댓글을 삭제 하시겠습니까?")) {
                //   deleteReview(el.replyId);
                // }
              }}
            >
              삭제
            </ReviewDelete>
          </>
        )}

        <StarBox>
          <Stars score={el.star} />
        </StarBox>
        {isEditMode ? (
          <ReviewEdit
            isDark={isDark}
            value={editReply.content}
            onChange={(e) =>
              setEditReply({ ...editReply, content: e.target.value })
            }
          />
        ) : (
          <ReviewContent isDark={isDark}>{el.content}</ReviewContent>
        )}

        <ReviewInfo isDark={isDark}>
          <ReviewName isDark={isDark}>{el.member.nickname}</ReviewName>
          <ReviewDate isDark={isDark}>
            {el.createdDate.split("T")[0]}
          </ReviewDate>
        </ReviewInfo>
      </ReList>
      <ConfirmModal
        isModalOpen={saveReview}
        setIsModalOpen={setSaveReview}
        isBackdropClickClose={false}
        content="댓글을 저장 하시겠습니까?"
        negativeButtonTitle="아니요"
        positiveButtonTitle="네"
        handleNegativeButtonClick={() => {
          setSaveReview(false);
        }}
        handlePositiveButtonClick={() => {
          setEditMode(false);
          patchReview(el.replyId);
          setSaveReview(false);
        }}
      />
      <ConfirmModal
        isModalOpen={delReview}
        setIsModalOpen={setDelReview}
        isBackdropClickClose={false}
        content="댓글을 삭제 하시겠습니까?"
        negativeButtonTitle="아니요"
        positiveButtonTitle="네"
        handleNegativeButtonClick={() => {
          setDelReview(false);
        }}
        handlePositiveButtonClick={() => {
          deleteReview(el.replyId);
          setDelReview(false);
        }}
      />
    </>
  );
};

export default ReviewList;

export const StarBox = styled.div`
  position: relative;
  width: 120px;
  height: 24px;
  margin-bottom: 5px;
`;

export const ReList = styled.li`
  position: relative;
  width: 100%;
  max-width: 500px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: start;
  border: 1px solid
    ${(props) =>
      props.isDark ? globalTokens.Gray.value : globalTokens.LightGray.value};
  border-radius: ${globalTokens.RegularRadius.value}px;
  padding: ${globalTokens.Spacing16.value}px ${globalTokens.Spacing20.value}px;
  margin-top: 15px;
`;

export const ReviewPatch = styled(PositiveTextButton)`
  position: absolute;
  top: 5px;
  right: 10%;
  text-decoration: underline;
  font-size: ${globalTokens.SmallText.value}px;
`;

export const ReviewDelete = styled(NegativeTextButton)`
  position: absolute;
  top: 5px;
  right: 3%;
  text-decoration: underline;
  font-size: ${globalTokens.SmallText.value}px;
`;

export const ReviewEdit = styled(RegularInput)`
  width: 100%;
  flex-wrap: wrap;
  margin: 5px 0px;
  padding: 5px 10px;
  border: none;
  background-color: ${(props) =>
    props.isDark ? "rgba(255,255,255,0.15)" : globalTokens.White.value};
  &:focus {
    outline: none;
  }
`;
export const ReviewContent = styled(BodyTextTypo)`
  width: 100%;
  flex-wrap: wrap;
  margin: 5px 0px;
  padding: 5px 0px;
`;

export const ReviewInfo = styled(SmallTextTypo)`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  color: ${(props) =>
    props.isDark ? globalTokens.LightGray.value : globalTokens.Gray.value};
`;

export const ReviewName = styled(SmallTextTypo)`
  margin-right: 10px;
  color: ${(props) =>
    props.isDark ? globalTokens.LightGray.value : globalTokens.Gray.value};
`;

export const ReviewDate = styled(SmallTextTypo)`
  color: ${(props) =>
    props.isDark ? globalTokens.LightGray.value : globalTokens.Gray.value};
`;
