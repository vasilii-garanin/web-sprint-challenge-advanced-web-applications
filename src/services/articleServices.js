import React, { useState } from "react";
import axiosWithAuth from "./../utils/axiosWithAuth";

const articleService = () =>
{

    const [articles, setArticles] = useState([]);

    componentDidMount = (articles) =>
    {
        axiosWithAuth(articles)
            .get('/articles')
            .then(resp =>
            {
                setArticles({
                    articles: resp.data.articles
                });
            })
            .catch(error =>
            {
                console.log(error);
            });
    };


    return (
        <div></div>
    );
    export default articleService;

//Task List:
//1. Complete articleServices. This module should make an authenticated call and return an array of those articles.