from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TemperatureHumidityDataViewSet , SolarRadiationDataViewSet


router = DefaultRouter()
router.register(r'TemperatureHumidityData', TemperatureHumidityDataViewSet) 
router.register(r'solar-radiation', SolarRadiationDataViewSet)
urlpatterns = router.urls
