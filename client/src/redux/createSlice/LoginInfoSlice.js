import { createSlice } from "@reduxjs/toolkit";

const LoginInfoSlice = createSlice({
  name: "LoginInfo", // 단순히 이름 지정
  initialState: {
    loginInfo: { email: "", nickname: "" },
    oauth: { provider: "" },
    accessToken: {
      authorization: "",
      refresh: "",
    },
    myid: "",
  }, // 초기값 설정, 데이터 값의 형태를 설정 해놓으면 좋음.
  reducers: {
    // reducer들을 method 형태로 보관.
    setLoginInfo: (state, action) => {
      state.loginInfo = action.payload;
    },
    setToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setProvider: (state, action) => {
      // OAuth에 사용될 provider 값 저장
      state.oauth.provider = action.payload;
    },
    setMyid: (state, action) => {
      // 나의 memberId 를 저장
      state.myid = action.payload;
    },
  },
});

export default LoginInfoSlice;
export const { 
  setLoginInfo,
  setToken,
  setProvider,
  setMyid,
} = LoginInfoSlice.actions;