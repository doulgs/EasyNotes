import "@/styles/global.css";

import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync, SQLiteProvider } from "expo-sqlite/next";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/database/drizzle/migrations";

import { Slot } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const DATABASE_NAME = "easyNote.db";
const expoBD = openDatabaseSync(DATABASE_NAME);
const db = drizzle(expoBD);

export default function Layout() {
  const { success, error } = useMigrations(db, migrations);

  if (error) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Migration error: {error.message}</Text>
      </View>
    );
  }
  if (!success) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Migration is in progress...</Text>
        <ActivityIndicator size={32} />
      </View>
    );
  }

  return (
    <GestureHandlerRootView className="flex-1">
      <SQLiteProvider databaseName={DATABASE_NAME}>
        <Slot />
      </SQLiteProvider>
    </GestureHandlerRootView>
  );
}
