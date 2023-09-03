from django.db import models
# Create your models here.


class student(models.Model):
    student_email = models.EmailField()
    student_id = models.IntegerField(
        unique=True, default=0, null=False, primary_key=True)
    password = models.CharField(
        max_length=30, null=True)  # need to hash passwords

    def __dict__(self):
        return {'student_id': self.student_id, 'student_email': self.student_email, 'password': self.password}

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['student_id'], name='unique_student_id')
        ]


class community_partner(models.Model):
    partner_email = models.EmailField()
    password = models.CharField(max_length=30)  # need to hash passwords
    partner_id = models.IntegerField(
        unique=True, default=0, null=False, primary_key=True)

    def __dict__(self):
        return {'partner_email': self.partner_email, 'password': self.password, 'partner_id': self.partner_id}

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['partner_id'], name='unique_partner_id')
        ]


class job_opportunity(models.Model):
    description = models.CharField(max_length=200, null=True)
    keywords = models.CharField(max_length=200,  null=True)
    community_partner_id = models.ForeignKey(
        community_partner, on_delete=models.CASCADE, related_name='+', to_field='partner_id', default=0)

    def __dict__(self):
        # check_students = opportunity_to_student.objects.filter(
        #     opportunity_id=self.id)
        students: list = [
            i[0] for i in opportunity_to_student.objects.filter(
                opportunity_id=self.id).values_list('student_id')
        ]
        return {'description': self.description, 'keywords': self.keywords, 'community_partner_id': self.community_partner_id, 'students': students}


class opportunity_to_student(models.Model):
    opportunity_id = models.ForeignKey(
        job_opportunity, on_delete=models.CASCADE, related_name='+', default=0)
    student_id = models.ForeignKey(
        student, on_delete=models.CASCADE, related_name='+', to_field='student_id', default=0)

    def __dict__(self):
        return {'opportunity_id': self.opportunity_id, 'student_id': self.student_id}

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['opportunity_id', 'student_id'], name='unique_connection')
        ]
