from django.test import TestCase
from django.contrib.auth.models import User
from .models import UserModel, CourseModel

class UserModelTest(TestCase):
    
    def setUp(self):
        # Set up a user instance
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        
        # Set up a course instance
        self.course = CourseModel.objects.create(title='Python Basics')
        
        # Create a UserModel instance
        self.user_model = UserModel.objects.create(user=self.user)
        
    def test_user_model_creation(self):
        # Test that the UserModel instance is correctly created
        user_model = UserModel.objects.get(user=self.user)
        self.assertEqual(user_model.user.username, 'testuser')
        self.assertEqual(user_model.save_course.count(), 0)  # No courses saved yet
    
    def test_add_course_to_user(self):
        # Add a course to the UserModel instance
        self.user_model.save_course.add(self.course)
        self.assertEqual(self.user_model.save_course.count(), 1)
        self.assertIn(self.course, self.user_model.save_course.all())
    
    def test_remove_course_from_user(self):
        # Add and then remove a course from the UserModel instance
        self.user_model.save_course.add(self.course)
        self.user_model.save_course.remove(self.course)
        self.assertEqual(self.user_model.save_course.count(), 0)
        self.assertNotIn(self.course, self.user_model.save_course.all())
    
    def test_related_name(self):
        # Test the related_name 'user_addi' on the User model
        user_addi = self.user.user_addi
        self.assertEqual(user_addi, self.user_model)

    def test_user_model_str(self):
        # Test the __str__ method of UserModel
        self.assertEqual(str(self.user_model), self.user.username)
