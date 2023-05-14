from django.shortcuts import render
from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from . serializer import *
import json
import app.kafkaProducer as kafkaProducer
# Create your views here.

class ReactView(APIView):

    serializer_class = ReactSerializer
    queryset = React.objects.all()

    def get(self, request):
        result = [{"name":output.name, "createdat":output.createdat, "interestedin":output.interestedin, "age":output.age, "email":output.email, "gender":output.gender}
                  for output in React.objects.all()]
        return Response(result)
    
    def post(self, request):
        serializer = ReactSerializer(data=request.data)
        id_array = [output.id for output in React.objects.all()]
        if serializer.is_valid(raise_exception=True):
            serializer.validated_data['id'] = max(id_array) + 1
            print(serializer.validated_data)
            serializer.save()
            print('\nafter save : \n')
            serializer.data['id'] = max(id_array) + 1
            serializer.validated_data['createdat'] = serializer.data['createdat']
            print(serializer.data)
            kafkaProducer.produceData(serializer.validated_data)
            return Response(serializer.validated_data)