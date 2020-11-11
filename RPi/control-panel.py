import paho.mqtt.client as mqtt
import threading
import json
import sys
import os

# ====================================================
# MQTT Settings
MQTT_Broker = "192.168.23.51"
MQTT_Port = 1883
Keep_Alive_Interval = 45
MQTT_Topic_send = sys.argv[1]
MQTT_Topic_A = sys.argv[2]
MQTT_Topic_B = sys.argv[3]
power = 0
bottles = 0
faults = 0
percentage = 0

# ====================================================


def on_connect(client, userdata, rc, properties=None):
    if rc != 0:
        pass
        print("Unable to connect to MQTT Broker...")
    else:
        print("Connected with MQTT Broker: " + str(MQTT_Broker))
    mqttc.subscribe(MQTT_Topic_A, 0)
    mqttc.subscribe(MQTT_Topic_B, 0)


def on_publish(client, userdata, mid):
    pass


def on_message(mosq, obj, msg):
    global power
    global bottles
    global faults
    global percentage

    print("MQTT Data Received...")
    print("MQTT Topic: " + msg.topic)
    print("Data: ", msg.payload)

    m_decode = str(msg.payload.decode("utf-8", "ignore"))
    m_in = json.loads(m_decode)

    if msg.topic == MQTT_Topic_A:
        bottles = int(m_in["Bottles"])
    elif msg.topic == MQTT_Topic_B:
        faults = int(m_in["Faults"])

    if bottles != 0:
        percentage = (faults / bottles) * 100
    else:
        percentage = 0

    os.system('cls' if os.name == 'nt' else 'clear')
    print("Bottles: ", bottles, ", Faults: ", faults, ", Percentage: ", percentage, "%", ", Power: ", power)
    if percentage > 20:
        print('\033[93m' + "DANGER!" + '\033[0m')
    print("Set power:")


def on_subscribe(mosq, obj, mid, granted_qos):
    print("subscribed")
    pass


def on_disconnect(client, userdata, rc):
    if rc != 0:
        pass


def get_input():
    pass


mqttc = mqtt.Client()
mqttc.on_message = on_message
mqttc.on_connect = on_connect
mqttc.on_disconnect = on_disconnect
mqttc.on_publish = on_publish
mqttc.on_subscribe = on_subscribe
mqttc.connect(MQTT_Broker, int(MQTT_Port), int(Keep_Alive_Interval))


def publish_To_Topic(topic, message):
    mqttc.publish(topic, message)
    print("Published: " + str(message) + " " + "on MQTT Topic: " + str(topic))
    print("")


def publish_New_Power_to_MQTT():
    global power
    global percentage
    while True:
        newPower = input("Set power:")
        json_data = json.dumps({'Power': newPower})
        publish_To_Topic(MQTT_Topic_send, json_data)
        power = newPower
        os.system('cls' if os.name == 'nt' else 'clear')
        print("Bottles: ", bottles, ", Faults: ", faults, ", Percentage: ", percentage, "%", ", Power: ", power)


# Continue the network loop
mqttc.loop_start()
publish_New_Power_to_MQTT()

