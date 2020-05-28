const listener = Deno.listen({ port: 8080 });

console.log('listening on 8080');

for await( const conn of listener ){
    console.log(conn );
    Deno.copy(conn,conn);
}