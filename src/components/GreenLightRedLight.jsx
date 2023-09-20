import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";
import { UserAuth } from "../context/AuthContext";

const GreenLightRedLight = () => {
  const [display, setDisplay] = useState(null);
  const [boxColor, setBoxColor] = useState("red"); // Initial color
  const [isChangingColor, setIsChangingColor] = useState(false);
  const [score, setScore] = useState(0);
  const [click, setClick] = useState(10);
  const [timer, setTimer] = useState(40);
  const intervalIdRef = useRef(null); // Create a ref to store the intervalId
  const timerRef = useRef(null);
  const { user, setUser } = UserAuth();

  console.log(user);

  useEffect(() => {
    if (isChangingColor) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev === 0) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    // Cleanup the interval on component unmount
    return () => {
      clearInterval(timerRef.current);
    };
  }, [isChangingColor]);

  useEffect(() => {
    setClick(
      user.difficulty === "easy" ? 10 : user.difficulty === "medium" ? 15 : 25
    );

    if (isChangingColor) {
      intervalIdRef.current = setInterval(() => {
        // Generate a random number (0 or 1)
        const randomNum = Math.floor(Math.random() * 2);

        // Set the new color based on the random number
        const newColor = randomNum === 0 ? "red" : "green";

        // Set the new color
        setBoxColor(newColor);
      }, 1000 + Math.random() * 1000);
    } else {
      clearInterval(intervalIdRef.current);
    }

    // Cleanup the interval on component unmount
    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isChangingColor, user.difficulty]);

  const handleScore = () => {
    if (boxColor === "red") {
      endGame();
    } else {
      setScore((prev) => {
        const updatedScore = prev + 1;
        if (updatedScore === click) {
          winGame();
          return updatedScore;
        }
        return updatedScore;
      });
    }
  };

  console.log(click);

  const endGame = () => {
    clearInterval(timerRef.current);
    clearInterval(intervalIdRef.current);
    setTimer(0);
    setDisplay("Game Over!");
  };

  const winGame = () => {
    clearInterval(timerRef.current);
    clearInterval(intervalIdRef.current);
    setTimer(0);
    setDisplay("win!");
  };

  const handleDifficultyLevelChange = (event) => {
    const user_data = JSON.parse(localStorage.getItem("user_data"));
    const new_user_data = { ...user_data, difficulty: event.target.value };
    localStorage.setItem("user_data", JSON.stringify(new_user_data));
    setUser(new_user_data);
  };

  if (display) {
    return (
      <Stack align={"center"} minH="100vh" justify={"center"}>
        <Text
          fontSize={"100px"}
          textAlign={"center"}
          color={display === "Game Over!" ? "red" : "green"}
        >
          {display}
        </Text>
      </Stack>
    );
  } else {
    return (
      <Stack p={"50px"} align="center" spacing={"10px"}>
        {!isChangingColor && (
          <Stack spacing={"50px"}>
            <Button
              colorScheme="green"
              onClick={() => setIsChangingColor(true)}
            >
              START GAME
            </Button>
            <FormControl height="90px">
              <FormLabel>Change Difficulty Level</FormLabel>
              <Select
                colorScheme="green"
                value={user.difficulty}
                onChange={handleDifficultyLevelChange}
              >
                <option value="">Select</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </Select>
            </FormControl>
          </Stack>
        )}

        {isChangingColor && (
          <Stack spacing={"10px"}>
            <Heading textAlign={"center"}>Score: {score}</Heading>

            <div
              onClick={handleScore}
              className="color-box"
              style={{
                backgroundColor: boxColor,
                width: "200px",
                height: "200px",
              }}
            ></div>

            <Text
              fontSize={"25px"}
              textAlign={"center"}
              color={timer < 20 ? "yellow" : timer < 10 ? "red" : "green"}
              mt="100px"
            >
              Timer: {timer}
            </Text>
          </Stack>
        )}
      </Stack>
    );
  }
};

export default GreenLightRedLight;
