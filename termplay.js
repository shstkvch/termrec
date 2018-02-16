const fs = require( 'fs' );
const clear = require( 'clear' );

const filename = 'termrec.json';

// let filename = process.argv[2];

// if ( ! filename ) {
// 	console.log( 'Usage: node termplay.js [filename]' );
// 	process.exit();
// }

const file = fs.readFileSync( filename, 'utf8' );

clear();

let log = JSON.parse( file );

let end = false;
let i = 0;
let current;

let start_time = Date.now();


while ( i < log.length ) {
	let td = Date.now() - start_time;

	current = log[i];

	if ( td == current.t ) {
		process.stdout.write( current.d );
		i++;
	}
}