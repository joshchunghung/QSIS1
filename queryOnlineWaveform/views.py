from rest_framework.views import APIView
from glob import glob 
from rest_framework.response import Response

class Sacfile(APIView):
    def post(self,request):
        sensor=request.data.get('sensor')
        date=request.data.get('date')
        time=request.data.get('time')
        folder=f"{date.replace('-','')}{time.replace(':','')}"  
        year=request.data.get('date').split('-')[0]
        file=glob(f'/data/{year}/{folder}/*/*{sensor}*.csv')
        #file=glob(f'/data/*/*{sensor}*.csv')
        f=open(file[0], 'r', encoding='UTF-8')
        log_content={}
        times=[]
        ampXs=[]
        ampYs=[]
        ampZs=[]
        for line in f.readlines():
            try:
                if (line[0] == '#'):
                    if 'starttime' in line.lower() :
                        #starttime 2022-04-23T17:52:25.759
                        log_content['starttime']=line.split(' ')[1][:-5]
                    if 'pga' in line.lower() :
                        dataArray=line.split(' ')
                        pgaType=dataArray[0].split('#')[1].split(':')[0]
                        pgaValue=float(dataArray[1])
                        log_content[pgaType]=pgaValue
                else:
                    [time,ampX,ampY,ampZ]=line.split("\n")[0].split(",")
                    times.append(float(time))
                    ampXs.append(float(ampX))
                    ampYs.append(float(ampY))
                    ampZs.append(float(ampZ))
            except:
                continue
        
        log_content['time']=times
        log_content['ampX']=ampXs
        log_content['ampY']=ampYs
        log_content['ampZ']=ampZs
        return Response(log_content)

class PalertFile(APIView):
    def post(self,request):
        sensor=request.data.get('sensor')
        date=request.data.get('date')
        time=request.data.get('time')
        folder=f"{date.replace('-','')}{time.replace(':','')}"
        year=date.split('-')[0]
        file=glob(f'/data/{year}/{folder}/*/*{sensor}*.csv')
        #file=glob(f'/data/*/*{sensor}*.csv')
        f=open(file[0], 'r', encoding='UTF-8')
        log_content={}
        times=[]
        ampXs=[]
        ampYs=[]
        ampZs=[]
        for line in f.readlines():
            try:
                if (line[0] == '#'):
                    if 'starttime' in line.lower() :
                        #starttime 2022-04-23T17:52:25.759
                        #StartTime:2022/03/23 01:42:02.870
                        log_content['starttime']=line.split('e:')[1].strip()
                    if 'pga' in line.lower() :
                        dataArray=line.split(' ')
                        pgaType=dataArray[0].split('#')[1].split(':')[0]
                        pgaValue=float(dataArray[1])
                        log_content[pgaType]=pgaValue
                else:
                    [time,ampX,ampY,ampZ,*tmp]=line.split(",")
                    times.append(float(time))
                    ampXs.append(float(ampX))
                    ampYs.append(float(ampY))
                    ampZs.append(float(ampZ))
            except:
                continue

        log_content['time']=times
        log_content['ampX']=ampXs
        log_content['ampY']=ampYs
        log_content['ampZ']=ampZs
        return Response(log_content)
