# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Building(models.Model):
    id = models.AutoField(db_column="buildingID",primary_key=True,auto_created=True, editable=False)  # Field name made lowercase.
    #id = models.UUIDField(primary_key=True, default=uuid4(), auto_created=True, editable=False)
    name = models.CharField(max_length=255, blank=True, null=True)  # Field name made lowercase.
    abbreviation = models.CharField(max_length=10, blank=True, null=True)
    latitude = models.DecimalField(max_digits=10, decimal_places=8, blank=True, null=True)
    longitude = models.DecimalField(max_digits=11, decimal_places=8, blank=True, null=True)
    public_ip = models.CharField(max_length=16, blank=True, null=True)  # Field name made lowercase.
    address = models.CharField(max_length=255, blank=True, null=True)
    basement = models.IntegerField(blank=True, null=True)
    floor = models.IntegerField(db_column="floor",blank=True, null=True)
    contact_Person = models.CharField(max_length=10, blank=True, null=True)
    isOpen=models.BooleanField(blank=True, null=True)
    isArray=models.BooleanField(blank=True, null=True)
    remark = models.CharField(max_length=255, blank=True, null=True)
    
    def __str__(self):
        return self.abbreviation
    
    class Meta:
        managed = True #對現有的表進行操作，而不會自動根據模型類生成對映的資料庫表
        db_table = 'building'

    
class Station(models.Model):
    id = models.AutoField(db_column="stationID",primary_key=True,auto_created=True, editable=False)
    SN= models.IntegerField(blank=False)
    code=models.CharField(max_length=5, blank=True, null=True)
    #buildingID=models.CharField(max_length=10, blank=False, null=True)
    building=models.ForeignKey('Building',related_name='station', on_delete=models.CASCADE,null=True)
    floor=models.IntegerField(blank=True,null=True)
    installation=models.CharField(
        max_length=1,
        choices=[('w','wall'),('c','ceiling'),('f','floor')],
        default='f',
    )
    location=models.CharField(max_length=3,blank=True,null=True)
    ip=models.CharField(max_length=15,blank=True,null=True)
    rx = models.DecimalField(max_digits=4, decimal_places=1, blank=True, null=True)
    ry = models.DecimalField(max_digits=4, decimal_places=1, blank=True, null=True)
    starttime=models.DateTimeField(blank=True, null=True)
    endtime=models.DateTimeField(blank=True, null=True)
    isOpen=models.BooleanField(blank=True, null=True)
    remark = models.CharField(max_length=255, blank=True, null=True)
    
    def __str__(self):
        return self.code
    
    class Meta:
        managed = True
        db_table = 'station'
        
class Event(models.Model):
    id = models.AutoField(db_column="eventID",primary_key=True,auto_created=True, editable=False)
    date=models.DateField(blank=True, null=True)
    time = models.TimeField(blank=True, null=True)
    latitude = models.DecimalField(max_digits=4, decimal_places=2, blank=True, null=True)
    longitude = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    depth=models.DecimalField(max_digits=5, decimal_places=1, blank=True, null=True)
    ML=models.DecimalField(max_digits=3, decimal_places=1, blank=True, null=True)
    isOpen=models.BooleanField(blank=True, null=True)
    def __str__(self):
        return str(self.id)
    
    class Meta:
        managed = True
        db_table = 'event'

class PGA(models.Model):
    id = models.AutoField(db_column="id",primary_key=True,auto_created=True, editable=False)
    event=models.ForeignKey('Event', related_name='pga', on_delete=models.CASCADE,null=True)
    station=models.ForeignKey('Station', on_delete=models.CASCADE,null=True)
    pgaz=models.DecimalField(max_digits=7, decimal_places=3, blank=True, null=True)
    pgax=models.DecimalField(max_digits=7, decimal_places=3, blank=True, null=True)
    pgay =models.DecimalField(max_digits=7, decimal_places=3, blank=True, null=True)
    pga3comp=models.DecimalField(max_digits=7, decimal_places=3, blank=True, null=True)
    pgaHorizontal=models.DecimalField(max_digits=7, decimal_places=3, blank=True, null=True)
    
    class Meta:
        managed = True
        db_table = 'event_station_PGA'