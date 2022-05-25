from django.urls import path,include
# from .views import Sacfile
# urlpatterns = [
#     path("",views.index,name='index'),
# ]

# urlpatterns = [
#     # path('', Sacfile.as_view(), name='Sacfile')
#     path('api/', include('rest_framework.urls', namespace='rest_framework'))
# ]

from rest_framework.routers import DefaultRouter
from . import views
router = DefaultRouter()
# router.register(r'test/', views.Sacfile, basename='test')
# urlpatterns = router.urls

urlpatterns = [
    path('', include(router.urls)),
    path('onlineWave/', views.PalertFile.as_view(), name='PalertFile')
    # path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
