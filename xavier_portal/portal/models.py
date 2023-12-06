from django.db import models
# Create your models here.


class student(models.Model):
    name = models.CharField(max_length=50, null=False, default='')
    student_email = models.EmailField()
    student_id = models.AutoField(primary_key=True)
    # student_id = models.IntegerField(
    #     unique=True, default=0, null=True)
    password = models.CharField(
        max_length=256, null=True)  # need to hash passwords
    salt = models.BinaryField(
        max_length=32, null=True)

    # salt = models.CharField(
    #     max_length=256, null=True)

    def dict(self):
        return {'name': self.name, 'student_id': self.student_id, 'student_email': self.student_email}

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['student_id'], name='unique_student_id')
        ]


class community_partner(models.Model):
    partner_email = models.EmailField()
    partner_title = models.CharField(max_length=30, default='')
    password = models.CharField(max_length=256)  # need to hash passwords
    partner_id = models.AutoField(primary_key=True)
    salt = models.BinaryField(max_length=32, null=True)
    # salt = models.CharField(
    #     max_length=256, null=True)

    def dict(self):
        return {'partner_title': self.partner_title, 'partner_email': self.partner_email,  'partner_id': self.partner_id}

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['partner_id'], name='unique_partner_id')
        ]


class opportunity(models.Model):
    description = models.CharField(max_length=2000, null=True)
    keywords = models.CharField(max_length=200,  null=True)
    community_partner_id = models.ForeignKey(
        community_partner, on_delete=models.CASCADE, related_name='+', to_field='partner_id', default=0)
    date = models.DateField(null=True)

    def students(self):
        return [
            i[0] for i in opportunity_to_student.objects.filter(
                opportunity_id=self.id).values_list('student_id')
        ]

    def dict(self):
        return {'date': self.date, 'description': self.description, 'keywords': self.keywords, 'community_partner_title': self.community_partner_id.partner_title, 'id': self.id}


class opportunity_to_student(models.Model):
    opportunity_id = models.ForeignKey(
        opportunity, on_delete=models.CASCADE, related_name='+', default=0)
    student_id = models.ForeignKey(
        student, on_delete=models.CASCADE, related_name='+',  default=0)

    def dict(self):
        return {'opportunity_id': self.opportunity_id.id, 'student_id': self.student_id.student_id}

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['opportunity_id', 'student_id'], name='unique_connection')
        ]
