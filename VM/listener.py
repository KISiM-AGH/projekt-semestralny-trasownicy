import paho.mqtt.client as mqtt
import sys
from VM.sender import Data_Handler

# MQTT Settings
MQTT_Broker = "192.168.23.51"
MQTT_Port = 1883
Keep_Alive_Interval = 45
MQTT_Topic_A = sys.argv[1]
MQTT_Topic_B = sys.argv[2]
MQTT_Topic_CP = sys.argv[3]
MQTT_Topic_A2 = sys.argv[4]


# Subscribe to all Sensors at Base Topic
def on_connect(mosq, obj, rc, properties=None):
    mqttc.subscribe(MQTT_Topic_A, 0)
    mqttc.subscribe(MQTT_Topic_B, 0)
    mqttc.subscribe(MQTT_Topic_CP, 0)
    mqttc.subscribe(MQTT_Topic_A2, 0)


def publish_To_Topic(topic, message):
    mqttc.publish(topic, message)
    print("Published: " + str(message) + " " + "on MQTT Topic: " + str(topic))
    print("")


# Save Data into DB Table
def on_message(mosq, obj, msg):
    # This is the Master Call for saving MQTT Data into DB
    # For details of "sensor_Data_Handler" function please refer "sensor_data_to_db.py"
    print("MQTT Data Received...")
    print("MQTT Topic: " + msg.topic)
    print("Data: ", msg.payload)

    if msg.topic == MQTT_Topic_CP:
        msg = int(msg.payload)
        if 0 <= msg <= 100:
            publish_To_Topic(MQTT_Topic_A2, msg)
    elif (msg.topic == MQTT_Topic_A) or (msg.topic == MQTT_Topic_B):
        Data_Handler(msg.topic, msg.payload)


def on_subscribe(mosq, obj, mid, granted_qos):
    print("subscribed")
    pass


def on_publish(client, userdata, mid):
    pass


def on_disconnect(client, userdata, rc):
    if rc != 0:
        pass


mqttc = mqtt.Client()

# Assign event callbacks
mqttc.on_message = on_message
mqttc.on_connect = on_connect
mqttc.on_subscribe = on_subscribe
mqttc = mqtt.Client()
mqttc.on_disconnect = on_disconnect
mqttc.on_publish = on_publish
# Connect
mqttc.connect(MQTT_Broker, int(MQTT_Port), int(Keep_Alive_Interval))

# Continue the network loop
mqttc.loop_forever()
