# Generated by Django 4.2.6 on 2023-11-15 03:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("home", "0026_studentcourses_course_nickname_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="CalendarEvent",
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
                ("title", models.CharField(max_length=100)),
                ("date", models.DateField()),
                ("from_time", models.TimeField()),
                ("to_time", models.TimeField()),
                (
                    "frequency",
                    models.CharField(default="Does not repeat", max_length=60),
                ),
                ("location", models.CharField(default="Online", max_length=60)),
            ],
            options={
                "verbose_name": "Calendar Event",
                "verbose_name_plural": "Calendar Event",
            },
        ),
        migrations.AlterField(
            model_name="courses",
            name="course_term",
            field=models.DecimalField(
                choices=[
                    (2237, "Summer 2023-24"),
                    (2231, "Fall 2023-24"),
                    (2224, "Spring 2022-23"),
                    (2227, "Summer 2022-23"),
                    (2221, "Fall 2022-23"),
                    (2234, "Spring 2023-24"),
                ],
                decimal_places=0,
                default=1,
                max_digits=4,
                null=True,
            ),
        ),
        migrations.AlterField(
            model_name="coursesections",
            name="course_term",
            field=models.DecimalField(
                choices=[
                    (2237, "Summer 2023-24"),
                    (2231, "Fall 2023-24"),
                    (2224, "Spring 2022-23"),
                    (2227, "Summer 2022-23"),
                    (2221, "Fall 2022-23"),
                    (2234, "Spring 2023-24"),
                ],
                decimal_places=0,
                default=1,
                max_digits=4,
                null=True,
            ),
        ),
    ]
