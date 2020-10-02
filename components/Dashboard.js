import React, { useEffect, useRef, useState } from "react";
import { View, FlatList, ToastAndroid, ProgressBarAndroid } from "react-native";
import Post from "./Post";

const Dashboard = ({ navigation }) => {
  // For holding the current page number.
  const pagination_index = useRef(1);
  const [posts, setPosts] = useState([]);

  //   Reference for holding the Loading state
  const loading = useRef(false);

  //   For holding the API data End Reached state
  const [endReached, setEndReached] = useState(false);

  useEffect(() => {
    //   Initial API Call
    loadMorePosts();
  }, []);

  const loadMorePosts = () => {
    fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${pagination_index.current}&_limit=10s`
    )
      .then((res) => res.json())
      .then((res) => {
        //   Check whether the API data is valid array.
        if (res && Array.isArray(res)) {
          // Attaching new data to the previous state.
          setPosts((prevPosts) => [...prevPosts, ...res]);

          //   When no data is returned from API, it is marked as end reached.
          if (res.length === 0) {
            setEndReached(true);
          }

          //   Pagination index changes for next API call.
          pagination_index.current = pagination_index.current + 1;
        } else {
          console.error("Invalid API response");
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        //   Loading refernece is made false.
        loading.current = false;
      });
  };
  return (
    <View>
      <FlatList
        data={posts}
        renderItem={({ item }) => <Post post={item} />}
        keyExtractor={(item) => `${item.id}`}
        onEndReached={() => {
          // Conditions to avoid unnecessary/duplicate API calls.
          if (loading.current) {
            return;
          }
          if (endReached) {
            ToastAndroid.show("Reached the end!", ToastAndroid.SHORT);
            return;
          }
          //   Starting to load
          loading.current = true;
          ToastAndroid.show("Loading more. ", ToastAndroid.SHORT);
          loadMorePosts();
        }}
        onEndReachedThreshold={0.9}
        ListFooterComponent={!endReached ? <ProgressBarAndroid /> : null}
      />
    </View>
  );
};

export default Dashboard;
