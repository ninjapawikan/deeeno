const encoder = new TextEncoder();


const greetText = encoder.encode("Hello world\n My name is Ian");


await Deno.writeFile("greet.txt", greetText);