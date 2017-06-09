#!/usr/bin/env node
/*
 Copyright (c) 2017, Robby, Kansas State University
 All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
 2. Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

const argv           = process.argv.slice(2);
const execFile       = require('child_process').execFile;
const ws             = require('ws');
const defaultPort    = 8888;
const port           = argv.length == 1 ? argv[0] : defaultPort;
const execOptions    = { maxBuffer : 2 * 1024 * 1024 };

if (argv.help || argv.h || isNaN(port) || argv.length > 1) {
  console.log('Usage: z3wsd.js [<port> (default: ' + defaultPort + ')]');
  return;
}

const wss = new ws.Server({ host : 'localhost', port : port });

wss.on('connection', (c) => {
  c.on('message', (data) => {
    const o = JSON.parse(data);
    function send(status, output) {
      const r = { status : status, output : output };
      if (o.id) r.id = o.id;
      c.send(JSON.stringify(r));
    };
    if (o.input) {
      const args = o.args ? o.args : [];
      const proc = execFile("z3", args.concat(['-smt2', '-in']), execOptions, (error, stdout) => {
        send(!error, stdout);
      });
      proc.stdin.write(o.input + '\n(exit)\n');
    } else send(false, "");
  });
});

wss.on('error', (error) => {
  console.error('Could not start Z3 WebSocket Daemon (reason: ' + error.message + ')');
  process.exit(-1);
});

console.log('Z3 WebSocket Daemon (port ' + port + '); press any key to exit.');

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.on('data', process.exit.bind(process, 0));