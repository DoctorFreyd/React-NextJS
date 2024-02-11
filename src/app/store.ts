import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import postsReducer from "@/feauters/posts/postsSlice";
function makeStore() {
  return configureStore({
    reducer: {
      posts: postsReducer,
    },
  });
}
export const store = makeStore();

export const wrapper = createWrapper(makeStore);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
