export function firstMutation(state) {
  return {
    ...state,
    persona: "Opportuna-Scuttle",
    mutations: state.mutations + 1,
    last_mutation: new Date().toISOString()
  };
}
