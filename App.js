import { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Button,
  Text,
  Pressable,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  function addGoalHandler(enteredGoalText) {
    if (enteredGoalText.trim().length === 0) {
    } else {
      setCourseGoals((currentCourseGoals) => [
        ...currentCourseGoals,
        { text: enteredGoalText, id: Math.random().toString() },
      ]);
      endAddGoalHandler();
    }
  }

  function deleteGoalHandler(id) {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Course Goals</Text>
        </View>

        <GoalInput
          onAddGoal={addGoalHandler}
          visible={modalIsVisible}
          onCancel={endAddGoalHandler}
        />

        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onDeleteItem={deleteGoalHandler}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            alwaysBounceVertical={false}
          />

          {/* <View style={styles.goalsCard}>
            <Text style={styles.goalsCardTitle}>Et Porro Ut A Voluptatem</Text>
            <Text style={styles.goalsCardDesc}>
              Voluptas accusantium consectetur quia nostrum sed blanditiis
              explicabo. Sint eum adipisci aut accusantium facere incidunt
              molestiae ut consequatur.
            </Text>
          </View> */}
        </View>

        <Pressable
          onPress={startAddGoalHandler}
          android_ripple={styles.addGoalButtonPressed}
          style={({ pressed }) => [
            styles.addGoalButton,
            pressed && styles.addGoalButtonPressed,
          ]}
        >
          <Text style={styles.addGoalButtonText}>Add New Goal</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  goalsCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 6,
    marginVertical: 8,
  },
  goalsCardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  goalsCardDesc: {
    fontSize: 16,
    color: "#000",
  },
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5,
  },
  titleContainer: {
    paddingTop: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  addGoalButton: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 48,
    padding: 8,
    backgroundColor: "#5e0acc",
    borderRadius: 6,
  },
  addGoalButtonPressed: {
    opacity: 0.5,
  },
  addGoalButtonText: {
    color: "#fff",
    fontSize: 20,
  },
});
