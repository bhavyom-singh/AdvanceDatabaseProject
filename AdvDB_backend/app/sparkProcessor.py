from pyspark.sql import SparkSession
from pyspark.sql.functions import *
from pyspark.sql.types import *

def saveToCassandra(dataframe, epoch_id):
        dataframe \
       .write \
       .format("org.apache.spark.sql.cassandra") \
       .mode("append") \
       .options(table="customer_tbl", keyspace="datalake") \
        .save()
        #DataLake

spark = SparkSession \
        .builder \
        .appName("Pyspark streaming with Kafka") \
        .master("local[*]") \
        .config("spark.cassandra.connection.host", "localhost") \
        .getOrCreate()

spark.sparkContext.setLogLevel("ERROR")

df = spark \
  .readStream \
  .format("kafka") \
  .option("kafka.bootstrap.servers", "localhost:9092") \
  .option("subscribe", "streamify") \
  .option("startingOffsets", "earliest") \
  .load()

customer_schema = StructType() \
        .add("name", StringType()) \
        .add("createdat", StringType()) \
        .add("interestedin", StringType()) \
        .add("gender", StringType()) \
        .add("age", IntegerType()) \
        .add("id", IntegerType()) 
custmer_df = df.selectExpr("CAST(value AS STRING)")
custmer_df = custmer_df \
        .select(from_json(col("value"), customer_schema).alias("Customer"))

custmer_df1 = custmer_df.select("Customer.*")

custmer_df1 \
        .writeStream \
       .trigger(processingTime='10 seconds') \
       .outputMode("update") \
       .foreachBatch(saveToCassandra) \
       .start()


query = custmer_df1.writeStream \
      .format("console") \
      .outputMode("update") \
      .start()
      

query.awaitTermination()