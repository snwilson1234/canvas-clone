# Generated by Django 4.2.6 on 2023-10-09 02:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("home", "0005_alter_courses_course_term"),
    ]

    operations = [
        migrations.AlterField(
            model_name="courses",
            name="course_term",
            field=models.DecimalField(
                choices=[
                    (2224, "Spring 2022-23"),
                    (2227, "Summer 2022-23"),
                    (2237, "Summer 2023-24"),
                    (2221, "Fall 2022-23"),
                    (2231, "Fall 2023-24"),
                    (2234, "Spring 2023-24"),
                ],
                decimal_places=0,
                max_digits=4,
            ),
        ),
    ]
