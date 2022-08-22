from django.urls import path,include
from rest_framework.routers import DefaultRouter
from . import views
router = DefaultRouter()
# router.register(r'test/', views.Sacfile, basename='test')
# urlpatterns = router.urls

urlpatterns = [
    # path('', include(router.urls)),
    path('onlineWave/qsis/', views.Sacfile.as_view(), name='Sacfile'),
    path('onlineWave/palert/', views.PalertFile.as_view(), name='PalertFile'),
    path('stationInfo/', views.StationInfo.as_view(), name='StationInfo'),
    # path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]

 