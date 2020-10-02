import React from "react";
import { View, Text } from "react-native";
import { postStyle } from "../styles/Styles";

// To avoid re-render the component props are memorized
const Post = React.memo(({ post }) => {
  return (
    <View style={postStyle.container}>
      <Text style={postStyle.title}>{`${post.title}(${post.id})`}</Text>
      <Text style={postStyle.body}>{`${post.body}`}</Text>
    </View>
  );
});

export default Post;
