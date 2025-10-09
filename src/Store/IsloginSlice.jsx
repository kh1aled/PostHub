import { createSlice } from "@reduxjs/toolkit";

const IsloginSlice = createSlice({
  name: "islogin",
  initialState: {
    value: false, // القيمة الافتراضية للمصادقة
    username: "", // يمكنك إضافة اسم المستخدم هنا أيضًا
    avatar:"",
    id:""
  },
  reducers: {
    login: (state, action) => {
      state.value = true; // تسجيل الدخول
      state.username = action.payload.username; // تخزين اسم المستخدم
      state.id = action.payload.id; // تخزين اسم المستخدم
      state.avatar = action.payload.avatar
    },
    logout: (state) => {
      state.value = false; // تسجيل الخروج
      state.avatar = ""; // مسح اسم المستخدم
      state.username = ""; // مسح اسم المستخدم
      state.id = ""; // مسح اسم المستخدم
    },
  },
});

export const { login, logout } = IsloginSlice.actions;
export default IsloginSlice;
