import paho.mqtt.client as mqtt
import random, threading, json
from datetime import datetime
import sys

# ====================================================
# MQTT Settings
MQTT_Broker = "192.168.23.51"
MQTT_Port = 1883
Keep_Alive_Interval = 45
MQTT_Topic_send = sys.argv[1]
MQTT_Topic_listen = sys.argv[2]
power = 0
bottles = 0
# ====================================================


def on_connect(client, userdata, rc):
    if rc != 0:
        pass
        print("Unable to connect to MQTT Broker...")
    else:
        print("Connected with MQTT Broker: " + str(MQTT_Broker))
    mqttc.subscribe(MQTT_Topic_listen, 0)


def on_publish(client, userdata, mid):
    pass


def on_message(mosq, obj, msg):
    global power

    print("MQTT Data Received...")
    print("MQTT Topic: " + msg.topic)
    print("Data: ", msg.payload)

    msg = int(msg.payload)
    if msg >= 0 & msg <= 100:
        power = msg


def on_subscribe(mosq, obj, mid, granted_qos):
    print("subscribed")
    pass


def on_disconnect(client, userdata, rc):
    if rc != 0:
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


# ====================================================
# FAKE SENSOR
# Dummy code used as Fake Sensor to publish some random values
# to MQTT Broker

def simulate_machine_a():
    global power
    global bottles
    mu_multiplier = sys.argv[4]
    sigma = sys.argv[5]

    if power == 0:
        bottles = 0
    else:
        mu = power*mu_multiplier
        bottles = round(random.gauss(mu, sigma))
        if bottles <= 0:
            bottles = 0


def publish_Fake_Sensor_Values_to_MQTT():

    threading.Timer(10.0, publish_Fake_Sensor_Values_to_MQTT).start()
    simulate_machine_a()
    bottles_data = {'Machine_ID': sys.argv[3],
                    'Date': (datetime.today()).strftime("%d-%b-%Y %H:%M:%S:%f"),
                    'Bottles': bottles}
    json_data = json.dumps(bottles_data)
    publish_To_Topic(MQTT_Topic_send, json_data)


publish_Fake_Sensor_Values_to_MQTT()

# Continue the network loop
mqttc.loop_forever()

