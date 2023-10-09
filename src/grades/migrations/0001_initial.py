# Generated by Django 4.2.6 on 2023-10-08 01:19

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="StudentCourseGrade",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("course_title", models.CharField(max_length=60)),
                ("course_grade", models.DecimalField(decimal_places=2, max_digits=5)),
            ],
        ),
    ]