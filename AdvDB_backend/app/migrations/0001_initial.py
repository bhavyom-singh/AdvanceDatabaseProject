# Generated by Django 3.2 on 2023-05-08 09:09

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='React',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('email', models.CharField(max_length=200)),
                ('createdAt', models.DateField(auto_now=True)),
                ('interestedIn', models.CharField(max_length=200)),
                ('gender', models.CharField(max_length=6)),
                ('age', models.IntegerField()),
            ],
        ),
    ]
