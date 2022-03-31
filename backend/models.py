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
    id = models.CharField(db_column='ID', max_length=4, blank=True,primary_key=True)  # Field name made lowercase.
    name = models.CharField(db_column='Name', max_length=13, blank=True, null=True)  # Field name made lowercase.
    abbreviation = models.CharField(max_length=4, blank=True, null=True)
    latitude = models.DecimalField(max_digits=10, decimal_places=8, blank=True, null=True)
    longitude = models.DecimalField(max_digits=11, decimal_places=8, blank=True, null=True)
    elevation = models.CharField(max_length=10, blank=True, null=True)
    public_ip = models.CharField(db_column='public_IP', max_length=10, blank=True, null=True)  # Field name made lowercase.
    address = models.CharField(max_length=16, blank=True, null=True)
    material = models.CharField(db_column='Material', max_length=10, blank=True, null=True)  # Field name made lowercase.
    geology = models.CharField(max_length=10, blank=True, null=True)
    basement = models.IntegerField(blank=True, null=True)
    floor_above_ground = models.IntegerField(blank=True, null=True)
    total_height = models.CharField(max_length=10, blank=True, null=True)
    outlook = models.CharField(max_length=10, blank=True, null=True)
    section_view = models.CharField(max_length=10, blank=True, null=True)
    building_date = models.CharField(max_length=10, blank=True, null=True)
    substantial_completion_date = models.CharField(max_length=10, blank=True, null=True)
    activation_date = models.CharField(max_length=10, blank=True, null=True)
    contact_person = models.CharField(max_length=10, blank=True, null=True)
    remark = models.CharField(max_length=10, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'qsis_db_building'


class QsisDbFloor(models.Model):
    id = models.CharField(db_column='ID', max_length=4, blank=True, primary_key=True)  # Field name made lowercase.
    building_id = models.CharField(db_column='building_ID', max_length=4, blank=True, null=True)  # Field name made lowercase.
    sub_building = models.CharField(max_length=1, blank=True, null=True)
    floor = models.IntegerField(blank=True, null=True)
    height = models.CharField(max_length=10, blank=True, null=True)
    map_view = models.CharField(max_length=10, blank=True, null=True)
    remark = models.CharField(max_length=10, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'qsis_db_floor'


class QsisDbInstrumentPool(models.Model):
    id = models.CharField(db_column='ID', max_length=4, blank=True, primary_key=True)  # Field name made lowercase.
    s_n = models.IntegerField(db_column='S_N', blank=True, null=True)  # Field name made lowercase.
    inst_code = models.CharField(max_length=5, blank=True, null=True)
    sensor = models.CharField(max_length=21, blank=True, null=True)
    sensor_model = models.CharField(max_length=7, blank=True, null=True)
    datalogger = models.CharField(max_length=15, blank=True, null=True)
    mac_address = models.CharField(db_column='MAC_address', max_length=17, blank=True, null=True)  # Field name made lowercase.
    constant = models.CharField(max_length=10, blank=True, null=True)
    type = models.CharField(max_length=10, blank=True, null=True)
    remark = models.CharField(max_length=10, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'qsis_db_instrument_pool'


class QsisDbStation(models.Model):
    id = models.CharField(db_column='ID', max_length=4, blank=True,primary_key=True)  # Field name made lowercase.
    floor_id = models.CharField(db_column='floor_ID', max_length=4, blank=True, null=True)  # Field name made lowercase.
    location = models.CharField(max_length=3, blank=True, null=True)
    installation = models.CharField(max_length=5, blank=True, null=True)
    internet_connect = models.CharField(max_length=5, blank=True, null=True)
    ip = models.CharField(max_length=16, blank=True, null=True)
    remark = models.CharField(max_length=18, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'qsis_db_station'


class QsisDbStationInstrument(models.Model):
    id = models.CharField(db_column='ID', max_length=4, blank=True, primary_key=True)  # Field name made lowercase.
    sta_id = models.CharField(db_column='sta_ID', max_length=4, blank=True, null=True)  # Field name made lowercase.
    instrument_id = models.CharField(db_column='instrument_ID', max_length=4, blank=True, null=True)  # Field name made lowercase.
    on_date_utc = models.CharField(db_column='on_date_UTC', max_length=19, blank=True, null=True)  # Field name made lowercase.
    off_date_utc = models.CharField(db_column='off_date_UTC', max_length=4, blank=True, null=True)  # Field name made lowercase.
    azimuth = models.CharField(max_length=10, blank=True, null=True)
    remark = models.CharField(max_length=10, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'qsis_db_station_instrument'
