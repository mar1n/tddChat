import * as actionTypes from "./actionTypes";
import { AppDispatch } from "./store";
import axios from "axios";

export const initialState: ArticleState = {
  articles: [
    
  ],
};

export async function fetchRooms(dispatch: AppDispatch) {
  //const response = await client.get('/fakeApi/todos')
  const response = await axios({
    method: "GET",
    url: `http://localhost:500/rooms`,
  });
  console.log('thunk')
  dispatch({
    type: "roomsAdd",
    rooms: { ...response.data }
  });
}

const rootReducer = (
  state: ArticleState = initialState,
  action: ArticleAction
): ArticleState => {
  switch (action.type) {
    case actionTypes.ADD_ARTICLE:
      const newArticle: IArticle = {
        id: Math.random(),
        title: action.article.title,
        body: action.article.body,
      };
      return {
        ...state,
        articles: state.articles.concat(newArticle),
      };
    case actionTypes.REMOVE_ARTICLE:
      const updateArticles: IArticle[] = state.articles.filter(
        (article) => article.id !== action.article.id
      );
      return {
        ...state,
        articles: updateArticles,
      };
  }
  return state;
};

export default rootReducer;
