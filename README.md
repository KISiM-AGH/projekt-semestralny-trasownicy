# projekt-semestralny-trasownicy

There are two type machines (machine-a and machine-b) in two departments of factory KokoKola. Each one has FOG and control panel. 


To start machine-a:

python3 machine-a.py machine_ID

To start machine-b:

python3 machine-b.py machine_ID

Listener:

python3 listener.py factory_ID

topics:

/trasownicy/kokokola/bottles - bottle data

/trasownicy/kokokola/faults  - fault data

/trasownicy/kokokola/cp  - control panel commands to machines