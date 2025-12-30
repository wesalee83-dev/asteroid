// modules/-y/index.js
// A simple example mutation module for Asteroid

export function mutate(state, mutationFn) {
  // Apply the core mutation logic provided by run.js
  const mutated = mutationFn(state)

  return {
    ...mutated,
    module: '-y',
    note: 'Mutation performed by module -y'
  }
}
