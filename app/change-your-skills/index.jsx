import GradienLayout from "../../components/register/TemplateLayout/GradientLayout";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import styles from "../../components/register/style";

import { COLORS } from "../../constants";
import { scale } from "react-native-size-matters";
import React, { useEffect, useState } from "react";
import CustomButton from "../../components/register/Button/CustomButton";
import { Stack, router } from "expo-router";
import { SafeAreaView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useSession } from "../../context/AuthContext";
import PatchData from "../../utils/patchdata";
import { Alert } from "react-native";

export const handleChangeYourSkills = async (user, updatedTopics) => {
  const baseUrl = "https://se346-skillexchangebe.onrender.com";
  if (updatedTopics.length === 0) {
    alert("Please choose at least one topic");
    return false;
  }
  const updatedJson = {
    userTopicSkill: updatedTopics,
  };
  const data = await PatchData(
    `${baseUrl}/api/v1/user/update/${user.id}`,
    updatedJson
  );
  if (data === "404") {
    alert("User not found");
    return false;
  } else if (data === "Something went wrong") {
    alert("Something went wrong");
    return false;
  } else {
    alert("Updated successfully");
    return true;
  }
};

const ChangeNewSkills = () => {
  const baseUrl = "https://se346-skillexchangebe.onrender.com";
  const { user, login } = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [topics, setTopics] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  const [updatedTopics, setUpdatedTopics] = useState([...user.userTopicSkill]);

  const selectTopic = (item) => {
    if (!item.chosen) {
      setUpdatedTopics((prev) => [...prev, item]);
    } else {
      setUpdatedTopics((prev) => prev.filter((topic) => topic.id !== item.id));
    }

    setTopics((prevTopics) =>
      prevTopics.map((topic) => {
        if (topic._id === item._id) {
          return {
            ...topic,
            chosen: !topic.chosen,
          };
        }
        return topic;
      })
    );
  };

  const fetchTopics = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/api/v1/topic/find`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      const topicsWithChosen = json.data.map((topic) => {
        for (let i = 0; i < user.userTopicSkill.length; i++) {
          if (topic.id === user.userTopicSkill[i].id) {
            return { ...topic, chosen: true };
          }
        }
        return { ...topic, chosen: false };
      });
      setTopics(topicsWithChosen);
    } catch (error) {
      console.error("Error fetching topics:", error);
      alert("Error fetching topics:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchTopics();
  }, []);

  const handle = async () => {
    setIsLoading(true);
    const check = await handleChangeYourSkills(updatedTopics, user);
    if (check) {
      login({
        ...user,
        userTopicSkill: updatedTopics,
      });
      router.replace("/profile");
    }
    setIsLoading(false);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.white,
      }}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <GradienLayout>
        <Spinner
          visible={isLoading}
          textContent={"Loading topic..."}
          textStyle={{ color: "#FFF" }}
        />
        <Spinner
          visible={isUpdating}
          textContent={"Updating..."}
          textStyle={{ color: "#FFF" }}
        />
        <View
          style={{
            flex: 1,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
            style={{
              flexDirection: "row",
              marginLeft: scale(20),
              alignItems: "center",
            }}
          >
            <AntDesign
              name="arrowleft"
              size={16}
              color={COLORS.orange}
              style={{ marginRight: 5 }}
            />
            <Text
              style={{
                fontSize: 14,
                fontFamily: "CodaRegular",
                color: COLORS.orange,
              }}
            >
              Back
            </Text>
          </TouchableOpacity>
          <Text style={[styles.text_center, { marginTop: 10 }]}>
            CHOOSE TOPIC
          </Text>
          <Text style={styles.text_center}>you know</Text>
          <View
            style={{
              height: 4,
              backgroundColor: COLORS.purple,
              borderRadius: 50,
              width: 120,
              alignSelf: "center",
              margin: 15,
            }}
          ></View>

          <View
            style={{
              height: scale(260),
              alignSelf: "center",
              width: scale(300),
            }}
          >
            <FlatList
              data={topics}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={
                    item.chosen
                      ? styles.topicButtonSelected
                      : styles.topicButton
                  }
                  onPress={() => {
                    selectTopic(item);
                  }}
                >
                  <Text
                    style={
                      item.chosen ? styles.topicTextSelected : styles.topicText
                    }
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
              numColumns={2}
            />
          </View>
          <CustomButton
            text="Done"
            margin={false}
            style={{ alignSelf: "flex-end", marginTop: 20, marginRight: 20 }}
            onPress={handle}
          />
        </View>
      </GradienLayout>
    </SafeAreaView>
  );
};

export default ChangeNewSkills;
