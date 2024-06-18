import React, { useRef, useEffect, useState } from "react";
import { Box, Button, Container, Flex, IconButton, Input, Text, VStack } from "@chakra-ui/react";
import { FaHeart, FaThumbsUp, FaComment } from "react-icons/fa";

const Index = () => {
  const videoRef = useRef(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((err) => {
          console.error("Error accessing webcam: ", err);
        });
    }
  }, []);

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Box as="video" ref={videoRef} autoPlay width="100%" height="auto" bg="black" />
        <Flex justifyContent="space-around" width="100%">
          <IconButton aria-label="Like" icon={<FaThumbsUp />} size="lg" />
          <IconButton aria-label="Heart" icon={<FaHeart />} size="lg" />
          <IconButton aria-label="Comment" icon={<FaComment />} size="lg" />
        </Flex>
        <Box width="100%">
          <Text fontSize="xl" mb={2}>Comments</Text>
          <VStack spacing={2} align="start" maxH="200px" overflowY="auto" width="100%">
            {comments.map((comment, index) => (
              <Box key={index} p={2} bg="gray.100" borderRadius="md" width="100%">
                {comment}
              </Box>
            ))}
          </VStack>
          <Flex mt={4}>
            <Input
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              mr={2}
            />
            <Button onClick={handleAddComment}>Comment</Button>
          </Flex>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;