# projekt-semestralny-trasownicy

There are two type machines (machine-a and machine-b) in two departments of factory KokoKola. Each one has FOG and control panel for machanic. 


To start machine-a:

python3 machine-a.py topic_send topic_listen machine_ID mu_multiplier sigma

mu_multiplier, sigma are used to simulate sensor output. Tested for mu_m 1 and sigma 0.7; 

To start machine-b:

python3 machine-b.py topic_send topic_listen machine_ID

Listener:

python3 listener.py topic_a topic_b

topic_a and topic_b are for listening to machine-a and machine-b outputs

topics:

/trasownicy/kokokola/bottles - machine a to database and control panel (machineA: send, cp: listen, listener: listen)

/trasownicy/kokokola/faults  - machine b to database and control panel (machineB: send, cp: listen, listener: listen)

/trasownicy/kokokola/cp  - control panel commands to machines (machineA: listen, machineB: listen, cp: send)