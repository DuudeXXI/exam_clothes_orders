import { useContext } from "react";
import HomeContext from "../../Contexts/HomeContext";

import { useState } from "react";

function Line({ clothe }) {

    const { setComment } = useContext(Home);

    const [rate, setRate] = useState(5);
    const [post, setPost] = useState('');

    const add = () => {
        setComment({
            post,
            movie_id: movie[1][0].id
        });
        setPost('');
    }