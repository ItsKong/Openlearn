from django.http import JsonResponse
from django.db.models import Count
from django.shortcuts import get_object_or_404
from django.forms.models import model_to_dict
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from courses.models import *

# Create your views here.

def courseView(request):
    # all course
    if request.method == "GET":
        courses = CourseModel.objects.annotate(video_count=Count('videos')).order_by('id')
        data = list(courses.values('id', 'title', 'tutor', 'img', 
                                   'detail', 'created_at', 'thumbnail', 'video_count'))
        return JsonResponse(data, safe=False)

def videoView(request):
    # all video
    if request.method == "GET":
        data = list(VideoModel.objects.values())
        return JsonResponse(data, safe=False)
    
@csrf_exempt
def courseViewOne(request, courseId):
    # one course with video 
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
    # for video of course in playlist
    if request.method == "GET":
        videos = VideoModel.objects.filter(course=courseId).values()
        return JsonResponse(list(videos), safe=False)
    return JsonResponse({"error": "GET method required"}, status=405)
    
def videoById(request, videoId):
    # for /watch
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
    
def searchCourse(request, query):
    # for searching
    if request.method == "GET":
        # Use Q objects for more complex queries
        from django.db.models import Q
        
        # Split the query into words
        query_words = query.split()
        
        # Start with an empty Q object
        q_object = Q()
        
        # Add each word to the query
        for word in query_words:
            # This will match if the word appears anywhere in the title
            q_object |= Q(title__icontains=word)
        
        # Filter courses based on the combined query
        courses = CourseModel.objects.filter(q_object).annotate(video_count=Count('videos'))
        if not courses.exists():
            return JsonResponse({"message": "No courses found"}, status=404)
        data = list(courses.values(
            'id', 
            'title', 
            'tutor', 
            'img', 
            'detail', 
            'created_at', 
            'thumbnail', 
            'video_count'))
        return JsonResponse(data, safe=False)
    return JsonResponse({"error": "GET method required"}, status=405)
    
def insertVideoMany(request):
    # dummy
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