# Generated by Django 4.2 on 2023-08-31 16:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("portal", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="community_partner",
            name="id",
        ),
        migrations.RemoveField(
            model_name="student",
            name="id",
        ),
        migrations.AddField(
            model_name="community_partner",
            name="partner_id",
            field=models.IntegerField(
                default=0, primary_key=True, serialize=False, unique=True
            ),
        ),
        migrations.AlterField(
            model_name="job_opportunity",
            name="community_partner_id",
            field=models.ForeignKey(
                default=0,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="+",
                to="portal.community_partner",
            ),
        ),
        migrations.AlterField(
            model_name="opportunity_to_student",
            name="opportunity_id",
            field=models.ForeignKey(
                default=0,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="+",
                to="portal.job_opportunity",
            ),
        ),
        migrations.AlterField(
            model_name="opportunity_to_student",
            name="student_id",
            field=models.ForeignKey(
                default=0,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="+",
                to="portal.student",
            ),
        ),
        migrations.AlterField(
            model_name="student",
            name="student_id",
            field=models.IntegerField(
                default=0, primary_key=True, serialize=False, unique=True
            ),
        ),
        migrations.AddConstraint(
            model_name="community_partner",
            constraint=models.UniqueConstraint(
                fields=("partner_id",), name="unique_partner_id"
            ),
        ),
        migrations.AddConstraint(
            model_name="opportunity_to_student",
            constraint=models.UniqueConstraint(
                fields=("opportunity_id", "student_id"), name="unique_connection"
            ),
        ),
        migrations.AddConstraint(
            model_name="student",
            constraint=models.UniqueConstraint(
                fields=("student_id",), name="unique_student_id"
            ),
        ),
    ]
