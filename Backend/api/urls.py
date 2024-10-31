from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TemperatureHumidityDataViewSet , SolarRadiationDataViewSet , RainDataViewSet


router = DefaultRouter()
router.register(r'TemperatureHumidityData', TemperatureHumidityDataViewSet) 
router.register(r'solar-radiation', SolarRadiationDataViewSet)
router.register(r'water-rain', RainDataViewSet)
urlpatterns = router.urls
