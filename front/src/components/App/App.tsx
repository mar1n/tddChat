import React, { useEffect } from "react";
import "./App.css";
import Layout from "../Layout/Layout";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { fetchTodos } from "../../store/reducer";

const App = () => {
  const dispatch = useDispatch()
  const articles: readonly IArticle[] = useSelector(
    (state: ArticleState) => state.articles,
    shallowEqual
  )
  useEffect(() => {
    const anonymous = async () => {
      await fetchTodos(dispatch);
    }
    anonymous();
  }, [])
  return (
    <Layout>
      {articles.map((value, index) => {
        return <p key={index}>{value.id}</p>
      })}
      <h1>Hello React</h1>
      <div>You are at home</div>
    </Layout>
  );
}

export default App;
