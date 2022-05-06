from rest_framework.views import APIView
from django.http import StreamingHttpResponse
import os
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
        file = os.path.join('/Users/chunghung/django/data','A002.10.HLZ.n1xy')
        response = StreamingHttpResponse(file2Stream(file))
        return response