from kafka import KafkaProducer
from json import dumps

KAFKA_TOPIC_NAME_CONS = "streamify"
KAFKA_BOOTSTRAP_SERVERS_CONS = 'localhost:9092'

def produceData(text):
    print("Kafka Producer Application Started.....")
    kafka_producer_obj = KafkaProducer(bootstrap_servers=KAFKA_BOOTSTRAP_SERVERS_CONS,
                                      value_serializer=lambda x: dumps(x).encode('utf-8'))

    # while True:
    #     ip = input("enter intput")
    #     print("you wrote : {}".format(ip))
    kafka_producer_obj.send(KAFKA_TOPIC_NAME_CONS, text)