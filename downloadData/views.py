from django.http import FileResponse
from glob import glob
from rest_framework.views import APIView

class Download(APIView):
    def post(self,request):
        sensor=request.data.get('sensor')
        date=request.data.get('date')
        time=request.data.get('time')
        chn=request.data.get('chn')
        folder=f"{date.replace('-','')}{time.replace(':','')}"
        fpath = glob(f"/Users/chunghung/{folder}/*/*{sensor}*{chn}*xy")
        file=open(f"{fpath[0]}",'rb')
        response =FileResponse(file)
        response['Content-Type']='application/octet-stream'
        response['Content-Disposition']='attachment;filename=f"{folder}.test"'
        return response