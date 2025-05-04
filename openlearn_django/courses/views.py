from django.http import JsonResponse
from django.db.models import Count
from django.shortcuts import get_object_or_404
from django.forms.models import model_to_dict
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from courses.models import *

# Create your views here.

def courseView(request):
    if request.method == "GET":
        courses = CourseModel.objects.annotate(video_count=Count('videos'))
        data = list(courses.values('id', 'title', 'tutor', 'img', 
                                   'detail', 'created_at', 'thumbnail', 'video_count'))
        return JsonResponse(data, safe=False)

@csrf_exempt
def courseViewOne(request, courseId):
    if request.method == "GET":
        course = get_object_or_404(CourseModel.objects.annotate(video_count=Count('videos')), id=courseId)
        data = {
            "id": course.id,
            "title": course.title,
            "tutor": course.tutor,
            "img": course.img,
            "detail": course.detail,
            "created_at": course.created_at,
            "thumbnail": course.thumbnail,
            "video_count": course.video_count
        }
        return JsonResponse(data, safe=False)
    return JsonResponse({"error": "GET method required"}, status=405)

@csrf_exempt
def videoByCourseId(request, courseId):
    if request.method == "GET":
        videos = VideoModel.objects.filter(course=courseId).values()
        return JsonResponse(list(videos), safe=False)
    return JsonResponse({"error": "GET method required"}, status=405)

def videoView(request):
    if request.method == "GET":
        data = list(VideoModel.objects.values())
        return JsonResponse(data, safe=False)
    
def videoById(request, videoId):
     if request.method == "GET":
        video = VideoModel.objects.get(id=videoId)
        data = {
            "id": video.id,
            "title": video.title,
            "video_url": video.video_url,
            "created_at": video.created_at,
            "thumbnail": video.thumbnail,
            "detail": video.detail,
            # add other fields as needed
        }
        return JsonResponse(data, safe=False)
    
def insertVideoMany(request):
    if request.method == "GET":
        try:
            course = CourseModel.objects.get(id=3)
        except CourseModel.DoesNotExist:
            return JsonResponse({"error": "Course with id=2 not found"}, status=404)

        for i in range(2, 7):
            VideoModel.objects.create(
                course=course,  # passing the instance, not just the ID
                title=f"complete HTML tutorial (part 0{i})",
                video_url=f"./openlearn_njs/public/images/vid-{i}.mp4"
            )

        return JsonResponse({"message": "Videos inserted successfully"})