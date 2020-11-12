import json
import pymongo
import urllib.parse
import sys

MQTT_Topic_A = sys.argv[1]
MQTT_Topic_B = sys.argv[2]

# ===============================================================
# Database Manager Class
username = urllib.parse.quote_plus('admin')
password = urllib.parse.quote_plus('trasownicy69')
client = pymongo.MongoClient(
    "mongodb+srv://%s:%s@cluster1.vmliw.mongodb.net/Cloud-beta-01?retryWrites=true&w=majority" % (username, password))
db = client.kokokola.fabryka1  # change for different factory

serverStatusResult = db.command("serverStatus")
print(serverStatusResult)

i = 0
j = 0
DataPackageA = []
DataPackageB = []

# ===============================================================
# Functions to push Sensor Data into Database

# Function to save Temperature to DB Table
def Data_Handler(topic, jsonData):
    # Parse Data
    json_Dict = json.loads(jsonData)
    MachineID = json_Dict['Machine_ID']
    Power = json_Dict['Power']
    Date_and_Time = json_Dict['Date']
    global DataPackageA, DataPackageB, i, j
    if topic == MQTT_Topic_A:
        Bottles = json_Dict['Bottles']
        singleData = {
            'MachineID': MachineID,
            'Power': Power,
            'Date_and_Time': Date_and_Time,
            'Bottles': Bottles,
        }
        DataPackageA += [pymongo.InsertOne(singleData)]
        if i >= 9:
            db.bottles.bulk_write(DataPackageA)
            i = 0
            DataPackageA = []
            print("Inserted bottle data into database.")
            print("")
        else:
            i = i + 1
            print("Gathering bottle data")
            print("")
    else:
        Faults = json_Dict['Faults']
        singleData = {
            'MachineID': MachineID,
            'Power': Power,
            'Date_and_Time': Date_and_Time,
            'Faults': Faults,
        }
        DataPackageB += [pymongo.InsertOne(singleData)]
        if j >= 9:
            db.faults.bulk_write(DataPackageB)
            j = 0
            DataPackageB = []
            print("Inserted faults data into database.")
            print("")
        else:
            j = j + 1
            print("Gathering faults data")
            print("")