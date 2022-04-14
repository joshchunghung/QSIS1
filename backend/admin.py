from django.contrib import admin
# Register your models here.
from .models import  Building, Station

admin.site.site_header = 'Quake Structural Integrity System Backend'
admin.site.index_title = 'QSIS'


@admin.register(Building)
class BuildingAdmin(admin.ModelAdmin):
    list_display =[f.name for f in Building._meta.fields]
    
@admin.register(Station)
class StationAdmin(admin.ModelAdmin):
    list_display =[f.name for f in Station._meta.fields]