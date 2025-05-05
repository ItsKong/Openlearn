from django.test import TestCase
from .models import CourseModel, VideoModel

class CourseModelTest(TestCase):
    
    def setUp(self):
        # Set up a CourseModel instance
        self.course = CourseModel.objects.create(
            title='Python Basics',
            tutor='John Doe',
            detail='An introduction to Python programming.',
            created_at='2025-05-01',
            thumbnail='python_thumbnail.jpg'
        )

    def test_course_creation(self):
        # Test that the course is correctly created
        course = CourseModel.objects.get(title='Python Basics')
        self.assertEqual(course.title, 'Python Basics')
        self.assertEqual(course.tutor, 'John Doe')
        self.assertEqual(course.detail, 'An introduction to Python programming.')
        self.assertEqual(course.thumbnail, 'python_thumbnail.jpg')

    def test_course_str(self):
        # Test the __str__ method of CourseModel
        self.assertEqual(str(self.course), 'Python Basics')


class VideoModelTest(TestCase):

    def setUp(self):
        # Set up a CourseModel instance
        self.course = CourseModel.objects.create(
            title='Python Basics',
            tutor='John Doe',
            detail='An introduction to Python programming.',
            created_at='2025-05-01',
            thumbnail='python_thumbnail.jpg'
        )
        
        # Set up a VideoModel instance related to the course
        self.video = VideoModel.objects.create(
            course=self.course,
            title='Video 1: Introduction to Python',
            video_url='https://example.com/video1',
            thumbnail='video1_thumbnail.jpg',
            detail='The first video in the Python Basics course.'
        )

    def test_video_creation(self):
        # Test that the video is correctly created and related to a course
        video = VideoModel.objects.get(title='Video 1: Introduction to Python')
        self.assertEqual(video.title, 'Video 1: Introduction to Python')
        self.assertEqual(video.video_url, 'https://example.com/video1')
        self.assertEqual(video.detail, 'The first video in the Python Basics course.')
        self.assertEqual(video.course.title, 'Python Basics')

    def test_video_str(self):
        # Test the __str__ method of VideoModel
        self.assertEqual(str(self.video), 'Video 1: Introduction to Python')

    def test_related_videos(self):
        # Test that the related videos can be accessed from the CourseModel
        video_list = self.course.videos.all()
        self.assertEqual(video_list.count(), 1)
        self.assertIn(self.video, video_list)

    def test_video_delete(self):
        # Test that deleting a video also deletes the related video instance
        video_id = self.video.id
        self.video.delete()
        with self.assertRaises(VideoModel.DoesNotExist):
            VideoModel.objects.get(id=video_id)
