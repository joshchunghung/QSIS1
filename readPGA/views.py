from rest_framework.views import APIView
from django.http import StreamingHttpResponse
from glob import glob 
def file2Stream(filepath, chunk_size = 512):
    with open(filepath, 'rb') as f:
        while True:
            con = f.read(chunk_size)
            if con:
                yield con
            else:
                break

class Sacfile(APIView):
    def post(self,request):
        sensor=request.data.get('sensor')
        date=request.data.get('date')
        time=request.data.get('time')
        chn=request.data.get('chn')
        folder=f"{date.replace('-','')}{time.replace(':','')}"
        print(chn)
        year=date.split('-')[0]
        
        file = glob(f"/Users/chunghung/{folder}/*/*{sensor}*{chn}*xy")
from rest_framework.views import APIView
from django.http import StreamingHttpResponse
import os
from glob import glob 
def file2Stream(filepath, chunk_size = 512):
    with open(filepath, 'rb') as f:
        while True:
            con = f.read(chunk_size)
            if con:
                yield con
            else:
                break

class Sacfile(APIView):
    def post(self,request):
        sensor=request.data.get('sensor')
        date=request.data.get('date')
        time=request.data.get('time')
        chn=request.data.get('chn')
        folder=f"{date.replace('-','')}{time.replace(':','')}"
        print(chn)
        year=date.split('-')[0]
        
        file = glob(f"/Users/chunghung/{folder}/*/*{sensor}*{chn}*xy")
        print(file)
        response = StreamingHttpResponse(file2Stream(file[0]),headers={'date':folder})
        return response