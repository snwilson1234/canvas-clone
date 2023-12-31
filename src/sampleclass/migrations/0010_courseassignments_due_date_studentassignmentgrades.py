# Generated by Django 4.2.6 on 2023-10-29 16:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("home", "0021_alter_courses_course_term_and_more"),
        ("sampleclass", "0009_alter_assignmentuploadfile_options"),
    ]

    operations = [
        migrations.AddField(
            model_name="courseassignments",
            name="due_date",
            field=models.DateField(null=True),
        ),
        migrations.CreateModel(
            name="StudentAssignmentGrades",
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
                ("username", models.CharField(max_length=60)),
                ("grade", models.DecimalField(decimal_places=2, max_digits=5)),
                ("submitted_ind", models.BooleanField(default=False)),
                ("on_time_ind", models.BooleanField(default=True)),
                ("graded_ind", models.BooleanField(default=False)),
                (
                    "assignment_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="sampleclass.courseassignments",
                    ),
                ),
                (
                    "course_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="home.courses"
                    ),
                ),
            ],
            options={
                "verbose_name": "Student Assignment Grade",
                "verbose_name_plural": "Student Assignment Grades",
            },
        ),
    ]
