import paho.mqtt.client as mqtt
import random, threading, json
from datetime import datetime
import sys
import math

# ====================================================
# MQTT Settings
MQTT_Broker = "192.168.23.51"
MQTT_Port = 1883
Keep_Alive_Interval = 45
MQTT_Topic = "cloud2020/trasownicy/sensor_data"

# ====================================================

def on_connect(client, userdata, rc):
    if rc != 0:
        pass
        print("Unable to connect to MQTT Broker...")
    else:
        print("Connected with MQTT Broker: " + str(MQTT_Broker))


def on_publish(client, userdata, mid):
    pass


def on_disconnect(client, userdata, rc):
    if rc != 0:
        pass


mqttc = mqtt.Client()
mqttc.on_connect = on_connect
mqttc.on_disconnect = on_disconnect
mqttc.on_publish = on_publish
mqttc.connect(MQTT_Broker, int(MQTT_Port), int(Keep_Alive_Interval))


def publish_To_Topic(topic, message):
    mqttc.publish(topic, message)
    print("Published: " + str(message) + " " + "on MQTT Topic: " + str(topic))
    print("")


# ====================================================
# FAKE SENSOR
# Dummy code used as Fake Sensor to publish some random values
# to MQTT Broker


def publish_Fake_Sensor_Values_to_MQTT():
    loc_radius = 50
    lat = 50.069408
    lng = 19.904793

    threading.Timer(3.0, publish_Fake_Sensor_Values_to_MQTT).start()
    humidity_val = float("{0:.2f}".format(random.uniform(50, 90)))
    temp_val = float("{0:.2f}".format(random.uniform(20, 60)))
    pollution_val = float("{0:.2f}".format(random.uniform(15, 65)))

    Weather_Data = {}
    Weather_Data['Sensor_ID'] = sys.argv[1]
    Weather_Data['Date'] = (datetime.today()).strftime("%d-%b-%Y %H:%M:%S:%f")
    Weather_Data['Humidity'] = humidity_val
    Weather_Data['Temperature'] = temp_val
    Weather_Data['Pollution'] = pollution_val
    json_data = json.dumps(Weather_Data)

    publish_To_Topic(MQTT_Topic, json_data)


publish_Fake_Sensor_Values_to_MQTT()

# ====================================================
