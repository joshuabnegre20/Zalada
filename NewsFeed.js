
import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import styles from './styles';

const NewsFeed = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  const addComment = () => {
    if (newComment.trim() !== '') {
      setComments([...comments, { text: newComment }]);
      setNewComment('');
    }
  };

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    } else {
      setLikes(likes + 1);
      setLiked(true);
    }
  };

  return (
    <View style={styles.newsFeedContainer}>
      <Text style={styles.sectionTitle}>NewsFeed</Text>
      <View>
        <Text style={styles.postTitle}>Ethereal</Text>
        <Text style={styles.postContent}>
          At the end of the day, it's the person who makes your birthday blues disappear.
        </Text>
      </View>

      <TouchableOpacity style={styles.likeButton} onPress={handleLike}>
        <Text style={styles.likeButtonText}>{liked ? 'Unlike' : 'Like'} ({likes})</Text>
      </TouchableOpacity>

      {comments.map((comment, index) => (
        <View key={index} style={styles.commentContainer}>
          <Text style={styles.commentText}>{comment.text}</Text>
        </View>
      ))}

      <TextInput
        style={styles.input}
        placeholder="Add a comment..."
        value={newComment}
        onChangeText={text => setNewComment(text)}
      />
      <Button title="Add Comment" onPress={addComment} />
    </View>
  );
};

export default NewsFeed;