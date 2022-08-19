import React from "react";
import "./App.css";
import Layout from "../Layout/Layout";
import { useSelector, shallowEqual } from "react-redux";

const App = () => {
  const articles: readonly IArticle[] = useSelector(
    (state: ArticleState) => state.articles,
    shallowEqual
  )
  return (
    <Layout>
      {articles.map(value => {
        return <p>{value.id}</p>
      })}
      <h1>Hello React</h1>
      <div>You are at home</div>
    </Layout>
  );
}

export default App;
