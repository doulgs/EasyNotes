import clsx from "clsx";
import { Swipeable } from "react-native-gesture-handler";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Keyboard,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { NotesType, useNotes } from "@/hooks/notes";
import { Entypo } from "@expo/vector-icons";

export default function Index() {
  const { createNote, updateNote, deleteNote, fetchNotes } = useNotes();

  const [noteName, setNoteName] = useState<string>("");
  const [notesList, setNotesList] = useState<NotesType[]>([]);
  const [selectedType, setSelectedType] = useState<"PENDENTE" | "FINALIZADO">("PENDENTE");

  async function getNotes() {
    const result = await fetchNotes();
    setNotesList(result);
  }

  const handleCreateNote = async () => {
    if (noteName.trim() === "") return;

    await createNote({ name: noteName });
    Keyboard.dismiss();
    setNoteName("");
    getNotes();
  };

  const handleChangeNote = async (note: NotesType) => {
    await updateNote(note);
    getNotes();
  };

  const handleDeleteNote = async (id: number) => {
    Alert.alert("Sistema", "Deseja realmente deletar essa anotação?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Confirmar",
        onPress: async () => {
          await deleteNote(id);
          getNotes();
        },
      },
    ]);
  };

  const renderRightActions = (id: number) => (
    <Pressable
      className="ml-4 p-4 rounded-lg bg-slate-500 mb-4"
      onPress={() => handleDeleteNote(id)}
    >
      <Text className="text-red-900 font-semibold">Excluir Nota</Text>
    </Pressable>
  );

  const renderNotes = useCallback(({ item: note }: { item: NotesType }) => {
    const isFinish = note.status === "FINALIZADO";
    return (
      <Swipeable renderRightActions={() => renderRightActions(note.id)}>
        <Pressable
          onPress={() => handleChangeNote(note)}
          className="flex-row p-4 rounded-lg bg-slate-500 mb-4 gap-4"
        >
          <View
            className={clsx("border  rounded-lg h-7 w-7 items-center justify-center")}
          >
            {isFinish && <Entypo name="check" size={16} color="#2dd4bf" />}
          </View>

          <Text className={clsx("text-xl text-white", isFinish && "line-through")}>
            {note.name}
          </Text>
        </Pressable>
      </Swipeable>
    );
  }, []);

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <View className="flex-1 bg-gray-800 p-4 gap-8">
      <View className="mt-10">
        <Text className="text-3xl text-gray-100">Easy Notes</Text>
        <Text className="text-lg text-gray-400">Crie e gerencie suas tarefas</Text>
      </View>

      <View className="flex-row gap-2 items-center justify-center">
        <TextInput
          className="flex-1 px-2 bg-slate-500 border border-teal-400 h-12 rounded-lg text-zinc-200"
          placeholder="Descrição da nota"
          value={noteName}
          onChangeText={setNoteName}
          placeholderClassName="text-zinc-400"
        />
        <Pressable onPress={handleCreateNote}>
          <View className="h-12 w-14 rounded-lg items-center justify-center bg-teal-400">
            <Entypo name="plus" size={24} color="black" />
          </View>
        </Pressable>
      </View>

      <View className="flex-row gap-4">
        <Pressable
          onPress={() => setSelectedType("PENDENTE")}
          className={clsx(
            "flex-1 h-10 p-2 rounded-lg bg-slate-500 item-center justify-center",
            selectedType === "PENDENTE" && "bg-teal-400"
          )}
        >
          <Text className={clsx("text-black font-semibold text-center text-lg")}>
            Pendentes
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setSelectedType("FINALIZADO")}
          className={clsx(
            "flex-1 h-10 p-2 rounded-lg bg-slate-500 item-center justify-center",
            selectedType === "FINALIZADO" && "bg-teal-400"
          )}
        >
          <Text className={clsx("text-black font-semibold text-center text-lg")}>
            Finalizados
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={notesList.filter((i) => i.status === selectedType)}
        keyExtractor={(note) => String(note.id)}
        renderItem={renderNotes}
        ListEmptyComponent={() => (
          <View className="flex-1 px-12 items-center justify-center">
            <Text className="text-xl text-gray-400 text-center">
              Não foi encontrada nenhuma anotação{" "}
              {selectedType === "PENDENTE" ? "pendente" : "finalizada"}
              {`\n`}
              {`\n`}
              Começe agora mesmo a ter mais controle sobre seus a fazeres
            </Text>
          </View>
        )}
      />
    </View>
  );
}
