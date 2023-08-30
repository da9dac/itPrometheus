import React from "react";
import { styled } from "styled-components";
import { PageContainer } from "../../../atoms/layouts/PageContainer";
import { useSelector } from "react-redux";
import tokens from "../../../styles/tokens.json";
import DetailVideo from "./DetailVideo";
import DetailReview from "./DetailReview";
import DetailContent from "./DetailContent";

const globalTokens = tokens.global;

export const DetailContainer = styled.div`
  width: 100%;
  max-width: 1170px;
  display: flex;
  flex-direction: start;
  justify-content: start;
  align-items: center;
  flex-wrap: wrap;

  border: 1px solid black;
`;

const DetailPage = () => {
  const isDark = useSelector((state) => state.uiSetting.isDark);

  return (
    <PageContainer isDark={isDark}>
      <DetailContainer>
        <DetailVideo />
        <DetailContent />
        <DetailReview />
      </DetailContainer>
    </PageContainer>
  );
};

export default DetailPage;