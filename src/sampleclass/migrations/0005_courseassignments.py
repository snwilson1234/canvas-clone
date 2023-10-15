# Generated by Django 4.2.6 on 2023-10-15 05:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("home", "0011_alter_courses_course_term_and_more"),
        ("sampleclass", "0004_modulesections_clickable_ind"),
    ]

    operations = [
        migrations.CreateModel(
            name="CourseAssignments",
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
                ("assignment_name", models.CharField(max_length=60)),
                ("order_sequence", models.DecimalField(decimal_places=0, max_digits=3)),
                ("active_ind", models.BooleanField(default=True)),
                (
                    "course_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="home.courses"
                    ),
                ),
            ],
            options={
                "verbose_name": "Course Assignment",
                "verbose_name_plural": "Course Assignment",
            },
        ),
    ]
