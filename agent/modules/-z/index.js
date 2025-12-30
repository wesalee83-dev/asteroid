export function mutate(state, mutationFn) {
  const mutated = mutationFn(state)

  return {
    ...mutated,
    module: '-z',
    note: 'Mutation performed by module -z'
  }
}
