import paho.mqtt.client as mqtt
from .sender import Data_Handler
import sys

Factory_ID = sys.argv[1]

# MQTT Settings
MQTT_Broker = "192.168.23.51"
MQTT_Port = 1883
Keep_Alive_Interval = 45
MQTT_Topic_A = '/trasownicy/kokokola/bottles'  # sys.argv[1]
MQTT_Topic_B = '/trasownicy/kokokola/faults'  # sys.argv[2]


# Subscribe to all Sensors at Base Topic
def on_connect(mosq, obj, rc, properties=None):
    mqttc.subscribe(MQTT_Topic_A, 0)
    mqttc.subscribe(MQTT_Topic_B, 0)


# Save Data into DB Table
def on_message(mosq, obj, msg):
    # This is the Master Call for saving MQTT Data into DB
    # For details of "sensor_Data_Handler" function please refer "sensor_data_to_db.py"
    print("MQTT Data Received...")
    print("MQTT Topic: " + msg.topic)
    print("Data: ", msg.payload)
    Data_Handler(msg.topic, msg.payload, Factory_ID)


def on_subscribe(mosq, obj, mid, granted_qos):
    print("subscribed")
    pass


mqttc = mqtt.Client()

# Assign event callbacks
mqttc.on_message = on_message
mqttc.on_connect = on_connect
mqttc.on_subscribe = on_subscribe

# Connect
mqttc.connect(MQTT_Broker, int(MQTT_Port), int(Keep_Alive_Interval))

# Continue the network loop
mqttc.loop_forever()
