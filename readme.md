# Sireum WebSocket Daemon (WSD)

This repository hosts 64-bit Sireum WSD that provides
a Z3 server over WebSocket.

## Downloading

Download the appropriate distribution zip file for your operating system:

* **macOS**
 
  Download from: http://bit.ly/sv3wsdm
  
  Minisign: http://bit.ly/sv3wsdms

* **Linux** 

  Download from: http://bit.ly/sv3wsdl
  
  Minisign: http://bit.ly/sv3wsdls

* **Windows** 

  Download from: http://bit.ly/sv3wsdw

  Minisign: http://bit.ly/sv3wsdws)

The distributions that we provide are cryptographically-signed 
just in case you want to ensure that your copy is untampered
[read more](https://www.openbsd.org/papers/bsdcan-signify.html>).

The accompanying [Minisign](https://jedisct1.github.io/minisign/) 
digital signature can be verified using the following command:

```bash
minisign -P RWSJrtRxSDlkZHXVldw0WXJvSfzaEsW9R6vxq0sVKDtbmgzQSb4uOwnu -Vm <file>
```

Alternatively, you can use the following
[signify](https://github.com/search?q=signify+OpenBSD)
command:

```bash
signify -p sireum-v3-key.pub -x <file>.minisig -Vm <file>
```

where ``sireum-v3-key.pub`` can be downloaded from: http://bit.ly/sv3key

## Running

Unzip the distribution file, and run
``run.sh`` (or ``run.bat`` in Windows)
under the newly created directory ``sireum-v3-wsd``.

It should display:

```
Z3 WebSocket Daemon (port 8888); press any key to exit.
```

You can supply a different port number when calling ``run.sh``/``run.bat``.