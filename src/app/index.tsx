import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pokedex</Text>
      <Text style={styles.subtitulo}>Sistema de Listagem de Pokemons</Text>

      <Pressable
        style={styles.botao}
        onPress={() => router.push("/consultar_pokemons")}
      >
        <Text style={styles.textoBotao}>Ver Pokemons</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  titulo: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 16,
    color: "#666",
    marginBottom: 40,
  },
  botao: {
    backgroundColor: "#7DC343",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    elevation: 4,
  },
  textoBotao: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});