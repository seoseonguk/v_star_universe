from django.db import models

# Create your models here.


class TimeStampedModel(models.Model):
    class Meta:
        abstract = True

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

GENDER_CHOICES = {
    ('male', 'male'),
    ('female', 'female')
}

REGION_CHOICES = {
    ('hanoi', 'hanoi'),
    ('hochiminh', 'hochiminh')
}
class Influencer(TimeStampedModel):
    name = models.CharField(max_length=20)
    email = models.EmailField()
    gender = models.CharField(max_length=5, choices=GENDER_CHOICES)
    region = models.CharField(max_length=10, choices=REGION_CHOICES)
    birth = models.DateField(auto_now_add=True)
    follower = models.IntegerField()

    instagram_id = models.CharField(max_length=30, blank=True)
    facebook_id = models.CharField(max_length=30, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "인플루엔서"
        verbose_name_plural = verbose_name
        unique_together = ('email', 'instagram_id','facebook_id')