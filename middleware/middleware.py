from django.http import HttpResponseForbidden,Http404
class FilterHostMiddleware(object):
    def __init__(self, process_request):
        self.process_request = process_request
        
    def __call__(self, request):
        host = request.META.get('REMOTE_ADDR')
        print(host,"a")
        host = request.META.get('HTTP_HOST')
        print(host,"b")
        response = self.process_request(request)
        print(response,"v")
        return response
    
    def process_request(self, request):
        # allowed_hosts = ['127.0.0.1', 'localhost']
        allowed_hosts =[]
        host = request.META.get('HTTP_HOST')
        logger.warning(host,"aaaa")
        if host[:10] == '140.109.80':
            allowed_hosts.append(host)
        # elif host[:10] == '140.109.81': 
        #     allowed_hosts.append(host)
        # elif host[:10] == '140.109.82': 
        #     allowed_hosts.append(host)

        if host not in allowed_hosts:
            raise Http404

        return None
