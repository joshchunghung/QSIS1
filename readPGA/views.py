from rest_framework.views import APIView
from rest_framework.response import Response
import os

class Sacfile(APIView):
    def get(self,request):
        print(request)
        log_content=[]
        file = os.path.join('/Users/chunghung/django/data','A002.10.HLZ.n1xy')
        log_content += [line for line in open(file, 'r', encoding='UTF-8')]
        response = Response(log_content)
        return response