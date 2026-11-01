import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, View, } from "react-native";
import Pokedex from "pokedex-promise-v2";

const P = new Pokedex();

export default function ConsultarPokemons() {
  const router = useRouter();
  const [lista, setLista] = useState<Pokemon[]>([]);
  const [carregando, setCarregando] = useState(false);

  async function carregarPokemons() {
    try {
      setCarregando(true);
      setLista([]);

      const listaBasica = await P.getPokemonsList({ limit: 40, offset: 0 });

      const promessas = listaBasica.results.map(async (item) => {
        const detalhes = await P.getPokemonByName(item.name);

        return {
          id: detalhes.id,
          name: detalhes.name,
          types: detalhes.types.map((t) => t.type.name),
          image: detalhes.sprites.front_default ?? "",
        } as Pokemon;
      });

      const pokemons = await Promise.all(promessas);
      setLista(pokemons);
    } catch (erro) {
      console.error("Erro ao carregar pokemons:", erro);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={styles.container}>

      <View style={styles.cabecalho}>
        <Pressable onPress={() => router.back()} style={styles.botaoVoltar}>
          <Text style={styles.textoVoltar}>Voltar</Text>
        </Pressable>
        <Text style={styles.titulo}>Lista de Pokemons</Text>
      </View>

      <Pressable style={styles.botao} onPress={carregarPokemons}>
        <Text style={styles.textoBotao}>
          {carregando ? "Carregando..." : "Carregar Pokemons"}
        </Text>
      </Pressable>

      {carregando && (
        <ActivityIndicator size="large" color="#7DC343" style={{ marginVertical: 20 }} />
      )}

      <FlatList
        data={lista}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.image }}
              style={styles.imagem}
              resizeMode="contain"
            />

            <View style={styles.info}>
              <Text style={styles.nome}>
                #{item.id.toString().padStart(3, "0")}{" "}
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </Text>

              <View style={styles.tipos}>
                {item.types.map((tipo) => (
                  <View
                    key={tipo}
                    style={[
                      styles.badgeTipo,
                      { backgroundColor: coresTipo[tipo] || "#777" },
                    ]}
                  >
                    <Text style={styles.textoTipo}>{tipo.toUpperCase()}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingTop: 50,
  },
  cabecalho: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 15,
  },
  botaoVoltar: {
    marginRight: 15,
  },
  textoVoltar: {
    fontSize: 16,
    color: "#7DC343",
    fontWeight: "600",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  botao: {
    backgroundColor: "#7DC343",
    marginHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    elevation: 3,
    marginBottom: 10,
  },
  textoBotao: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 14,
    padding: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: "center",
  },
  imagem: {
    width: 85,
    height: 85,
  },
  info: {
    flex: 1,
    marginLeft: 14,
  },
  nome: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    textTransform: "capitalize",
  },
  tipos: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  badgeTipo: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  textoTipo: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});