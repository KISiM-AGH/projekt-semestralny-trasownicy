# projekt-semestralny-trasownicy

There are two type machines (machine-a and machine-b) in two departments of factory KokoKola. Each one has FOG and control panel for machanic. 


To start machine-a:

python machine-a.py topic_send topic_listen sendor_ID

To start machine-b:

python machine-b.py topic_send topic_listen sendor_ID

topics:
/trasownicy/kokokola/

machineA -> database: bottles
machineB -> database: faults
control panel -> fog: cp
fog -> machines: cp-ab ?
