const pty = require( 'node-pty' );
const fs  = require( 'fs' );
const touch = require( 'touch' );
const keypress = require( 'keypress' );

const filename = 'termrec.json';

touch.sync( filename );

var ptyProcess = pty.spawn( 'bash', [], {
  name: 'xterm-color',
  cols: 90,
  rows: 30,
  cwd: process.env.HOME,
  env: process.env
});

process.stdin.setRawMode( true );

process.stdin.resume();

process.stdin.setEncoding( 'utf8' );

keypress(process.stdin);

let start = Date.now();

let log = [];

function out( data ) {
	let time = Date.now() - start;

	log.push( {
		t: time,
		d: data
	} );
}

ptyProcess.on( 'data', (data) => {
	out( data );
	process.stdout.write( data );
});

process.stdin.on( 'keypress', (ch, key) => {
	if ( ch != null ) {
		ptyProcess.write( ch );
	}
	if (key && key.ctrl && key.name == 'c') {
		fs.appendFileSync( filename, JSON.stringify( log ) );
		process.exit();
	}
})

