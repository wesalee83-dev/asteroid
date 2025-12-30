import { parse } from '../index.js';

function test(input) {
  const result = parse(input);
  console.log(`INPUT: "${input}"`);
  console.log(result);
  console.log('------------------------');
}

test("run cleanup");
test("I need to get this working");
test("I feel overwhelmed");
test("   ");
test("what even is this");
